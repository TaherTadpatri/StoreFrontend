import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Components/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Icon, Typography } from "@mui/material";

import CartTable from "../Components/Cart/CartTable";
import NavbarNew from "../Components/NavbarNew";
import { Grid } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { Navigate } from "react-router-dom";
import cartContext, { CartProvider } from "../Components/Cart/CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { motion } from "framer-motion";
import {Box} from "@mui/material";
const stickynavbar = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 1,
  backgroundColor: "white",
  padding: "1rem",
  float: 'right',
  zIndex: 999,
  justifyContent : 'flex-end'
};
function Cart() {
  const { cart, product, updatecart, fetchcart ,loading } = useContext(cartContext);

  const [error, setError] = useState(false);
  const { user, authTokens } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    
      fetchcart();

  }, [authTokens]);

  const handleContinueShoping = (e) => {
  
    navigate(-1);
  };
  const handleCheckout = (e) => {
    e.preventDefault();
 
    navigate("/checkout");
  };

  return (
    <div>
      <NavbarNew></NavbarNew>

      <h2>
        <motion.div
          initial={{ opacity: 0.5, y: 75 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        ></motion.div>
        {cart.length > 0  ? (
          <>
            <CartTable />{" "}
            <Grid container> 
              <Grid item> 
              {cart && (<Grid> 
                 
                </Grid>)}
              </Grid>
            </Grid>
          </>
        ) : ( loading && <Grid container>
          <Grid
            item
            xs={12}
            lg={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <ShoppingCartIcon
              sx={{ height: "200px", width: "100%" }}
              color="primary"
            />

            <Typography
              variant="h4"
              color="primary"
              sx={{ marginBottom: "1rem" }}
            >
              {" "}
              your cart is empty
            </Typography>

            <Button
              variant="contained"
              onClick={(e) => handleContinueShoping(e)}
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                borderRadius: "10px",
              }}
            >
              continue Shopping
            </Button>
          </Grid>
        </Grid>)}   
        {cart && cart.length >= 1   ? (
          <>
            <Grid container sx={stickynavbar}>
              {" "}
              <Grid item sx={{float : 'right'}}> 
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontSize: "1rem",
                  borderRadius: "10px",
                  marginLeft: "1rem",
                  color: "black",
                  backgroundColor: 'white',
                }}
                onClick={(e) => handleContinueShoping(e)}
                disabled={loading}
              >
                continue shopping
              </Button>
              <Button
                variant="contained"
                onClick={(e) => handleCheckout(e)}
                sx={{
                  textTransform: "none",
              
                  fontSize: "1rem",
                  borderRadius: "10px",
                  marginLeft: "1rem",
                  color: "white",
                  backgroundColor : 'black'
                }}
                disabled={loading}
              >
                Check out
              </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <></>
        )}
      </h2>
    </div>
  );
}

export default Cart;
