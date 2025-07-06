import React, { useEffect } from "react";
import apiClient from "../api/api";
import { useState } from "react";

import axios from "axios";

function Appbar() {
//  fn change -clear timer-> new timer -> send
//       ^_---------------------_^


   const [a,seta]= useState(false) 
  const [username, setUsername] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [balance, setbalance] = useState("");
  const [users, setUsers] = useState([]);
  const [search, setsearch] = useState("");
  
  useEffect(() => {
    if(search){
 const change = ()=>{
    if(a){

        clearTimeout(change())
    }
        setTimeout(() => {
            handleSearch()
        }, 600);
        seta(true)
    }}
  
}, [search])
  const handleSearch = async()=>{
    
    try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${search}`)
        setUsers(response.data.users)

    } catch (error) {
        console.log(error);
        
    }

  }
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const respons = await apiClient.get("/user/me");
        
        setUsername(respons.data.username);
        setfirstname(respons.data.firstname);
        setLastname(respons.data.lastname);
        setbalance(respons.data.balance);
        console.log(respons.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <div
        className="flex justify-between
    shadow-input mx-auto w-full max-w-5xl
    rounded-none bg-red-300 mt-2 md:bg-white md:rounded-2xl md:p-8 dark:bg-black  "
      >
        <span>paymt</span>
        <div>
          <span className="m-1">{ firstname}</span>
          <span> logo</span>
        </div>
      </div>
      <div className="m-4">
        <span className="block m-1">your balence: {balance}</span>
        <span className="block m-1">users</span>
        <input
          className="p-3 border-1 w-3/4 m-2"
          type="text"
          placeholder="nick"
          onChange={(e)=>setsearch(e.target.value)}
        />
      </div>
      <div>
       {
        users ?  <div className="p-1 m-1">
        {users.map((user) => (<>
          <IdInfo name={user.username} />
          <IdInfo name={user.firstname} />
        </>
        ))}
        </div>:<div>mt</div>
         }
      </div>
    </>
  );
}
function IdInfo({ name = "name" }) {
  return <div>{name}</div>;
}
export default Appbar;
