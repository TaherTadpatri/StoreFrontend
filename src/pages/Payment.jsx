import { Box, Button, Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useContext, useState } from "react";
import { useCallback, useEffect } from "react";
import useRazorpay from "react-razorpay";
import CartSummary from "../Components/OrderSummary/CartSummary";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { json, useNavigate, useParams } from "react-router-dom";
import Information from "../Components/Checkout/Information";
import cartContext from "../Components/Cart/CartContext";
import { Alert } from "@mui/material";
import AuthContext from "../Components/Context/AuthContext";
import { fetchShippingAddress } from "../Components/Checkout/Information";
import logo from "../../public/studioframe.png";

const calculateTotal = (cart) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return total;
};
function Payment() {
  const [Razorpay, isLoaded] = useRazorpay();
  const navigate = useNavigate();
  const { cart } = useContext(cartContext);
  const { user, authTokens } = useContext(AuthContext);
  const [totalAmount, setTotalAmount] = useState();
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [OrderLoading,setOrderLoading]=useState(false) 
  const currency = "INR";
  const params = useParams();
  const oscarOrderId = params?.oscarOrderId;
  console.log(oscarOrderId);
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  const createOrder = async () => {
    const total = calculateTotal(cart);
    setloading(true)
    try {
      const response = await fetch("http://127.0.0.1:8000/api/createOrder/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({
          amount: total,
          currency: currency,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data.data);
      
      return data.data;

    } catch (error) {
      alert(error);
      console.log(error);
      setloading(false)
    } finally {
    }
  };
  const complete_order = async (payment_id, order_id, signature) => {
    const total = calculateTotal(cart);
    setOrderLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/api/completeOrder/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({
          payment_id: payment_id,
          order_id: order_id,
          signature: signature,
          oscar_order_id: oscarOrderId,
          amount: total,
          event_type_id: 1,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      setOrderLoading(false)
      navigate("/ordersucessfull");
    } catch (error) {
      console.log(error);
      setOrderLoading(false) 
    }finally{ 
      setOrderLoading(false)
    }
  };

  const handlePayment = useCallback(async () => {
    const order = await createOrder();
    setloading(false)
    const options = {
      key: "rzp_test_Qv1aOp6toQOY9R",
      amount: 500 * 100,
      currency: "INR",
      name: "shafiPhotoStudio",
      description: "Test Transaction",
      image: "studioframe.png",
      order_id: order.id,
      handler: function (response) {
             complete_order(
          response.razorpay_payment_id,
          response.razorpay_order_id,
          response.razorpay_signature
        );
      },
      prefill: {
        name: "Taher Tadpatri",
        email: "tahertadpatri@gmail.com",
        contact: "+916361002427",
      },
      notes: {
        address:
          "Shafi photo studio,beside nurani masjid, N M road,sandur-583119",
      },
      theme: {
        color: "#07151B",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  useEffect(() => {
    if (isLoaded) {
      handlePayment();
    }
  }, [isLoaded, handlePayment]);
  return (
    <Grid container>
      <Grid item xs={12} sx={{display : 'flex',justifyContent : 'center',alignItems  : 'center',height : '100vh',width : "100%"}}>
        
        {isLoaded && <Grid sx={{display : "flex" ,flexDirection : 'column',justifyContent : 'center',alignItems : 'center'}}>
          <CircularProgress  sx={{marginBottom : '1rem'}}/>
          <Typography>Hang on a Moment<span>Don't go back or reload</span></Typography>
           </Grid> }{" "}
      </Grid>
    </Grid>
  );
}

export default Payment;
