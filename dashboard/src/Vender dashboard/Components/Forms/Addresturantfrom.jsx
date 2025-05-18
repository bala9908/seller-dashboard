import React, { useState,useEffect, use } from 'react';
import Select from 'react-select';
import axios from 'axios'
import { Form } from 'react-bootstrap';
function Addresturantfrom() {

  let [citiesdata,setcitiesdata]=useState([])
  let [resturantname,setresturantname]=useState("") 
  let [resturanttype,setresturanttype]=useState([])
  let [regiondishes,setregiondishes]=useState([])
  let [offer,setoffer]=useState(undefined)
  let [state,setstate]=useState("")
  let [city,setcity]=useState("")
  let [address,setaddress]=useState("")
  let [image,setimage]=useState(null)



  useEffect(()=>{

    let getdata=async ()=>{
      let response=await fetch("https://api-toget-all-cities-inindia.onrender.com/send/get")
      let storeddata=await response.json()
        let sorteddata=storeddata.sort((a, b) => a.name.localeCompare(b.name));

    setcitiesdata(sorteddata);
    }
    getdata()
    

  },[])


  useEffect(()=>{
    console.log(state)
  },[state])


  useEffect(()=>{
    console.log(regiondishes)
  },[regiondishes])

  useEffect(()=>{
    console.log(city)
  },[city])

  let regioncheckboxhandle=(e)=>{
    let {value,checked}=e.target
    if(checked){
      setregiondishes([...regiondishes,value])
    }
    else{
      setregiondishes(regiondishes.filter((item)=>{ return item!=value}))
    }
  }
  

  // this function  is used to if dishregion checkbox is checked the item will be added to array if again checkbox is checked the item will be removed from list

  // useEffect(()=>{console.log(regiondishes)},[regiondishes]) this is used to check the the region dishes array is changed or not
 

let dishtypecheckboxhandle=(e)=>{
  let {checked,value}=e.target
  if(checked){
    setresturanttype([...resturanttype,value])
  }
  else{
    setresturanttype(resturanttype.filter((item)=>{return item!=value}))
  }
}
useEffect(()=>{console.log(resturanttype)},[resturanttype])


  let resutanthandler=async (e)=>{
    e.preventDefault()
    try{
    let token=localStorage.getItem("token")
    if(!token){
      console.log("Token Not valid")
    }

    const formData = new FormData();
            formData.append("resturantname", resturantname);
            regiondishes.forEach((item) => {
              formData.append("regiondishes", item);
            });
            
            resturanttype.forEach((item) => {
              formData.append("resturanttype", item);
            });
            formData.append("offer", offer);
            formData.append("state", state);
            formData.append("city", city);
            formData.append("address", address);
            formData.append("image", image); 



    let response=await fetch("http://localhost:5018/resturant/addresturant",{method:"POST",headers:{
      "Authorization":`Bearer ${token}`},
      body:formData
    })
    
    let data=await response.json()
    if(response.ok){
      console.log(data)
      alert("registration successfull")
      localStorage.setItem("resturantid",data._id)
    }
    else{
      console.log(data)
      alert("register failed")
    }
  }


 
    catch(error){
      console.log(error)
    }
  }



  return(
    <>
    <div className='login-form'>
      <form onSubmit={resutanthandler} className='authform  addresturant-form-box' >
      
       <center> <h2 className='registerlabel'>Add Resturant</h2></center>
   
        <div >
          <label htmlFor='resturantname' className='registerlabel'>Resturant Name</label>
          <input type='text'  id='resturantname' name='resturantname' onChange={(e)=>{setresturantname(e.target.value)}}/>
        </div>

        <div className='resturantcheckbox'>
        <label className='registerlabel'>Resturant Type</label>
        <div className='resturantcheckbox margin'>
          <div >
         <label htmlFor='veg' className='registerlabel resturanttype' >Veg</label>
         <input type='checkbox' value="Veg" id='veg' onChange={dishtypecheckboxhandle}/>
         </div>
         <div >
         <label htmlFor='nonveg' className='registerlabel resturanttype' >Non-veg</label>
         <input type='checkbox' value="Non-veg" id='nonveg' onChange={dishtypecheckboxhandle}/>
        </div>
        </div>
        </div>


        <label className='registerlabel'>Region Dishes</label>

        <div className='dishregion'>
          <div className='dishregion m-2'>
       <label htmlFor='south' className='registerlabel' >South</label>
       <input type='checkbox' id='south' value="South" onChange={regioncheckboxhandle}/>
       </div>

       <div className='dishregion m-2'>
       <label htmlFor='north' className="registerlabel">North</label>
       <input type='checkbox' id='north' value="North" onChange={regioncheckboxhandle}/>
       </div>

   
       <div className='dishregion m-2'>
       <label htmlFor='italian' className='registerlabel'>Italian</label>
       <input type='checkbox' id='italian' value="Italian" onChange={regioncheckboxhandle}/>
       </div>


       <div className='dishregion m-2'>
       <label htmlFor='chinese' className='registerlabel'>Chinese</label>
       <input type='checkbox' id='chinese' value="Chinese" onChange={regioncheckboxhandle}/>  
       </div>


        </div>

        <div>
          <div>
          <label htmlFor='offer' className='registerlabel'>Offer</label>
          </div>
          <input type='number' id='offer' onChange={(e)=>{setoffer(e.target.value)}}/>
        </div>


        <div >
        <div>
        <label className='registerlabel' htmlFor='state'>State</label>
        </div>
      <select id='state' className='selectoption' onChange={(e)=>{setstate(e.target.value)}}>
        <option value="">Choose your state</option>
      <option value="Andhra Pradesh">Andhra Pradesh</option>
      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
      <option value="Assam">Assam</option>
      <option value="Bihar">Bihar</option>
      <option value="Chhattishgarh">Chhattishgarh</option>
      <option value="Goa">Goa </option>
      <option value="Gujarat">Gujarat</option>
      <option value="Himachal Pradesh ">Himachal Pradesh</option>
      <option value="Jharkhand ">Jharkhand </option>
      <option value="Karnataka ">Karnataka </option>
      <option value="Kerala">Kerala</option>
      <option value="Madhya Pradesh">Madhya Pradesh</option>
      <option value="Maharashtra">Maharashtra </option>
      <option value="Manipur">Manipur</option>
      <option value="Meghalaya">Meghalaya</option>
      <option value="Mizoram">Mizoram</option>
      <option value="Nagaland">Nagaland</option>
      <option value="Odisha">Odisha</option>
      <option value="Punjab">Punjab</option>
      <option value="Rajasthan">Rajasthan</option>
      <option value="Telengana">Telengana</option>
     </select>
 </div>



      <div >
        <div>
        <label className='registerlabel' htmlFor='city'>City</label>
        </div>
        <select id='city' className='selectoption' onChange={(e)=>{setcity(e.target.value)}} >
        <option value="">Choose your City</option>
      {
        citiesdata.map((city,i)=>{
          return( 
            <>
            <option value={city.name} key={i} >{city.name}</option>
            </>
          )
        })
      }
    </select>    

      </div>

        <div>
          <div>
            <label className='registerlabel' htmlFor='address'>Address</label>
          </div>
        <input type='text' id='address' onChange={(e)=>{setaddress(e.target.value)}}/>
        </div>

        <div>
          <label htmlFor='image' className='registerlabel'>Image</label>
          <input type='file' accept='image/*' className='registerlabel' onChange={(e)=>{setimage(e.target.files[0])}}/>

        </div>
        <center><button className='btn btn-primary mt-3'>Submit</button></center>
      </form>
    </div>
    </>
  )

}

export default Addresturantfrom;
