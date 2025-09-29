import React, { useEffect } from "react";
import apiClient from "../api/api";
import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import { Button } from "./ui/stateful-button";
import Sidebar from "./Sidebar";
import {
  sidebarOpenState,
  amountState,
  transactionState,
} from "../recoil/uiAtoms";
import { useRecoilState } from "recoil";
import { Menu } from "lucide-react";
import TransactionHistory from "./Transaction-history";


function Appbar() {
  const [username, setUsername] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [balance, setbalance] = useState("");

  const [users, setUsers] = useState([]);
  const [search, setsearch] = useState("");

  const [toAccount, setToaccount] = useState("");
  const [transaction, setTransaction] = useRecoilState(transactionState);
  const [amount, setAmount] = useRecoilState(amountState);
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenState);
  const [showPopUp, setShowPopUp] = useState(false);
  const url = import.meta.env.VITE_URL 

  const handleOpenPopUp = () => {
    setShowPopUp(true);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(search, 500);

  const logout = () => {
    localStorage.removeItem("token");
    setTransaction([])
    navigate("/signin");
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch();
    } else {
      setUsers([]);
    }
  }, [debouncedSearchTerm]);

  const transactionhandler = async () => {
    try {
      const respons = await apiClient.post("/account/transfer", {
        to: toAccount,

        amount: amount,
      });
      console.log(respons.data);
      handleClosePopUp();
      alert(respons.data.mes);
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${url}/api/v1/user/bulk?filter=${search}`
      );
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const respons = await apiClient.get("/user/me");
       
        setUsername(respons.data.username);
        setfirstname(respons.data.firstname);
        setLastname(respons.data.lastname);
        setbalance(respons.data.balance);
        
      } catch (error) {
        console.log(error);
        navigate("/signin");
      }
    };
    fetchProfile();
  }, [showPopUp]);

  return (
    <>
      <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-950">
        <Sidebar />

        <div
          className={`flex-1 flex flex-col  transition-all duration-300 ease-in-out ${
            sidebarOpen ? "md:ml-64" : ""
          }`}
        >
          {/* Appbar */}
          <div className="flex justify-between items-center px-6 py-4 shadow-md mx-auto w-full  bg-white rounded-xl mt-6 dark:bg-gray-800 ">
            <div>
              <button
                className=" mx-8 "
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu />
              </button>
              <span className="text-2xl font-bold text-blue-600  dark:text-white">
                Paymt
              </span>
            </div>
            <div className="flex items-center gap-4">
              
              <span>
                {" "}
                <Button onClick={logout} children={"Logout"} />{" "}
              </span>
              <div className="relative group inline-block mr-6">

              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold dark:bg-blue-800 dark:text-white">
                {firstname ? firstname.substring(0, 2) : "?"}
              </div>
                <div className="bg-gray-100/85 bg-blend-saturation text-black  p-6 py-8 text-center -z-10 
                absolute right-1/2 translate-x-1/6 translate-y-1/6
                rounded-2xl opacity-0 group-hover:opacity-100 group-hover:z-10 overflow-x-hidden">
                  <div>{firstname}</div>
                  <div>{lastname}</div>
                </div>
              </div>
            </div>
          </div>

          <Popup
            show={showPopUp}
            setAmountfn={setAmount}
            sbmtFn={transactionhandler}
            to={toAccount}
            onClose={handleClosePopUp}
          />

          {/* Balance card and search input */}
          <div className="max-w-6xl mx-auto w-full px-4 py-6">
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-xl shadow-sm dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Your Balance
                </h2>
                <p className="text-2xl font-bold text-blue-600 dark:text-white">
                  $ {balance}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Search Users
                </label>
                <div className="relative">
                  <input
                    className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    type="text"
                    placeholder="Search by username or firstname..."
                    onChange={(e) => setsearch(e.target.value)}
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    🔍
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div>{transaction && <TransactionHistory />}</div>
              {search.length == 0 ? (
                <div></div>
              ) : (
                <div className=" relative mt-8">
                  <button className="  text-xl  right-1/36 -top-1/2  p-2 px-4 m-2 rounded-3xl hover:bg-orange-200  hover:text-purple-500 "
                   onClick={()=>setsearch('') 
                  
                  }>X</button>
                  {users.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {users.map((user) => (
                        <div
                          key={user.username}
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                        >
                          <IdInfo name={user.username} />
                          <IdInfo name={user.firstname} />
                          <div className=" flex justify-end">
                            <button
                              className=" mr-2 px-4  rounded-2xl font-mono text-white bg-green-500 hover:bg-green-400 text-xl "
                              onClick={() => {
                                setToaccount(user._id);
                                handleOpenPopUp();
                              }}
                            >
                              send
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 dark:text-gray-400 mt-6 text-center italic">
                      No users found.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function IdInfo({ name = "name"  }) {
  return (
    <div className=" text-l  text-gray-800 dark:text-gray-200  font-mono font"  >
      {name}
    </div>
  );
}

export default Appbar;
