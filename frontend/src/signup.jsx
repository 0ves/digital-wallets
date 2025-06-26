import React from 'react'
import {Button} from "./component/Button.jsx"
import {Imputbox_component} from "./component/Imputbox_com.jsx"
import Heading_com from './component/Heading_com.jsx'
import Subheading_com from './component/Subheading_com.jsx'

 function signup() {
  return(
    <>
    <div className=' flex '>

    <Heading_com name="Sign up"/>
    <Subheading_com name="Enter your information"/>
    <Imputbox_component placeholder="kanye" name="Name"/>
    <Imputbox_component placeholder="wasim" name="Last Name"/>
    </div>

        <Button name="signup"/>

    </>
  )
};

export default signup