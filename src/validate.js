export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const validatePhone = (phone) => {
    const re = /^[+\s/0-9]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]{4,17}$/im;
    return re.test(phone);
}