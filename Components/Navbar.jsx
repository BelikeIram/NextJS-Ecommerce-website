import React, {useState} from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from 'react-icons/ai'
import { GlobalContext } from '@/Context/StateContext'
import Cart from './Cart'

const Navbar = () => {

  const {showCart, setShowCart, totalQuantities, cartItems, setCartItems} = GlobalContext();
  return (
    <>
    <div className='navbar-container'>
    <p className='logo'>
       <Link
         href={`/`}
       >IRA Headphones
       </Link>  
    </p>  
    <button 
    className="cart-icon"
    onClick={()=>setShowCart(true)}
    >
      <AiOutlineShopping/>
      <span className='cart-item-qty'>{totalQuantities}</span>
    </button>
    { showCart && <Cart/>}
  </div>
    </>
)
}

export default Navbar