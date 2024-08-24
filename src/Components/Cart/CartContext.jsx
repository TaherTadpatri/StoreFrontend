import React, { Children } from "react";
import { createContext,useContext,useState,useEffect } from "react";
import AuthContext from "../Context/AuthContext";

const cartContext=createContext();



export default cartContext;

export const CartProvider =({children}) =>{ 
    const {user}=useContext(AuthContext)
    const {authTokens}=useContext(AuthContext)

    let [cart, setCart] = useState(() => (localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []))
    let [product, setProduct] = useState(() => (localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : []))
    
    useEffect(()=>{ 
        if(user){ 
              fetchcart();
        }
    },[authTokens])

    const fetchcart = async () => {
        try {
          const response = await fetch("https://frameyourmemories.up.railway.app/apiv2/cart/", {
            method: "GET",
            headers: {
              "content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access),
            },
          }); 
          if (!response.ok) {
            console.log('error fetching')
          } else {
            const data = await response.json();
            setCart(data.Cart);
            setProduct(data.productsInformation)
            localStorage.setItem('cart', JSON.stringify(data.Cart));
            localStorage.setItem('product',JSON.stringify(data.productsInformation))
          } 
        } catch (error) {
          console.log(error)
        }
      };
    useEffect(()=>{ 
        if(user){ 
            localStorage.setItem('cart',JSON.stringify(cart)) 
            localStorage.setItem('product',JSON.stringify(product))
        }
    },[cart])
    const updatecart = async() =>{ 
        try { 
            const response = await fetch('https://frameyourmemories.up.railway.app/apiv2/updateCart',{ 
                method : 'POST',
                headers: {
                    "content-Type": "application/json",
                    Authorization: "Bearer " + String(authTokens.access),
                  },
                  body:JSON.stringify({ 
                    cart: JSON.parse(localStorage.getItem('cart'))
                  })
            })
            if(!response.ok){ 
                console.log('error updating the cart') 
            }
            else { 
                const data= await response.json() 
                setCart(data.cart)
                console.log(cart)
                localStorage.setItem('cart',JSON.stringify(cart))
            }
        }catch(error){ 
            console.log(error)
        }
    }

    const clearcart = () =>{ 
        localStorage.removeItem('cart')
        localStorage.removeItem('products')
        setCart([])
        setProduct([])
    }
    let contextdata={ 
        cart : cart ,
        setCart : setCart,
        product  : product,
        clearcart : clearcart,
        updatecart : updatecart,
        fetchcart : fetchcart,
        }
    return (
     <cartContext.Provider value={contextdata}>
        {children}
     </cartContext.Provider>
    )
}