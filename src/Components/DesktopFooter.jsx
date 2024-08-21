import React from 'react'
import {
    Button,
    Divider,
    Grid,
    Stack,
    TextField,
    Typography,
    Box
  } from "@mui/material";
  import { useState, useEffect } from "react";
  import { Link, useNavigate } from "react-router-dom";
function DesktopFooter() {
 const navigate=useNavigate() 
 const whatsappUrl = `https://wa.me/${+916361002427}`;
  return (
    <div style={{width : '100%'}}> 
    <Divider sx={{ marginTop: "1rem" }} />
    <Grid container sx={{ marginTop: "1rem" }}>
      <Grid
        item
        lg={3}
        md={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "space-between",
        }}
      >
        <Stack direction="column" spacing={2} >
          <Link component="h3"  style={{textDecoration : 'none'}} onClick={() => navigate("")}>
            Home
          </Link>
          <Link component="div" style={{textDecoration : 'none'}} onClick={() => navigate("/About")}>
            About us
          </Link>
          <Link style={{textDecoration : 'none'}} component="div" onClick={() => navigate("/Contact")}>
            Contact us
          </Link>
          <Link component="h3" style={{textDecoration : 'none'}}sx={{paddingTop : '2rem'}} onClick={() => navigate("/")}>
            Instagram
          </Link>
          <Link  href={whatsappUrl}  style={{textDecoration : 'none'}}  target="_blank" rel="noopener noreferrer">
            whatsapp (+916361002427)
          </Link>
          <Link component="div" style={{textDecoration : 'none'}} onClick={() => navigate("/Contact")}>
            Email
          </Link>
        </Stack>
      </Grid>
      <Grid
        item
        lg={3}
        
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "space-between",
        }}
      >
        <Stack direction="column" spacing={2}>
          <Link component="h3" style={{textDecoration : 'none'}} onClick={() => navigate("/signup")}>
            Sign in
          </Link>
          <Link component="div" style={{textDecoration : 'none'}} onClick={() => navigate("/orders")}>
            Order
          </Link>
          <Link component="div"  style={{textDecoration : 'none'}} onClick={() => navigate("/orders")}>
            Return & Echnage
        </Link>
       
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        md={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
      
        }}
      >
        <Stack direction="column" spacing={2} sx={{paddingLeft: '10rem' }}>
          <TextField
            label="subscribe"
            name="subscribe"
            variant="outlined"
            type="mail"
            sx={{ width: "100%", fontSize: "1.2rem" }}
            size="small"
          />
          <Button variant="contained" sx={{ textTransform: "none" }}>
            subscribe
        </Button>
        </Stack>
      </Grid>
    </Grid>
    <Divider  />
    <Grid container spacing={2} >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingBottom : '2rem',
          marginTop  : '2rem'
        }}
      >
         <Typography>Terms & Condition</Typography>
      
          <Typography>Refund Policy</Typography>
       
      </Grid>
    </Grid>
  </div>
  );
}

export default DesktopFooter
