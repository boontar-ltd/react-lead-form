import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { post } from './components/network'
import { validateEmail, validatePhone } from './components/validate'
import styles from './styles.module.css';

class BoontarTVInputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_get: props.getId,
            name: "",
            email: "",
            phone: "",
            form: [],
            inputList: [],
            id_user: 0,

            statusVisible: props.statusVisible,
            sending: false,
            status: null, //success, failed, required, validate
            done: false,
        }
    }

    onSuccess = () => {
        if(this.props.onSuccess) {
            this.props.onSuccess();
        }
    }

    onFailed = (error) => {
        if(this.props.onFailed) {
            this.props.onFailed(error);
        }
    }

    onLoad = () => {
        if(this.props.onLoad) {
            this.props.onLoad();
        }
    }

    onLoadFailed = () => {
        if(this.props.onLoadFailed) {
            this.props.onLoadFailed();
        }
    }

    inputListDefaultValues = (form) => {
        let list = this.state.inputList;
        for (var index = 0; index < form.length; ++index) {
            list[index] = {
                name: form[index].inputName, 
                value: '', 
                type: form[index].inputType, 
                tag: form[index].tag
            };
            if(form[index].inputType === 'datetime-local') {
                list[index].value = '2022-01-01T00:00';
            }
            if(form[index].inputType === 'date') {
                list[index].value = '2022-01-01';
            }
            if(form[index].inputType === 'time') {
                list[index].value = '00:00';
            }
        };
        this.setState({ 
            inputList: list
        });
    }

    getData = () => {
        post({
            url: `form/${this.state.id_get}`,
            body: {
                token: this.props.apiKey
            }
        })
        .then((data) => {
            if(data.status === 'success') {
                this.setState({
                    form: data.form,
                    id_user: data.id_user,
                    publish: data.publish,
                    done: true
                }, ()=>{
                    const start_ = () => {
                        this.inputListDefaultValues(data.form)
                        this.DESCRIPTION = data.description
                        this.TITLE = data.title
                        this.BUTTON_TEXT = data.button_text
                        this.onLoad()
                    }
                    if(this.state.publish === 'enabled') {
                        start_()
                    }
                })
            }
        })
        .catch((e) => {
            this.onLoadFailed()
        });
    }

    submit = () => {
        if(this.state.sending) return;

        this.setState({
            sending: true,
        }, ()=>{
            var documentInputs = document.getElementsByName('input');
            for (let i = 0; i < documentInputs.length; i++) {
                if (documentInputs[i].hasAttribute('required')) {
                    if (documentInputs[i].value.length === 0) {
                        this.setState({
                            status: 'required',
                            sending: false
                        },()=>{
                            this.onFailed(2)
                        })
                        return;
                    }
                }
            }
            
            var custom_inputs = [];
            for (var i = 0; i < this.state.inputList.length; i++) {
                if (this.state.inputList[i].tag === "custom") {
                    custom_inputs.push(this.state.inputList[i])
                }
                if(this.state.inputList[i].value.length > 0 && (this.state.inputList[i].tag === "email" || this.state.inputList[i].type === "email") && !validateEmail(this.state.inputList[i].value)) {
                    this.onFailed(3)
                    this.setState({
                        status: 'validate',
                        sending: false,
                    })
                    return;
                }
                if(this.state.inputList[i].value.length > 0 && (this.state.inputList[i].tag === "phone" || this.state.inputList[i].type === "tel") && !validatePhone(this.state.inputList[i].value)) {
                    this.onFailed(4)
                    this.setState({
                        status: 'validate',
                        sending: false,
                    })
                    return;
                }
            }

            post({
                url: `request`,
                body: {
                    name: this.state.name !== '' ? this.state.name : null,
                    email: this.state.email !== '' ? this.state.email : null,
                    phone: this.state.phone > 0 ? this.state.phone : null,
                    custom: JSON.stringify(custom_inputs),
                    client_id: "0",
                    id_get: this.state.id_get,
                    token: this.props.apiKey
                }
            })
            .then((data) => {
                if(data.status === 'success') {
                    this.setState({status: 'success'},()=>{
                        this.onSuccess()
                    })
                } else {
                    this.setState({status: 'failed'},()=>{
                        this.onFailed(1)
                    })
                }
                this.setState({
                    sending: false,
                })
            })
            .catch((e) => {
                this.setState({
                    status: 'failed',
                    sending: false,
                })
            });
        })
    }

    handleInputChange = (e, index) => {
        this.state.inputList[index].value = e.target.value;
        this.setState({ inputList: this.state.inputList }, () => {
            if (this.state.inputList[index].tag === 'name') {
                this.setState({
                    name: e.target.value,
                });
            };
            if (this.state.inputList[index].tag === 'email') {
                this.setState({
                    email: e.target.value,
                });
            };
            if (this.state.inputList[index].tag === 'phone') {
                this.setState({
                    phone: e.target.value,
                });
            };
            console.log(this.state.name)
            console.log(this.state.inputList[index])
        });
    };

    input = (l, i) => {
        return (
            <input
                key={i}
                required={l.required}
                type={l.inputType}
                placeholder={l.inputName + (l.required ? '*' : '')}
                value={this.state.inputList[i].value}
                className={styles.BoontarTVInput + " " + this.propsClassName(this.props.classNameInput)}
                onChange={(event) =>{
                    this.handleInputChange(event, i)
                }}
            />
        )
    }

    renderInputs = () => {
        if(this.state.form.length === 0 || this.state.inputList.length === 0) return null;

        return this.state.form.map((l, i) => {
            if(l.inputType === 'select') {
                return; //TO DO
            }
            if(l.inputType === 'slider') {
                return; //TO DO
            }
            if(l.inputType === 'datetime-local' || l.inputType === "date" || l.inputType === "time") {
                return (<div>
                            <div className={styles.BoontarTVInputLabel + " " + this.propsClassName(this.props.classNameInputLabel)}>{l.inputName + (l.required ? '*' : '')}</div>
                            {this.input(l, i)}
                        </div>)
            }
            return this.input(l, i);
        })
    }

    propsClassName = (prop) => prop ? prop : "";

    renderButton = () => <button onClick={() => this.submit()} className={(this.state.sending && styles.BoontarTVButtonDisabled) + this.propsClassName(this.props.classNameButton)}>{this.BUTTON_TEXT}</button>

    successText = () => this.props.successStatus ? this.props.successStatus : "Form sent successfully";

    failedText = () => this.props.failedStatus ? this.props.failedStatus : "Failed to submit form";

    requiredText = () => this.props.requiredStatus ? this.props.requiredStatus : "You have not filled in the required fields";

    validateText = () => this.props.validateStatus ? this.props.validateStatus : "Check the correctness of the filled data";
    
    status = () => {
        if(!this.state.statusVisible) return null;

        switch (this.state.status) {
            case 'success':
                return (<div className={styles.BoontarTVSuccessStatus + " " + this.propsClassName(this.props.classNameSuccessText)}>{this.successText()}</div>)

            case 'failed':
                return (<div className={styles.BoontarTVFailedstatus + " " + this.propsClassName(this.props.classNameFailedText)}>{this.failedText()}</div>)

            case 'required':
                return (<div className={styles.BoontarTVFailedStatus + " " + this.propsClassName(this.props.classNameFailedText)}>{this.requiredText()}</div>)

            case 'validate':
                return (<div className={styles.BoontarTVFailedStatus + " " + this.propsClassName(this.props.classNameFailedText)}>{this.validateText()}</div>)
        
            default:
                break;
        }
    }


    componentDidMount() {
        this.getData()
    }

    render() {
        if(!this.state.done) return null;

        return (<div className={styles.BoontarTVForm + " " + this.propsClassName(this.props.classNameContainer)}>
                    <div className={styles.BoontarTVTitle + " " + this.propsClassName(this.props.classNameTitle)}>{this.TITLE}</div>
                    <div className={styles.BoontarTVDDescription + " " + this.propsClassName(this.props.classNameDesc)}>{this.DESCRIPTION}</div>
                    <div className={styles.BoontarTVInputsBox + " " + this.propsClassName(this.props.classNameInputsContainer)}>
                        {this.renderInputs()}
                    </div>
                    <div className={styles.BoontarTVButtonBox + " " + this.propsClassName(this.props.classNameButtonContainer)}>
                        {this.status()}
                        {this.renderButton()}
                    </div>
                </div>)
    }
}

BoontarTVInputs.propTypes = {
    getId: PropTypes.number,
    apiKey: PropTypes.string,
    statusVisible: PropTypes.bool,

    classNameInputLabel: PropTypes.string,
    classNameInput: PropTypes.string,
    classNameButton: PropTypes.string,
    classNameSuccessText: PropTypes.string,
    classNameFailedText: PropTypes.string,
    classNameContainer: PropTypes.string,
    classNameTitle: PropTypes.string,
    classNameDesc: PropTypes.string,
    classNameInputsContainer: PropTypes.string,
    classNameButtonContainer: PropTypes.string,

    successStatus: PropTypes.string,
    failedStatus: PropTypes.string,
    requiredStatus: PropTypes.string,
    validateStatus: PropTypes.string,

    onSuccess: PropTypes.func,
    onFailed: PropTypes.func,
    onLoad: PropTypes.func,
    onLoadFailed: PropTypes.func,
};

export default BoontarTVInputs;