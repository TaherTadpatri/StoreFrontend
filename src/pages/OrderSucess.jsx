import { Grid, Typography } from "@mui/material";
import { useScroll } from "framer-motion";
import React, { useContext, useState } from "react";
import cartContext from "../Components/Cart/CartContext";
import { Link, Button } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import { useNavigate } from "react-router-dom";
function OrderSucess() {
  const whatsappUrl = `https://wa.me/${+916361002427}`;
  const mailId = "mailto:shafiphotostudio@gmail.com";
  const navigate = useNavigate();
  return (
    <div>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "",
          color: "white",
          height: "100vh",
        }}
      >
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h2" sx={{color : 'black'}}>Order placed</Typography>
          <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "green",
                color: "white",
                textTransform: "none",
                marginLeft: "2rem",
                marginTop: "1rem",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                  border: "2px solid green",
                },
              }}
            >
              <WhatsAppIcon sx={{ fontSize: "2rem", marginRight: "1rem" }} />
              Share photos on WhatsApp
            </Button>
          </Link>
          <Link href={mailId}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "black",
                textTransform: "none",
                marginLeft: "2rem",
                marginTop: "1rem",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                  border: "2px solid white",
                },
              }}
            >
              <AttachEmailIcon sx={{ fontSize: "2rem", marginRight: "1rem" }} />
              Send Photos on mail
            </Button>
          </Link>
          <br></br>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{ textTransform: "none", marginTop: "3rem",backgroundColor : 'white', color: 'black' }}
          >
            Go to Home
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default OrderSucess;
