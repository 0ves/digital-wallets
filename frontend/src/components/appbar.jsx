import React from 'react'

function Appbar() {
    const Users = [1,2,3,4]
  return (
    <>
    <div  className="flex justify-between
    shadow-input mx-auto w-full max-w-5xl
    rounded-none bg-red-300 mt-2 md:bg-white md:rounded-2xl md:p-8 dark:bg-black  ">
    <span>paymt</span>
    <div>

    <span className='m-1'> name</span>
    <span> logo</span>
    </div>
    </div>
    <div className='m-4'>
        <span className='block m-1'>your balence: </span>
        <span className='block m-1'>users</span>
        <input className="p-3 border-1 w-3/4 m-2"type="text" placeholder='hi'/>
    </div>
    <div className='p-1 m-1'>

        {Users.map(user =><IdInfo name={user}/>)}
    </div>

 </>
    
  )
}
function IdInfo({name ="name"}){
    return (
        <div>
            {name}
        </div>
    )
}
export default Appbar