import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


function Getallproduc() {

  let [productdetails,setproductdetails]=useState([])
  let sellerid=localStorage.getItem('sellerid')
  console.log(sellerid)
  let [resturantid,setreturantid]=useState("")


  let handleproduct=async (product)=>{
    console.log(product._id,product.resturant[0])
    try {

      let response=await fetch(`http://localhost:5018/providerresturant/${product.resturant[0]}/delete/${product._id}`,{method:"DELETE"})
      if(response.ok){
        
        let response =await fetch(`http://localhost:5018/providerresturant/get/${sellerid}`)
    let data=await response.json()
    console.log(response)
    if(response.ok){
      setproductdetails([...data])
      console.log(data)
    }
   }
    
  
  } catch (error) {
      console.log(error)
    }
  }

    


  // let handleproduct=(product,resturantid)=>{console.log(product._id,resturantid)}
  // useEffect(()=>{
  //   let getdata=async ()=>{
  //     let response=
  //   }
  // })

  // let handledeltebutton= async (item,resturantid)=>{
  //   console.log(item.resturant[0])
  //   console.log(item._id)

  //   try {
  //     let response=await fetch(`http://localhost:5018/providerresturant/${item.resturant[0]}/delete/${item._id}`,{method:"DELETE"})
  //     let data=await response.json()
  //     let id=item._id

  //     if(response.ok){
  //     let update= productdetails.map((resturant)=>{
  //       if(resturant._id==resturantid){
  //         return {...resturant, products: restaurant.products.filter(p => p._id !== product._id)};

  //       }
  //       return resturant  
  //      })
  //      setproductdetails([...update])
  //     }


  //   } catch (error) {
      
  //   }

  // }

  useEffect(()=>{
    let getproducts=async ()=>{
   try {
     let response =await fetch(`http://localhost:5018/providerresturant/get/${sellerid}`)
    let data=await response.json()
    console.log(response)
    if(response.ok){
      setproductdetails([...data])
      console.log(data)
      
    }
    else{
      return <><h1>No prodcuts</h1></>
    }
    console.log(data)
   } catch (error) {
          console.log(error)
          if(error){
            return <><h1>Server error</h1></>
          }
   }
 
  }
  getproducts()
  },[])

  

  return (
   <>
    <div className='container'>
      <div className='row'>

        {  

          
        
       
          productdetails.map((resturant)=>{
            return(
              
             <>
            <center > <h1 >{resturant.resturantname}</h1></center>
              { 

            resturant.products.map((product)=>{
                  
                  return(
                    <>
                   
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="border p-2 h-100">
              <div>
                <img
                  src={`http://localhost:5018/uploads/${product.image}`}
                  className="img m-2"
                  alt="idly"
                />
               <h3 className='m-1 text-warning'>{product.dishname}</h3>
                <h4 className='text-secondary'>price:{product.price}</h4>
               {
                (product.bestseller)?( <span className="badge bg-success">Bestseller</span>):( <span className="badge bg-success"></span>)
               }
               <p className='text-primary'>{product.description}</p>
               <div>
                <button className='btn btn-warning'>Edit</button>
                  <button className='btn btn-danger m-1' onClick={()=>{handleproduct(product)}} >Delete</button>
               </div>
              </div>
            </div>
          </div>
                    </>
                  )
                })
              
              }
             
             </> 
            
            )
         })



        }
        

      </div>

    </div>
   </>
  )
}

export default Getallproduc