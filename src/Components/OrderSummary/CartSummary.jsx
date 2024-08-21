import React, { useContext, useEffect } from 'react'
import cartContext from '../Cart/CartContext'
import { Button,Typography} from '@mui/material'

import { useNavigate } from 'react-router-dom';
import {
    CircularProgress,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  import {  useState } from "react";

 

function CartSummary() {
    const {cart,product}=useContext(cartContext)
    const navigate=useNavigate() 
  
    const getProductDetails = (productId) => {
        return product.find((product) => product.id === productId);
      };
    
      const totalAmount = cart.reduce((accumulator, currentItem) => {
        const itemTotal = currentItem.quantity * currentItem.price_incl_tax;
        return accumulator + parseInt(itemTotal, 10); 
      }, 0);

  return (
    <div style={{paddingTop : "1rem" , paddingLeft: "1rem"}}>
       
        <Typography variant='h3' color='black'>Summary</Typography>

        {cart && cart.length > 0 ? (
        <TableContainer component={Container} elevation={3}>
          <Table>
            <TableHead>
              <TableCell>
                <Typography variant="h5" >
                  Product
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" >
                  Quantity
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5">
                  Price
                </Typography>
              </TableCell>
            </TableHead>
            <TableBody>
              {cart.filter((index) => index.quantity > 0).map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img
                        src={getProductDetails(item.product)?.image}
                        alt=""
                        style={{
                          height: "50px",
                          widht: "100%",
                          objectFit: "cover",
                          aspectRatio: "4/3",
                        }}
                      />
                      <br />
                      <Typography variant="body2" color="text.secondary">
                        {getProductDetails(item.product)?.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                     <Typography variant='h5' sx={{paddingLeft: '1rem'}}>{item.quantity}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h5" color="green">
                        ₹{item.quantity * item.price_incl_tax}{" "}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}
        
    </div>
  )
}

export default CartSummary;


