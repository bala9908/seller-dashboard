
import { useState ,useEffect} from "react"
import React from 'react'

function Addproductfrom() {
  let [dishname,setdishname]=useState("")
  let [dishtype,setdishtype]=useState("")
  let [price,setprice]=useState(undefined)
  let [description,setdiscription]=useState("")
  let [bestseller,setbestseller]=useState(true)
  let [dishregion,setdishregion]=useState("")
  let [image,setimage]=useState(null)

  let [sellerresturants,setsellerresutant]=useState([])
  let [resturant,setresturant]=useState("")
  let sellerid=localStorage.getItem("sellerid")


  useEffect(()=>{
    let getresturantfromsellers=async () => {
    try {
      let responsefromseller=await fetch(`http://localhost:5018/provider/single-vendor/${sellerid}`)
      let data=await responsefromseller.json()
      console.log(data)
      if(responsefromseller.ok){
        let valuesofresturants=data.resturant
        console.log(valuesofresturants)
        setsellerresutant([...valuesofresturants])

            }
    } catch (error) {
      console.log(error)
    }
  }

  


  getresturantfromsellers()
  },[])




useEffect(()=>{
  console.log(dishname)
},[dishname])

useEffect(()=>{
 console.log(dishtype)
},[dishtype])

useEffect(()=>{
  console.log(price)
 },[price])

 useEffect(()=>{
  console.log(description)
 },[description])

 useEffect(()=>{
  console.log(bestseller)
 },[bestseller])

 useEffect(()=>{
  console.log(dishregion)
 },[dishregion])

 useEffect(()=>{
  console.log(image)
 },[image])


 let handleform=async (e) => {
  e.preventDefault()
  try {

   let formData=new FormData();
    formData.append("dishname", dishname);
    formData.append("dishtype", dishtype);
    formData.append("dishregion",dishregion);
    formData.append("price",price)
    formData.append("description",description)
    formData.append("bestseller",bestseller)
    formData.append("image",image)

    let token=localStorage.getItem("token")



     let response=await fetch(`http://localhost:5018/providerresturant/addproduct/${resturant}`,{method:"POST",headers:{
      "Authorization":`Bearer ${token}`
     },
      // body:JSON.stringify({dishname,dishregion,price,bestseller,dishtype,image,description})

      body:formData
    })

    let data=await response.json()
    if(response.ok){
      alert('product upload success full')
      console.log(data)
      setdishname("")
      setdishtype("")
      setdishregion("")
      setdiscription("")
      setbestseller(true)
      setimage(null)
      setprice("")
    }else{
      alert(data)
       
      
    }

  } catch (error) {
    console.log(error)
     
  }
 }

  return (
    <>
    <div className='login-form'>
        
        <form onSubmit={handleform} className='authform login-form-box'>
            {/* <div className='image-container'>
        <img src='https://cdn-icons-png.flaticon.com/512/847/847969.png' className='user-image'/>
        </div> */}
        <center><h3 className='heading'>Add Product</h3></center>

       
 <label className='registerlabel'>Select Restaurant</label>
        <select className='selectoption' onChange={(e) => setresturant(e.target.value)} value={resturant}>
          <option value="">Select restaurant</option>
          {
            sellerresturants.map((item, index) => (
              <option key={index} value={item._id}>
                {item.resturantname}
              </option>
            ))
          }
        </select><br />

         <label htmlFor='productname' className='registerlabel'>Dish Name</label> <br />
        <input type='text' id='productname' placeholder='Enter your productname' onChange={(e)=>{setdishname(e.target.value)}} value={dishname} required/><br />
        <label htmlFor='dishtype' className='registerlabel'>Dish type</label><br />
        <select id='dishtype' className='selectoption' onChange={(e)=>{setdishtype(e.target.value)}} value={dishtype} required>
          <option value="">Select dish type</option>
            <option value="Veg">Veg</option>
            <option value="Non-veg">Non-veg</option>
        </select><br />
        <label className='registerlabel'>Dish Region</label><br/>
        <select id='regiondishes' className='selectoption'  onChange={(e)=>{setdishregion(e.target.value)}} value={dishregion} required>
          <option value="">Select dishregion</option>
            <option value="South">South</option>
            <option value="North">North</option>
          <option value="Italian">Italian</option>
          <option value="Chinese">Chineese</option>
        </select><br />


        <div>
          <div>
          <label htmlFor='price' className='registerlabel'>Price</label>
          </div>
          <input type='number' id='price' onChange={(e)=>{setprice(e.target.value)}} value={price} required/>
        </div>



        <div>
          <div>
          <label htmlFor='description' className='registerlabel'>Description</label>
          </div>
          <input type='text' id='description'  onChange={(e)=>{setdiscription(e.target.value)}} value={description} required/>
        </div>

           
            <div className='bestseller  '>
            <label className='registerlabel m-2'>Bestseller</label>
        <div className='bestseller m-2'>
          <label htmlFor='yes'  className='registerlabel'  >Yes</label>
          <input type='radio'  className='registerlabel' id="yes" name="bestseller" value={true} onChange={(e)=>{setbestseller(e.target.value)}} required />
          </div>
          <div className='bestseller m-2'>
          <label htmlFor='no'  value="no" className='registerlabel'>No</label>
          <input type='radio'  className='registerlabel' id="no" name="bestseller" value={false} onChange={(e)=>{setbestseller(e.target.value)}} required/>
        </div>
        </div>

     
     
        <div>
          <label htmlFor='image' className='registerlabel'>Image</label>
          <input type='file' accept='image/*' className='registerlabel' onChange={(e)=>{let file=e.target.files[0]  
            if(file){
            setimage(file)
            }
          }} />

        </div>

      

        
        <center >
        <button type='submit' className='btn btn-warning'>Submit</button>
        </center>


        </form>
        </div>
    </>
  )
}

export default Addproductfrom