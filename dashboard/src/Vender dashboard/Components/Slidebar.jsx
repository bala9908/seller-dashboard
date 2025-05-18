import React from 'react'

function Slidebar({ handleResturant,handleproduct,handleappproduct,handleUserdetails}) {
  return (
    <div className='slidebar'>
        <ul>
            <li onClick={handleResturant}>Add resturant</li>
            <li onClick={handleproduct}>Add Product</li>
            <li onClick={handleappproduct}>All Products</li>
            <li onClick={handleUserdetails}>User Details</li>
        </ul>
    </div>
  )
}

export default Slidebar