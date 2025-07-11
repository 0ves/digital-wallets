import React from 'react'

function Popup({ show, setAmountfn, sbmtFn, to , onClose }) {
  if (!show) {
    return null; // Don't render if not visible
  }

  return (
    <>
      <div className="fixed inset-1 bg-blue-500/20  flex justify-center items-center z-[1000]" onClick={onClose}>
        <div className="bg-white dark:bg-gray-900 w-full max-w-lg p-6 py-10 m-2 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700" onClick={(e)=>e.stopPropagation()}>
          <div className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
            Send Money
          </div>

          <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-800 dark:text-gray-100">To:</span> {to}
          </div>

          <div className="mb-4">
            <label
              htmlFor="ammount"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Amount ($)
            </label>
            <input
              id="ammount"
              type="text"
              placeholder="200"
              onChange={(e) => setAmountfn(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>

          <button
            onClick={sbmtFn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Send
          </button>
     
        </div>
      </div>
    </>
  )
}

export default Popup;
