# Lead form for React JS
[![npm](https://img.shields.io/npm/v/github-buttons)](https://www.npmjs.com/package/react-lead-form)
> First you need to create an account with [Boontar TV](https://boontar.tv)

<p align="center">
  <img width="250" height="auto" src="https://boontarcloud.azureedge.net/others/lead_form_openapi.png" alt="Sublime's custom image"/>
</p>

## Features
 - Faster than [Boontar TV widget](https://github.com/boontar-ltd/react-lead-form-widget)
 - You can use your own style classes
 - Install the module and start collecting requests, ratings, reviews
 - Admin panel for viewing incoming requests [Boontar TV](https://boontar.tv)
 - Export requests
 - Embedded analytics

## Admin panel
List of incoming requests in the admin panel [Boontar TV](https://boontar.tv)

[![Boontar TV - Lead Form Builder](https://boontarcloud.azureedge.net/others/react-lead-form-widget.png)](https://boontarcloud.azureedge.net/others/react-lead-form-widget.png)
 
## Getting Started
To install the module, run the following in the command line:
```bash
npm i react-lead-form --save
```
Use within your application with the following line of JavaScript:
```js
const ReactLeadForm = require('react-lead-form');
```
or
```js
import ReactLeadForm from 'react-lead-form'
```
## Available props
| Name | Type | Required | Default | Description |
| ------ | ------ | ------ | ------ | ------ |
| `getId` | `number` | `Yes` | - | Lead form unique ID at Boontar TV |
| `apiKey` | `string` | `Yes` | - | Key that you generate in the admin panel [Boontar TV](https://boontar.tv) |
| `classNameInputLabel` | `string` | `No` | - | Custom class for InputLabel |
| `classNameInput` | `string` | `No` | - | Custom class for inputs |
| `classNameButton` | `string` | `No` | - | Custom class for button |
| `classNameSuccessText` | `string` | `No` | - | Custom class for success notification |
| `classNameFailedText` | `string` | `No` | - | Custom class for failed notification |
| `classNameContainer` | `string` | `No` | - | Custom class for main container |
| `classNameTitle` | `string` | `No` | - | Custom class for title |
| `classNameDesc` | `string` | `No` | - | Custom class for description |
| `classNameInputsContainer` | `string` | `No` | - | Custom class for form container |
| `classNameButtonContainer` | `string` | `No` | - | Custom class for button and notification block |
| `statusVisible` | `boolean` | `Yes` | `true` | Show form submission status |
| `successStatus` | `string` | `No` | `Form sent successfully` | Text on success |
| `failedStatus` | `string` | `No` | `Failed to submit form` | Text on failed |
| `requiredStatus` | `string` | `No` | `You have not filled in the required fields` | Text if all required fields were not filled |
| `validateStatus` | `string` | `No` | `Check the correctness of the filled data` | Text if email or phone types fail validation |
| `onSuccess` | `func` | `No` | - | Callback function after successful form submission |
| `onFailed` | `func` | `No` | - | Callback function after failed form submission |
| `onLoad` | `func` | `No` | - | Callback function after the lead form is loaded |
| `onLoadFailed` | `func` | `No` | - | Callback function if lead form fails to get |
## Error codes
| Code | Description |
| ------ |  ------ |
| `1` | Failed to submit form |
| `2` | Required fields not filled |
| `3` | Not correct email |
| `4` | Not correct phone number |
## Available input fields
| Name | Included |
| ------ |  ------ |
| `Text` | ??? |
| `Number` | ??? |
| `Date & Time` | ??? |
| `Date` | ??? |
| `Time` | ??? |
| `Slider` | ??? |
| `Select` | ??? |
## Example
```js
import React, { Component } from "react";
import ReactLeadForm from 'react-lead-form'
import 'react-lead-form/dist/index.css'

class HelloWorld extends Component {
  
    onSuccess = () => {

    }

    onFailed = (errorCode) => {
      console.log(errorCode)
    }

    render() {
        return(<ReactLeadForm 
                getId={481} 
                apiKey={'b0f36535c5752895a8f359fcce725cb0d32f51f2'}
                statusVisible={true}
                onSuccess={this.onSuccess}
                onFailed={this.onFailed}
              />)
    }
}
```

We also have a plug-in widget, the appearance of which is edited only in your personal account:
[https://github.com/boontar-ltd/react-lead-form-widget](https://github.com/boontar-ltd/react-lead-form-widget)
