import React from 'react'

import ReactLeadForm from 'react-lead-form'
import 'react-lead-form/dist/index.css'

const App = () => {
  return <ReactLeadForm 
            getId={481} 
            apiKey={'b0f36535c5752895a8f359fcce725cb0d32f51f2'}
            statusVisible={true}
            onSuccess={()=>{}}
            onFailed={(errorCode)=>{}}
          />
}

export default App
