import react, {useState, useContext, createContext, useEffect} from 'react'
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [sameCat, setSameCat] = useState([])
    const [qty, setQty] = useState(1);

    const onAdd = (product, quantity) => {

        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        
        if(checkProductInCart) {
          const updatedCartItems = cartItems.map((cartProduct) => {

            if(cartProduct._id === product._id) return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity
              
            }
          })
    
          setCartItems(updatedCartItems);
        } else {
          product.quantity = quantity;          
          setCartItems([...cartItems, { ...product }]);
        }
    
        toast.success(`${qty} ${product.name} added to the cart.`);
      } 

      const onRemove = (id, quantity) =>{

        let foundPro = cartItems.find((item)=> item._id === id)

        let filteredCart = cartItems.filter((item)=> item._id !== id)

         setTotalPrice((prevTotalPrice)=> prevTotalPrice - foundPro.price )
         setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities - foundPro.quantity)

        setCartItems(filteredCart)

      }

      const toggleTotalPrice = (id,value)=>{
           let foundProduct = cartItems.find((item)=> item._id === id)
           let foundIndex = cartItems.findIndex((item)=> item._id === id)

           let newfoundProduct = cartItems.filter((item)=> item._id !== id)

           if(value === 'inc'){
             setCartItems([... newfoundProduct, {...foundProduct, quantity : foundProduct.quantity + 1}])
             setTotalPrice((prevTotalPrice)=> prevTotalPrice + foundProduct.price)
             setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities + 1)

           } else if(value === 'dec'){
             if (foundProduct.quantity > 1) {
              setCartItems([... newfoundProduct, {...foundProduct, quantity : foundProduct.quantity - 1}])
              setTotalPrice((prevTotalPrice)=> prevTotalPrice - foundProduct.price)
              setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities - 1)
             }
           } 
      }

    const incQty = ()=>{
        setQty((prevQty)=> prevQty + 1)
    }

    const decQty = ()=>{
        setQty((prevQty)=> {
            if(prevQty - 1 < 1){
                return 1
            }
          return prevQty - 1;  
        })
    }

    const changesHandle = ()=>{
       setQty(1)
    }

   return(
       <Context.Provider value={{incQty, decQty, onAdd, toggleTotalPrice, onRemove, changesHandle, qty, showCart,  setShowCart, totalQuantities, totalPrice, cartItems, sameCat, setSameCat }}>
          {children}
       </Context.Provider>
   )
}

export const GlobalContext = ()=>{
    return useContext(Context);
}