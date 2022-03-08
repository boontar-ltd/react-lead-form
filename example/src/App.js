import React from 'react'

import ReactLeadForm from 'react-lead-form'
import 'react-lead-form/dist/index.css'

const App = () => {
  return <ReactLeadForm 
            getId={461} 
            apiKey={'8fbe1f4b735c2d2343752418f0f0f6a98b193bba'}
            statusVisible={true}
            onSuccess={()=>{}}
            onFailed={(errorCode)=>{}}
          />
}

export default App
