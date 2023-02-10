import React, {useRef} from 'react'
import { GlobalContext } from '@/Context/StateContext'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import  Link  from 'next/link';
import { urlFor } from '@/lib/Client';
import getStripe from '../lib/getStripe'

const Cart = () => {
 
  const {setShowCart, totalQuantities, totalPrice, cartItems, toggleTotalPrice, onRemove} = GlobalContext();

  const handlePayment = async ()=>{
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;
    
    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }

  const {cartRef} = useRef();



  return (
    <div className='cart-wrapper' ref={cartRef}>
       <div className='cart-container'>
          <button 
          className='cart-heading'
          type='button'
          onClick={()=> setShowCart(false)}
          >
             <AiOutlineLeft/>
             <span className="heading">Your Cart</span>
             <span className="cart-num-items">({totalQuantities} items)</span>
          </button>
          {cartItems.length < 1 && (
             <div className='empty-cart'>
                <AiOutlineShopping size={150}/>
                <h3>Your shopping bag is empty</h3>
                <Link href='/'>
                  <button 
                  className='btn'
                  type='button'
                  onClick={()=> setShowCart(false)}
                  >
                    Continue Shopping
                  </button>
                </Link>
             </div>
          )}

          {cartItems.length >= 1 && cartItems.map((item)=>(
             
             <div className='product'>
                <img src={urlFor(item?.image[0])} className='cart-product-image'/>
                <div className='item-desc'>
                   <div className='flex top'>
                      <h5>{item.name}</h5>
                      <h4>{item.price}</h4>
                   </div>
                   <div className='flex bottom'>
                       <div>
                          <p className='quantity-desc'>
                          <span className="minus" onClick={()=> toggleTotalPrice(item._id, 'dec')}>
                          <AiOutlineMinus />
                          </span>
                          <span className="num">{item.quantity}</span>
                          <span className="plus" onClick={()=> toggleTotalPrice(item._id, 'inc')}><AiOutlinePlus /></span>
                          </p>
                       </div>
                       <button
                       type="button"
                       className="remove-item"
                       onClick={()=>onRemove(item._id)}
                        >
                          <TiDeleteOutline />
                     </button> 
                   </div>
                </div>
             </div>
          ))}
    
          {cartItems.length >= 1 && (
            <div className="cart-bottom">
              <div className="total">
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div className="btn-container">
                <button type="button" className="btn" onClick={handlePayment}>
                  Pay with Stripe
                </button>
              </div>
            </div>
          )}

       </div>
    </div>
  )
}

export default Cart