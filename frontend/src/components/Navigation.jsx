import React, { useState } from 'react'

function Navigation({setPage}) {

  return (

    <div className="flex justify-between fixed w-screen max-w-screen flex-wrap text-gray-300 md:p-[1em] p-[.5em] top-0 left-0 z-50 backdrop-blur-sm ">
        <div className='flex item-center justify-center ml-5'>

          <h1 className="mx-1 font-bold flex justify-center items-center md:text-2xl lg:text-3xl md:ml-5 ">Restaurant management system</h1>
        </div>
      
        <button className={"bg-[radial-gradient(138.06%_1036.51%_at_95.25%_-2.54%,_#7ED4FD_14.06%,#709DF7_51.02%,#4D78EF_79.09%)] px-10 py-3 rounded-xl text-gray-900 font-bold mr-8  hover:bg-[radial-gradient(138.06%_1036.51%_at_95.25%_-2.54%,_#4D78EF_14.06%,#709DF7_51.02%,#7ED4FD_79.09%)] scale-90 hover:scale-105 transition-all duration-700"} tabIndex={0} onClick={()=>setPage("login")}>Login</button>
    </div>
  )
}

export default Navigation