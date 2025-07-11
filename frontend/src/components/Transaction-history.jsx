import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { transactionState } from "../recoil/uiAtoms";



function TransactionHistory() {
  const [transaction , setTransaction] = useRecoilState(transactionState)
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
     
    
      {transaction.length> 0 && 
     (<div className="flex justify-between"> 
      <h2 className="text-2xl font-bold text-gray-800 dark:text-blue-800 mb-4">
        Transaction History
      </h2>
      
      <button className="mx-4 px-4 text-2xl" onClick={()=>setTransaction([])}>X</button> 
      </div>)}
     
      {transaction.map((txn) => (
        <div
          key={txn.touserId}
          className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center justify-between border border-gray-200 dark:border-gray-700"
        >
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Transaction ID
            </div>
            <div className="font-semibold text-gray-800 dark:text-white">
              {txn.userId}
            </div>
          </div>

          <div className="mt-2 md:mt-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">To</div>
            <div className="text-gray-700 dark:text-gray-200">{txn._id}</div>
          </div>

          <div className="mt-2 md:mt-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Amount
            </div>
            <div className="font-medium text-blue-600 dark:text-blue-400">
              ${txn.amount}
            </div>
          </div>

          <div className="mt-2 md:mt-0">
            
          </div>

          <div className="mt-2 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
            {new Date(txn.createdAt).toLocaleString()}
           
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionHistory;
