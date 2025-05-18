import React, { useState } from 'react'


function Navbar({setLoginHandler,setRegisterHandler,logout,setlogouthandler}) {
  // console.log(setLoginHandler)
  


  return (
    <div className='Navbar'>
        <div>Vender Dashboard</div>
        <div >
      {/* {
        !logout ?( <>
       <span onClick={LogoutHandler}>Login</span>
        /<span onClick={setRegisterHandler}>Register</span>
      </>):( <span >Logout</span>)
      } */}

     

        {
          !logout ? (<>
       <span onClick={setLoginHandler}>Login</span>
        /<span onClick={setRegisterHandler}>Register</span>
      </>):(<span onClick={setlogouthandler} >Logout</span>)
        }

        </div>
    </div>
  )
}

export default Navbar