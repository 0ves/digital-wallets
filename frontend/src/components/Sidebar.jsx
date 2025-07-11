import { useRecoilState, useRecoilValue } from "recoil";
import { sidebarOpenState, transactionState } from "../recoil/uiAtoms";
import { X  } from "lucide-react";
import clsx from "clsx";
import apiClient from "../api/api";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenState);
  const [transactions ,setTransaction] = useRecoilState(transactionState)
  const handletansaction = async ()=>{
    try {
      const respons = await apiClient.get('account/transactions')
      // console.log(respons.data.transactions)
      setTransaction(respons.data.transactions)
       console.log(transactions[0].userId)
    }
    catch(e)
    {
      console.log(e);
      
    }
  }
  return (
    <>
      

      {/* Sidebar */}
     <aside
        className={clsx(
          "fixed top-0 left-0 h-full  bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out",
          sidebarOpen ? " translate-x-0 w-64 transition delay-100 duration-150 ease-in-out" : "hidden translate-x-full",
          "md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4 md:hidden">
          <span className="text-lg font-semibold text-gray-800 dark:text-white">
            Menu
          </span>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <nav className="p-4 space-y-2 ">
          <div>
             <button onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          </div>
          <a
            href="#"
            className="block text-gray-700 dark:text-gray-200 hover:text-blue-600"
          >
            Dashboard
          </a>
          <button
            onClick={handletansaction}
            className="block text-gray-700 dark:text-gray-200 hover:text-blue-600"
          >
            Transactions
          </button>
          <a
            href="#"
            className="block text-gray-700 dark:text-gray-200 hover:text-blue-600"
          >
            Users
          </a>
          <a
            href="#"
            className="block text-gray-700 dark:text-gray-200 hover:text-blue-600"
          >
            Settings
          </a>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

// {/* Overlay for mobile */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-30 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//  