import React from 'react'
import Button from "./component/Button.jsx"
import Imputbox_component from "./component/Imputbox_com.jsx"
import Heading_com from './component/Heading_com.jsx'
import Subheading_com from './component/Subheading_com.jsx'

 export default function Signup() {
  return(
    <>
    <div className=' h-full flex flex-col items-center m-18 p-10 rounded-2xl bg-amber-600' >

    <Heading_com name="Sign up"/>
    <Subheading_com info="Enter your information"className="p-4"/>
    <Imputbox_component name="Name" placeholder="kanye" />
    <Imputbox_component name="Last Name" placeholder="wasim"/>
        <Button name="signup"/>
    </div>


    </>
  )
};
