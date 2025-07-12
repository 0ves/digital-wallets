import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { transactionState } from "../recoil/uiAtoms";
import clsx from "clsx"



function TransactionHistory() {
  const [transaction , setTransaction] = useRecoilState(transactionState)

  return (
    <div className={clsx("max-w-4xl mx-auto p-4 space-y-4  shadow-sm rounded-2xl dark:border-1 " , transaction.length> 0 ? "":" hidden")}>
     
    
      {transaction.length> 0 && 
     (<div className="flex justify-between"> 
      <h2 className="text-2xl font-bold text-gray-800 dark:text-blue-800 mb-4">
        Transaction History
      </h2>
      
      <button className="mx-4 px-4 text-2xl rounded-3xl text-center hover:bg-orange-200 hover:text-purple-500 hover:text-3xl hover:fade-in-5" onClick={()=>setTransaction([])}>X</button> 
      </div>)}
     
      {transaction.map((txn) => (
        <div
          key={txn._id}
          className={clsx(" dark:bg-gray-900 p-4 rounded-lg shadow flex flex-col  hover:bg-green-200 md:flex-row md:items-center justify-between border border-gray-200 dark:border-gray-700"
, txn.status== 'send' ? "bg-red-100 hover:bg-red-200  dark:border-red-400 dark:hover:border-3 dark:shadow-2xl":"bg-green-100 dark:border-green-500 dark:hover:border-3"
          )}
        >
          
          <div>
          
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Transaction ID
            </div>
            <div className="font-semibold text-l text-gray-800 dark:text-white">
              {txn.userId.firstname} {txn.userId.lastname}
            </div>
          </div>

          <div className="mt-2 md:mt-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">To</div>
            <div className="text-gray-700 dark:text-gray-200">{txn.touserId.firstname} {txn.touserId.lastname}</div>
          </div>

          <div className="mt-2 md:mt-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Amount
            </div>
            <div className="font-medium text-blue-600 dark:text-blue-400">
              ${txn.amount}
            </div>
          </div>
              

          <div className="mt-2 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
          at :{" "} {new Date(txn.createdAt).toLocaleString()}
           
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionHistory;
