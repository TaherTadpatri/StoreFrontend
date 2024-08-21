import { Box, Button, Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useContext, useState } from "react";
import { useCallback, useEffect } from "react";
import useRazorpay from "react-razorpay";
import CartSummary from "../Components/OrderSummary/CartSummary";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { json, useNavigate } from "react-router-dom";
import Information from "../Components/Checkout/Information";
import cartContext from "../Components/Cart/CartContext";
import { Alert } from "@mui/material";
import AuthContext from "../Components/Context/AuthContext";
import { fetchShippingAddress } from "../Components/Checkout/Information";
import logo from '../../public/studioframe.png'
function gettotalAmount(cart) {
  const totalAmount = cart.reduce((accumulator, currentItem) => {
    const itemTotal = currentItem.quantity * currentItem.price_incl_tax;
    return accumulator + parseInt(itemTotal, 10);
  }, 0);
  return totalAmount;
}

function Payment() {
  const [loading, setLoading] = useState(false);
  const [createOrderLoading,setCreateOrderLoading]=useState(false)
  const [error, setError] = useState(null);
  const [orderloaing, setorderloading] = useState(false);
  const [Razorpay, isLoaded] = useRazorpay();
  const navigate = useNavigate();
  const { cart } = useContext(cartContext);
  const { user, authTokens } = useContext(AuthContext);
  const totalamount = gettotalAmount(cart);
  const currency = "INR";

  console.log(user.username);
  const createOrder = async () => {
    setCreateOrderLoading(true);
    setError(null);
    try {
      const response = await fetch("https://tahertadpatri.pythonanywhere.com/api/createOrder/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({
          amount: totalamount,
          currency: currency,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data.data);
      setCreateOrderLoading(false) 
      return data.data;
    } catch (error) {
      alert(error);
      console.log(error);
    }finally{ 
      setCreateOrderLoading(false) 
    }
  };
  const complete_order = async (payment_id, order_id, signature) => {
    try {
      console.log(payment_id, signature);
      setorderloading(true);
      const shipping_address = await fetchShippingAddress(authTokens);
      const { phone_number, notes, ...rest } = shipping_address;
      const billing_address = rest;
      console.log(shipping_address);
      const shipping_method = "ship rocket";
      const guest_email = user.username;
      const order_total = {
        total: totalamount,
        currency: "INR",
        excl_tax: totalamount,
        incl_tax: totalamount,
      };
      const shipping_charge = {
        currency: "INR",
        excl_tax: "0",
        tax: "0",
      };
      const payment_details = {
        payment_id: payment_id,
        order_id: order_id,
        signature: signature,
      };
      console.log(payment_details);
      const shipping_method_code = "20";

      const response = await fetch("https://tahertadpatri.pythonanywhere.com/apiv2/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({
          guest_email: guest_email,
          order_total: order_total,
          shipping_charge: shipping_charge,
          shipping_method: shipping_method,
          shipping_method_code: shipping_method_code,
          shipping_address: shipping_address,
          billing_address: billing_address,
          payment_details: payment_details,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      setorderloading(false);
      navigate("/ordersucessfull");
    } catch (error) {
      console.log(error);
    } finally {
      setorderloading(false);
    }
  };
  const handlePayment = useCallback(async (e) => {
    e.preventDefault()
    const order = await createOrder();
    setCreateOrderLoading(false) 
    const options = {
      key: "rzp_test_Qv1aOp6toQOY9R",
      amount: gettotalAmount(cart) * 100,
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
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  return (
    <div>
      {orderloaing ? (
        <div style={{ 
          display : 'flex',
          flexDirection : 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#f0f0f0',
          color: '#000',

        }}>
          {" "}
          
          <CircularProgress />
          <Typography variant="h2">Do not go back or exit the app</Typography>
        </div>
      ) : (
        <div>
          {" "}
          <Button
            onClick={() => navigate(-1)}
            sx={{ marginTop: "10px", paddingLeft: "0px" }}
          >
            <ArrowBackIcon />
          </Button>
          <CartSummary />
          <Information />
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "1rem",
            }}
          >
            <Grid item xs={12} lg={8}>
              <Box>
                <Alert severity="warning">
                  <Typography variant="h6">
                    shippping charges is not inlcuded
                  </Typography>{" "}
                  <Typography variant="body">
                    shipping charges should be paid during the reciving the
                    order
                  </Typography>
                </Alert>
                <Button
                  variant="contained"
                  sx={{
                    fontSize: "1.5rem",
                    float: "right",
                    marginTop: "1rem",
                    marginRight: "1rem",
                    marginBottom: "1rem",
                    textTransform : 'none'
                  }}
                  onClick={(e) => handlePayment(e)}
                >
                 {createOrderLoading ? (<CircularProgress sx={{color : 'white'}}/>): (<Typography>Pay {totalamount} </Typography>) }
                </Button>
              </Box>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default Payment;
