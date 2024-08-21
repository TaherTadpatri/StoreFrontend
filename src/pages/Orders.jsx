import React, { useContext, useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AuthContext from "../Components/Context/AuthContext";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
function Orders() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [Orders, setOrders] = useState([]);
  const [cancleRequest, setCancleRequest] = useState({});
  const { authTokens } = useContext(AuthContext);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://tahertadpatri.pythonanywhere.com/apiv2/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setOrders(data.orders);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleOrderCancellation = (e)=>{ 
    e.preventDefault() 

  }
  return (
    <div>
      <Grid>
        <Stack
          direction="row"
          sx={{
            marginTop: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        >
          <ArrowBackIcon
            sx={{ fontSize: "2rem" }}
            onClick={() => navigate(-1)}
          />
          <Typography variant="h4" sx={{ fontFamily: "serif" }}>
            Your Orders
          </Typography>
        </Stack>
      </Grid>
      {loading && (
         
            <div style={{height : "100vh",widht : '100%',display : 'flex',alignItems : 'center',justifyContent : 'center'}}>
              <CircularProgress/> 
             </div>
        
      )}
      {Orders && Orders.length > 0 && (
        Orders.map((order, index) => (
          <Grid
            item
            key={index}
            sx={{
              marginLeft: "1rem ",
              marginRight: "1rem",
            
            }}
          >
            {/* Extract specific order data from the object */}
            <h2>Order Number: {order.order_number}</h2>
            <Stack direction="row">
              <img
                src={order.product_image}
                alt={order.product_title}
                style={{
                  width: "200px",
                  height: "auto",
                  objectFit: "cover",
                  border: "3px solid #add",
                  borderRadius: "1rem",
                }}
              />{" "}
              <Stack direction="column" sx={{ marginLeft: "1rem" ,paddingRight : '1rem'}}>
        
                <Typography variant="body1" sx={{ marginTop: "1rem" }}>
                  Product Title: {order.product_title}
                </Typography>
                <Typography sx={{ color: "green", marginTop: "1rem" }}>
                  Order Total: {order.order_total}
                </Typography>
                <Typography sx={{ color: "green", marginTop: "1rem" }}>
                  Status: {order.status}
                </Typography>
                <Typography sx={{ marginTop: "1rem" }}>
                  Order Date: {order.order_date.slice(0, 10)}
                </Typography>{" "}
                <Button
                  variant="contained"
                  sx={{ textTransform: "none" ,width : '200px'}}
                  onClick={() => {
                    const updatedCancleRequests = { ...cancleRequest };
                    updatedCancleRequests[order.order_number] = !cancleRequest[order.order_number] || false;  
                    setCancleRequest(updatedCancleRequests);
                  }}
                >
                  Cancel Request
                </Button>
              </Stack>
            </Stack>
            <Divider sx={{marginTop : '1rem' ,}} />
            {cancleRequest[order.order_number] && (
              <Grid item sx={{ marginTop: "1rem" }}>
                <form onSubmit={(e)=>handleOrderCancellation(e)}>
                  <TextField
                    label="Reason for Cancellation"
                    multiline
                    rows={4}
                    fullWidth
                    required
                  ></TextField>
                  <Button
                    variant="contained"
                    sx={{ textTransform: "none", marginTop: "1rem" }}
                    type='submit'
                  >
                    {" "}
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      marginTop: "1rem",
                      marginLeft: "1rem",
                    }}
                    onClick={()=>setCancleRequest(!cancleRequest)}
                  >
                    Cancel{" "}
                  </Button>
                </form>
                <Divider sx={{marginTop : '1rem' ,}} />
              </Grid>
              
            )}
          </Grid>
        ))
      ) }
      { (!loading && Orders.length === 0) &&  <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <ShoppingBasketIcon sx={{ fontSize: "10rem" }} />
          <Typography variant="h4">No orders found</Typography>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "black",
              color: "white",
            }}
            onClick={() => navigate(-1)}
          >
            continue Shopping
          </Button>
        </div>}
       
    </div>
  );
}

export default Orders;
