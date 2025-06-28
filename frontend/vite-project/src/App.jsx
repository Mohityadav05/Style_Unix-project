import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Cards from './components/Cards'
import Footer from './components/Footer'
import Login from './components/Login'
import Signup from './components/Signup'
import WomensCloth from './components/WomensCloth'
import MenCloth from './components/MenCloth'
import Kids from './components/Kids'
import Summer from './components/Summer'
import Winter from './components/Winter'
import Footwear from './components/Footwear'
import Accessories from './components/Accessories'
import Softtoy from './components/Softtoy'
import Bags from './components/Bags'
import Cart from './components/Cart';
import Buy from './components/Buy';
import Payment from './components/Payment';
import Search from './components/search';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar /><Hero /><Cards /><Footer /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/womencloth" element={<><Navbar/><WomensCloth/></>} />
        <Route path="/mencloth" element={<><Navbar/><MenCloth/></>} />
        <Route path="/kids" element={<><Navbar/><Kids/></>} />
        <Route path="/summer" element={<><Navbar/><Summer/></>} />
        <Route path="/winter" element={<><Navbar/><Winter/></>} />
        <Route path="/footwear" element={<><Navbar/><Footwear/></>} />
        <Route path="/accessories" element={<><Navbar/><Accessories/></>} />
        <Route path="/bags" element={<><Navbar/><Bags/></>} />
        <Route path="/softtoy" element={<><Navbar/><Softtoy/></>} />
        <Route path="/cart/" element={<><Navbar/><Cart/></>} />
        <Route path="/Buy" element={<><Navbar/><Buy/></>} />
        <Route path="/Payment" element={<><Navbar/><Payment/></>} />
        <Route path='/Search' element={<><Search/></>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
    </>
  )
}

export default App;