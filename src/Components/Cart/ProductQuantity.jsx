import React, { useContext, useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import Product from "../Product";
import cartContext from "./CartContext";

function ProductQuantity({ quantity ,ProductId}) {

  const [productQuantity, setProductQuantity] = useState(quantity);
  const {cart,setCart,updatecart}=useContext(cartContext)
  const {product,setProduct}=useContext(cartContext)

  const handleIncrement = (e) => {
    setProductQuantity(productQuantity + 1);
    const updatedCart = cart.map((item) =>
      item.product === ProductId ? { ...item, quantity: productQuantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart',JSON.stringify(updatedCart))
    updatecart()
  };

  const handleDecrement = (e) => {
    if (productQuantity > 0) {
      setProductQuantity(productQuantity - 1);
      const updatedCart = cart.map((item) =>
        item.product === ProductId ? { ...item, quantity: productQuantity - 1 } : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart',JSON.stringify(updatedCart))
      updatecart()
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <button
        style={{
          width: "50px",
          backgroundColor: "whitesmoke",
          borderRadius: "4px",
          border: "1px solid black",
        }}
        onClick={(e) => handleDecrement(e)}
      >
        {" "}
        -{" "}
      </button>
      <span
        style={{ fontSize: "1rem", marginRight: "1rem", marginLeft: "1rem" }}
      >
        {productQuantity}
      </span>
      <button
        style={{
          width: "50px",
          backgroundColor: "whitesmoke",
          borderRadius: "4px",
          border: "1px solid black",
        }}
        onClick={(e) => handleIncrement(e)}
      >
        {" "}
        +{" "}
      </button>
     {/* {productQuantity == 0 && (
        <>
          <button
            style={{
              width: "70px",
              backgroundColor: "whitesmoke",
              borderRadius: "4px",
              border: "1px solid black",
              marginTop: '1rem'
            }}
          >
            Remove Item ?
          </button>
        </>
      )} */}
    </div>
  );
}

export default ProductQuantity;
