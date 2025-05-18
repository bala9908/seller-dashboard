import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


function Userdetails() {

  let sellerid=localStorage.getItem("sellerid")

  let [userDetails,setUserDetails]=useState({})

  let [resturant,setrestrant]=useState([])


  useEffect(()=>{
    let getdetails=async ()=>{
        let response=await fetch(`http://localhost:5018/provider/single-vendor/${sellerid}`,{method:"GET"})
        let data=await response.json()
        if(response.ok){
            console.log(data)
            setUserDetails({...data})
            setrestrant([...data.resturant])
        }
    }
    getdetails()
  },[])

  return (
    <>
  <div className='userdetailspage'>
    <div className='m-5'>
      {
        userDetails.image==null ?(<img src='https://cdn-icons-png.flaticon.com/512/847/847969.png' className='user-image'/>):( <img src={`http://localhost:5018/uploads/${userDetails.image}`} className='user-image ' />)
      }
   
    <h2 className='text-light '>{userDetails.username}</h2>
    <p className='text-light'>{userDetails.useremail}</p>
      
    <div>
      <ul>
        {
          resturant.map((resturant)=>{
            return(
              <>
              <li>{resturant.resturantname}</li>  
              </>
            )
          })
        }
      </ul>
    
    </div>
    </div>
  </div>
  <div className='container-2'>
        <center><h1>Hello</h1></center>
        <div className="">
    <h1>Restaurant Gallery</h1>
    <div className="gallery">
     
      {
        resturant.map((resturant)=>{
          return(
            <>
             <div className="card">
        <img src={`http://localhost:5018/uploads/${resturant.image}`} alt="Restaurant 1" className='resturant-image'/>
        <h2>{resturant.resturantname}</h2>
      </div>
            </>
          )
        })
      }
     
    </div>
  </div>
  </div>
    </>
  )
}



export default Userdetails