import React from 'react'

import ReactLeadForm from 'react-lead-form'
import 'react-lead-form/dist/index.css'

const App = () => {
  return <ReactLeadForm 
            getId={1} 
            apiKey={'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'}
            statusVisible={true}
            onSuccess={()=>{}}
            onFailed={(errorCode)=>{}}
          />
}

export default App
