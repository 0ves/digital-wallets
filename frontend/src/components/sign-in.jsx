import React,{ useState } from "react";
import axios from  "axios"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import DarkModeToggle from "./ui/darkmodetoggle";
import { Link, Route, useNavigate } from "react-router-dom";
import {
  IconBrandGithub,
  IconBrandGoogle,
  // IconBrandOnlyfans,
} from "@tabler/icons-react";


export default function Signin() {

  const [username , setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error , setError] = useState("")
    const navigate = useNavigate()
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log("Form submitted");
    // console.log(username);
    // console.log(password);

    setError('')
    try {
      const response =await axios.post("http://localhost:3000/api/v1/user/signin",
        {
          username:username,
          password: password
        }
      )
       console.log(response)
      // alert(response.data.msg)
      localStorage.setItem('token',response.data.token)
      navigate('/appbar')
    }
       catch(error){
        // Axios provides robust error handling
        if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Sign-in failed (server error):', error.response.data);
        setError(error.response.data.msg || 'Failed to sign in.');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Sign-in failed (no response):', error.request);
        setError('No response from server. Check if backend is running.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        setError('An unexpected error occurred.');
      }
  }
  };
  return (
    <div className="shadow-input mx-auto w-full max-w-lg  rounded-none p-2  mt-60 lg:mt-12 bg-white  md:max-w-md md:rounded-2xl md:p-8 dark:bg-black ">
    <div className=" absolute top-2 right-2 m-0.5">

     <DarkModeToggle/>
    </div>
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to paymt
      </h2>
     
      <form className="my-8" onSubmit={handleSubmit}>
        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email"
          value={username} onChange={(e)=> setUsername(e.target.value)} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••"
           type="password" value={password}
            onChange={(e)=>setPassword(e.target.value)} />
        </LabelInputContainer>

        

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit">
          Sign in &rarr;
          <BottomGradient />
        </button>

        <div
          className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit">
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit">
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>
          
          <Link to='/signup'> <p>dont have account? click hrer</p></Link>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
