# Lead form for React JS
> First you need to create an account with [Boontar TV](https://boontar.tv)

<p align="center">
  <img width="250" height="auto" src="https://boontarcloud.azureedge.net/others/lead_forrm_openapi.png" alt="Sublime's custom image"/>
</p>

## Features
 - Faster loading compared to [Boontar TV widget](https://github.com/boontar/react-lead-form-widget)
 - Install the module and start collecting requests, ratings, reviews
 - Admin panel for viewing incoming requests [Boontar TV](https://boontar.tv)
 - Export requests
 - Embedded analytics
 - Integration Google Analytics

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
| `getId` | `number` | `Yes` |  | Lead form unique ID at Boontar TV |
| `token` | `string` | `Yes` |  | Token (key) that you generate in the admin panel [Boontar TV](https://boontar.tv) |
| `classNameInputLabel` | `string` | `No` |  | Custom class for InputLabel |
| `classNameInput` | `string` | `No` |  | Custom class for inputs |
| `classNameButton` | `string` | `No` |  | Custom class for button |
| `classNameSuccessText` | `string` | `No` |  | Custom class for success notification |
| `classNameFailedText` | `string` | `No` |  | Custom class for failed notification |
| `classNameContainer` | `string` | `No` |  | Custom class for main container |
| `classNameTitle` | `string` | `No` |  | Custom class for title |
| `classNameDesc` | `string` | `No` |  | Custom class for description |
| `classNameInputsContainer` | `string` | `No` |  | Custom class for form container |
| `classNameButtonContainer` | `string` | `No` |  | Custom class for button and notification block |
| `successStatus` | `string` | `No` | `Form sent successfully` | Text on success |
| `failedStatus` | `string` | `No` | `Failed to submit form` | Text on failed |
| `requiredStatus` | `string` | `No` | `You have not filled in the required fields` | Text if all required fields were not filled|
## Available input fields
| Name | Included |
| ------ |  ------ |
| `Text` | ✅ |
| `Number` | ✅ |
| `Date & Time` | ✅ |
| `Date` | ✅ |
| `Time` | ✅ |
| `Slider` | ❌ |
| `Select` | ❌ |
## Example
```js
import React, { Component } from "react";
import ReactLeadForm from 'react-lead-form'

class HelloWorld extends Component {
    render() {
        return(<ReactLeadForm 
                getId={1} 
                token={'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'}
              />)
    }
}
```
