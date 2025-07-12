import { useRecoilState, useRecoilValue } from "recoil";
import { sidebarOpenState, transactionState } from "../recoil/uiAtoms";
import { X ,Cog ,User , BanknoteArrowDown ,LayoutDashboard  } from "lucide-react";
import clsx from "clsx";
import apiClient from "../api/api";
import Switcher8 from "./ui/switcher-8";
import DarkModeToggle from "./ui/darkmodetoggle";


const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenState);
  const [transactions, setTransaction] = useRecoilState(transactionState);
  const handletansaction = async () => {
    try {
      const respons = await apiClient.get("account/transactions");
      // console.log(respons.data.transactions)
      setTransaction(respons.data.transactions);
      console.log(transactions[2].status);
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <>
      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full  bg-white z-1 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out",
          sidebarOpen
            ? " translate-x-0 w-64 transition-all ease-in-out duration-300  "
            : "hidden translate-x-full",
          ""
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

        <nav className="space-y-8 my-4 font-mono">
          <div className="flex justify-around py-6">
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6 text-gray-600 dark:text-gray-300
                hover:text-purple-600" />
            </button>
            {/* <button onClick={toggletheme}> mode</button> */}
            <DarkModeToggle/>
          </div>
          <a
            href="#"
            className="block border-1-rounded shadow py-4 text-center text-gray-700   dark:hover:bg-purple-300 dark:hover:text-black dark:hover:text-xl dark:text-gray-200 hover:text-blue-700"
          >
            <div className=" inline absolute left-[30px] " ><LayoutDashboard /></div>Dashboard
          </a>
          <button
            onClick={handletansaction}
            className="block border-1-rounded shadow py-4  text-center w-64 text-gray-700 dark:hover:bg-purple-300 dark:hover:text-black dark:hover:text-xl hover:cursor-pointer dark:text-gray-200 hover:text-blue-600"
          >
            <div className=" inline absolute left-[30px] ">
              <BanknoteArrowDown /></div>
            Transactions
          </button>
          <a
            href="#"
            className="block border-1-rounded shadow py-4 text-center text-gray-700 dark:hover:bg-purple-300 dark:hover:text-black dark:hover:text-xl dark:text-gray-200 hover:text-blue-600"
          > <div className=" inline absolute left-[30px] ">
            <User/></div>
            Users
          </a>
          <a
            href="#"
            className="block border-1-rounded shadow py-4 text-center text-gray-700 dark:hover:bg-purple-300 dark:hover:text-black dark:hover:text-xl dark:text-gray-200 hover:text-blue-600"
          > <div className=" inline absolute left-[30px] ">
            <Cog/></div>
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
