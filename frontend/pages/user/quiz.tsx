import { Radio } from '@nextui-org/react'
import React from 'react'

const quiz = () => {
    
  return (
 
      <div>
    <h1>What?</h1>
    <Radio.Group label="Options" defaultValue="">
      <Radio value="1">Option A</Radio>
      <Radio value="2">Option B</Radio>
      <Radio value="3">Option C</Radio>
      <Radio value="4">Option D</Radio>
    </Radio.Group>
  

    </div>
  
  )
}

export default quiz
