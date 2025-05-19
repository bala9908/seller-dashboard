import React, { useEffect } from 'react'
import { useState } from 'react'
import {redirect, useNavigate} from 'react-router'
import Loginform from './Loginform'
import { url } from '../../../Link'
function Registerform({setLoginHandler}) {
  let[user,setuser]=useState({username:"",useremail:"",password:"",image:""})
  let [error,seterror]=useState("")
  let [loading,setloading]=useState(false)
  let [isregistered,setisregistered]=useState(false)
  let [previewimage,setpreviewimage]=useState("")

 useEffect(()=>{
  console.log(previewimage)
 },[previewimage])

  let handleimage=(e)=>{
    let file=e.target.files[0 ] 

    setuser({...user,image:file})

    let imageurl=URL.createObjectURL(file)
    setpreviewimage(imageurl)
  }

  useEffect(()=>{
    console.log(user.image)
  },[user.image])



 let  handleform= async (e)=>{
   e.preventDefault()

   let formData=new FormData()
   formData.append("username", user.username);
    formData.append("useremail", user.useremail);
    formData.append("password",user.password);
    formData.append("image",user.image)
    try {
      let response=await fetch(`${url}/provider/register`,{method:"POST",
      body:formData
    })
    let data= await response.json()
    if(response.ok){
      console.log(data)
      alert("registered sucessfull")
      setisregistered(true)
      setLoginHandler()
    }
    else{
      console.log(data.message)
      alert(data.message)
    }
    } catch (error) {
      
    }finally{
      setloading(false)
    }
    console.log(user)
  }
    return (


    <>
    
    
      <div className='register-form'>
        
        <form onSubmit={handleform}  className='authform form-box '>
            {/* <div className='image-container'>
        <img src='https://png.pngtree.com/png-clipart/20190516/original/pngtree-users-vector-icon-png-image_3725294.jpg' className='user-image'/>
        </div> */}



<div className='image-container'>
      <img src={previewimage} className='user-image' />  
        </div>
        <center><h3 className='registerlabel'>Register</h3></center>
        <div className='margin'>
        <label htmlFor='username' className='registerlabel'>User Name</label> <br />
        <input type='text' id='username' name='username' placeholder='Enter your username' onChange={(e)=>{setuser({...user,username:e.target.value})}}/><br />
        </div>

        <div className='margin'>
        <label htmlFor='email' className='registerlabel'>User email</label> <br />
        <input type='text' id='email' name="useremail" placeholder='Enter your email' onChange={(e)=>{setuser({...user,useremail:e.target.value})}}/><br />
        </div>
        <div className='margin'>
        <label htmlFor='password' className='registerlabel'>Password</label><br />
        <input type='text' id='password' name='password' placeholder='Enter your password' onChange={(e)=>{setuser({...user,password:e.target.value})}}/><br />
        </div>


         <div className='margin'>
        <label htmlFor='image' className='registerlabel'>Image</label><br />
        <input type='file' id='image' name='image' accept='image/*'  onChange={handleimage}/><br />
        </div>


        <center >
        <button type='submit' className='btn btn-warning text-white'>Submit</button>
        </center>
        </form>
        </div>

  </>
  )
}

export default Registerform