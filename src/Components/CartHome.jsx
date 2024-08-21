import React from "react";
import {  Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const style = {
    position: 'fixed', // Use 'fixed' for top right positioning
    top: '10px', // Adjust top margin
    right: '10px', // Adjust right margin
    transform: 'none', 
  width: "auto", // Adjust based on your content
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4, // Adjust padding
  display: "flex",
  flexDirection: "column",
};

const mobileStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  margintop : '5rem',
  marginBottom : '2rem',
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1, // Adjust padding
  paddingLeft: '40px', // Adjust left padding
  paddingRight: '40px',
  display: "flex",
  flexDirection: "column",
  width: "90%",
  height: "90vh", // Occupy full height on mobile
};
function CartHome({onClose}) {
  return (
    <div>
      <Box sx={{ ...style, ...(window.innerWidth < 768 ? mobileStyle : {}) }}>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 30 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" id="cart-modal-title" component="h2">
          Your Cart
        </Typography>
        
      </Box>
    </div>
  );
}

export default CartHome;
