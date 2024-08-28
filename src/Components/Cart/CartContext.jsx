import React, { Children } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import AuthContext from "../Context/AuthContext";

const cartContext = createContext();

export default cartContext;

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { authTokens } = useContext(AuthContext);
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const { isEmpty, setIsEmpty } = useState(false);

  const [loading, setloading] = useState(false);

  const [cart, setCart] = useState(() => {
    const localStorageCart = localStorage.getItem("cart");
    console.log(localStorageCart);
    if (localStorageCart) {
      try {
        return JSON.parse(localStorageCart);
      } catch (error) {
        console.error("Error parsing stored cart:", error);
        return [];
      }
    }
    return [];
  });
  const [lines, setLines] = useState(() => {
    const localStorageCart = localStorage.getItem("lines");
    console.log(localStorageCart);
    if (localStorageCart) {
      try {
        return JSON.parse(localStorageCart);
      } catch (error) {
        console.error("Error parsing stored cart:", error);
        return [];
      }
    }
    return [];
  });
  const [product, setProduct] = useState(() => {
    const localStorageProduct = localStorage.getItem("product");
    if (localStorageProduct) {
      try {
        return JSON.parse(localStorageProduct);
      } catch (error) {
        console.error("Error parsing stored product:", error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (user) {
      fetchcart();
    }
  }, [user, authTokens]);

  const fetchcart = async () => {
    setloading(true);
    try {
      const response = await fetch(`${BASE_URL}apiv2/cart/`, {
        method: "GET",
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      if (!response.ok) {
         setCart([])
      } else {
        const data = await response.json();
        if (data) {
          setCart(data);
        } else {
          setCart([]);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        setloading(false);
      }
    } catch (error) {
      console.log(error);
      setCart([])
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  const updatecart = async () => {
    try {
      const response = await fetch(
        "https://frameyourmemories.up.railway.app/apiv2/updateCart",
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            cart: JSON.parse(localStorage.getItem("cart")),
          }),
        }
      );
      if (!response.ok) {
        console.log("error updating the cart");
      } else {
        const data = await response.json();
        setCart(data.cart);
        console.log(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearcart = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("products");
    localStorage.removeItem("lines");
    setCart([]);
    setProduct([]);
  };
  let contextdata = {
    cart: cart,
    setCart: setCart,
    product: product,
    clearcart: clearcart,
    updatecart: updatecart,
    fetchcart: fetchcart,
    loading: loading,
    lines: lines,
  };
  return (
    <cartContext.Provider value={contextdata}>{children}</cartContext.Provider>
  );
};
