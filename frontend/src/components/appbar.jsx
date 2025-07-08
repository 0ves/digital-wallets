import React, { useEffect } from "react";
import apiClient from "../api/api";
import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "./popup";

function Appbar() {
  const [username, setUsername] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [balance, setbalance] = useState("");
  
  const [users, setUsers] = useState([]);
  const [search, setsearch] = useState("");

  const [toAccount, setToaccount] = useState("");
  const [ammount, setAmmount] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);

  const handleOpenPopUp = () => {
    setShowPopUp(true);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(search, 500);

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

        ammount: ammount,
      });
      console.log(respons.data);
      handleClosePopUp()
      alert(respons.data.mes)
    } catch (e) {
      console.log(e);
      alert(e)
    }
  };
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/bulk?filter=${search}`
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
      {/* Appbar */}
      <div className="flex justify-between items-center px-6 py-4 shadow-md mx-auto w-full max-w-6xl bg-white rounded-xl mt-6 dark:bg-gray-900 transition-all">
        <span className="text-2xl font-bold text-blue-600 dark:text-white">
          Paymt
        </span>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {firstname} {lastname}
          </span>
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold dark:bg-blue-800 dark:text-white">
            {firstname ? firstname.substring(0, 2) : "?"}
          </div>
        </div>
      </div>
      <Popup
        show={showPopUp}
        setAmmountfn={setAmmount}
        sbmtFn={transactionhandler}
        to={toAccount}
        onClose={handleClosePopUp}
      />

      {/* Balance card and search input */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-xl shadow-sm dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Your Balance
            </h2>
            <p className="text-2xl font-bold text-blue-600 dark:text-white">
              ₹ {balance}
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
          {search.length == 0 ? (
            <div></div>
          ) : (
            <div className="mt-8">
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
                          className=" mr-2 px-4 py-1 rounded-2xl font-mono bg-green-400 text-xl "
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
    </>
  );
}

function IdInfo({ name = "name" }) {
  return (
    <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
      {name}
    </div>
  );
}

export default Appbar;
