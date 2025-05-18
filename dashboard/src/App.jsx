import React from 'react'
import './App.css'
import Landingpage from './Vender dashboard/Pages/Landingpage'
import {Routes,Route} from 'react-router'
import Notfound from './Vender dashboard/Components/Forms/Notfound'
function App() {
  return (
    <div className=''>
  <Routes>
    <Route path='/' element={<Landingpage/>}></Route>
    <Route path='/*' element={<Notfound/>} ></Route>
  </Routes>
    </div>
  )
}

export default App