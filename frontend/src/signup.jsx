import React from "react";

import Imputbox_component from "./component/Imputbox_com.jsx";
import Heading_com from "./component/Heading_com.jsx";
import Subheading_com from "./component/Subheading_com.jsx";
import DarkModeToggle from "./components/ui/darkmodetoggle.jsx";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/stateful-button.jsx";
export default function signup() {
  const navigate = useNavigate()
  return (
    <>
      <div className=" h-full flex flex-col items-center m-12 p-12  rounded-2xl bg-amber-600">
        {/* nav bar */}
        <div className=" flex w-1/1">
          <div className="absolute top-0">
            <DarkModeToggle />
          </div>
          <nav className="bg-amber-300 p-4 flex justify-around w-full hover:w-full">nav
            <Button onClick={()=>navigate('/signin')} children={'login'}/>
            <Button onClick={()=>navigate('/signup')}  children={"signup"}/>
          </nav>
        </div>

        {/* hero */}
        <div>
          hero section
          <div className="flex bg-purple-400 p-3">
            <div className=" text-xl m-2 rounded-2xl p-4 border-white border-1 border-dashed">
              <h1>Lorem ipsum dolor sit.</h1>
              <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
            </div>
            <section className=" border-1 border-white rounded-2xl border-dotted p-16 m-2">
              img
            </section>
          </div>
        </div>

        {/* footer */}
        <div className=" fixed bottom-0 w-screen bg-purple-400/90 p-8 rounded-t-2xl">footer</div>
      </div>
    </>
  );
}
