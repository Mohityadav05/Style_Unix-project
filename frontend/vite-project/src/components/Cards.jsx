import React from 'react'
import './Cards.css'
import { useNavigate } from 'react-router-dom';

function Cards() {
  const navigate = useNavigate();
  const handleWomen = () => {
    navigate('/WomenCloth');
  }
  const handleMen = () => {
    navigate('/MenCloth');
  }

  const handleKids = () => {
    navigate('/Kids');
  }

  const handleSummer = () => {
    navigate('/Summer');
  }
  const handleWinter = () => {
    navigate('/Winter');
  }
  const handleFootwear = () => {
    navigate('/Footwear');
  }
  const handleAccessories = () => {
    navigate('/Accessories');
  }
  const handleBags = () => {
    navigate('/Bags');
  }
  const handleSoftToys = () => {
    navigate('/Softtoy');
  }


  return (
   <div className='cards'>
        <div className='card1 cardall'><button className='btn' onClick={handleWomen}>Women</button></div>
        <div className='card2 cardall'><button className='btn' onClick={handleMen}>Men</button></div>
        <div className='card3 cardall'><button className='btn' onClick={handleKids}>Kids</button></div>
        <div className='card4 cardall'><button className='btn' onClick={handleSummer}>Summer</button></div>
        <div className='card5 cardall'><button className='btn' onClick={handleWinter}>Winter</button></div>
        <div className='card6 cardall'><button className='btn' onClick={handleFootwear}>Footwear</button></div>
        <div className='card7 cardall'><button  className='btn' onClick={handleAccessories}>Accessories</button></div>
        <div className='card8 cardall'><button className='btn' onClick={handleBags}>Bags</button></div>
        <div className='card9 cardall'><button className='btn' onClick={handleSoftToys}>Soft Toys</button></div>
   </div>
  )
}

export default Cards