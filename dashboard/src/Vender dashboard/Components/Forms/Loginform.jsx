import React, { use } from 'react'
import { useState } from 'react';
function Loginform({logout,setlogout}) {
  let [useremail,setuseremail]=useState("")
  let [password,setpassword]=useState("")

  let handleform=async (e) => {
    e.preventDefault()
    try {
      let response=await fetch('http://localhost:5018/provider/login',{method:"POST",headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({useremail,password})
    })
    let data= await response.json()
    if(response.ok){
      alert("login Successfull")
      // console.log(data.token)
      // console.log(data.islogin)
      localStorage.setItem('token',data.token)
      localStorage.setItem('islogin',data.islogin)
      console.log(data)
      localStorage.setItem('sellerid',data.userid)
      setlogout(true)
    }
    else{
      alert(data.message)
    }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <>
      <div className='login-form'>
        
        <form onSubmit={handleform} className='authform login-form-box'>
            <div className='image-container'>
        <img src='https://cdn-icons-png.flaticon.com/512/847/847969.png' className='user-image'/>
        </div>
        <center><h3 className='heading'>User Login</h3></center>
         <label htmlFor='email' className='registerlabel'>User email</label> <br />
        <input type='email' id='email' placeholder='Enter your email' required  onChange={(e)=>{setuseremail(e.target.value )}}/><br />
        <label htmlFor='password' className='registerlabel'>Password</label><br />
        <input type='text' id='password' placeholder='Enter your password' required onChange={(e)=>{setpassword(e.target.value)}}/><br />
        <center >
        <button type='submit' className='btn btn-warning mt-2 '>Submit</button>
        </center>
        </form>
        </div>

    </>
  )
}

export default Loginform;