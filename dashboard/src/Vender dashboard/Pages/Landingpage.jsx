import React, { use, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Slidebar from '../Components/Slidebar'
import Loginform from '../Components/Forms/Loginform'
import Registerform from '../Components/Forms/Registerform'
import Addresturantfrom from '../Components/Forms/Addresturantfrom'
import Addproductfrom from '../Components/Forms/Addproductfrom'
import Getallproduc from '../Components/Forms/Getallproduc'
import Userdetails from '../Components/Forms/Userdetails'
import { useState } from 'react'



function Landingpage() {
  let [loginstate,setLoginState]=useState(false)
  let [registerState,setRegisterState]=useState(false)
  let [addresturantstate,setaddresturant]=useState(false)
  let [addproduct,setproduct]=useState(false)
  let [getallproduct,setgetallproduct]=useState(false)
  let [showUserdetails,setuserdettails]=useState(false)
  let [logout,setlogout]=useState(false)

 useEffect(()=>{
   let token=localStorage.getItem("token")
  if(token){
    setlogout(true)
  }
 },[])

 let setlogouthandler=()=>{
  localStorage.removeItem("token")
  localStorage.removeItem("sellerid")
  localStorage.removeItem("resturantid")
  setlogout(false)
  setLoginHandler()
 }


  let setLoginHandler=()=>{
    setLoginState(true)
    setRegisterState(false)
    setaddresturant(false)
    setproduct(false)
    setgetallproduct(false)
    setuserdettails(false)
  }

  let setRegisterHandler=()=>{
    setRegisterState(true)
    setLoginState(false)
    setaddresturant(false)
    setproduct(false)
    setgetallproduct(false)
    setuserdettails(false)
  }

  let handleResturant=()=>{
    if(logout){
    setaddresturant(true)
    setLoginState(false)
    setRegisterState(false)
    setproduct(false)
    setgetallproduct(false)
    setuserdettails(false)
    }else{
      alert("Please Login")
      setLoginHandler(true)
    }
  }

  let handleproduct=()=>{
    if(logout){
    setproduct(true)
    setaddresturant(false)
    setLoginState(false)
    setRegisterState(false)
     setgetallproduct(false)
     setuserdettails(false)
    }
    else{
      alert("Please Login")
      setLoginHandler(true)
    }
  }

  
  let getAllProductHandler=()=>{
    if(logout){
    setproduct(false)
    setaddresturant(false)
    setLoginState(false)
    setRegisterState(false)
    setgetallproduct(true)
    setuserdettails(false)
    }
    else{
      setLoginHandler(true)
      alert("Please Login")
    }
  }

  let handleUserdetails=()=>{
    if(logout){
    setproduct(false)
    setaddresturant(false)
    setLoginState(false)
    setRegisterState(false)
    setgetallproduct(false)
    setuserdettails(true)
    }
    else{
      setLoginHandler(true)
      alert("Please Login")
    }
  }

  return (
    <>
    <Navbar setLoginHandler={setLoginHandler} setRegisterHandler={setRegisterHandler}  logout={logout} setlogouthandler={setlogouthandler} />
    <div className='main-layout'> 
    <Slidebar  handleResturant={handleResturant} handleproduct={handleproduct}  handleappproduct={getAllProductHandler} handleUserdetails={handleUserdetails}/>
      {
       loginstate && <Loginform logout={logout} setlogout={setlogout}/>
      }

      {
        registerState && <Registerform setLoginHandler={setLoginHandler}/>
      }

      {
        addresturantstate &&logout  &&  <Addresturantfrom />
      }

      {
        addproduct &&logout && <Addproductfrom/>
      }

      {
        getallproduct &&logout  && <Getallproduc />
      }
      {
        showUserdetails && logout && <Userdetails/>
      }
    </div>
    
    </>
  )
}

export default Landingpage