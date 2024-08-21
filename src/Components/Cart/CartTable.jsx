import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ProductQuantity from "./ProductQuantity";
import cartContext from "./CartContext";

function CartTable() {
  const [CartItems, setCart] = useState([]);

  const { cart, product } = useContext(cartContext);

  var totalAmount = 0;
  useEffect(() => {
    const storecart = localStorage.getItem("cart");
    if (storecart) {
      const parsedcart = JSON.parse(storecart);
      setCart(parsedcart);
    }
   
  }, [cart]);

  const getProductDetails = (productId) => {
    return product.find((product) => product.id === productId);
  };
  totalAmount = cart.reduce((accumulator, currentItem) => {
    const itemTotal = currentItem.quantity * currentItem.price_incl_tax;
    return accumulator + parseInt(itemTotal, 10); 
  }, 0);
  return (
    <div>
      <Typography variant="h3" sx={{paddingLeft : '1rem'}}>Cart</Typography>
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
                <Typography variant="h5" >
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
                      <ProductQuantity
                        quantity={item.quantity}
                        ProductId={item.product}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="h5" color="green" >
                        <Box> ₹{item.quantity * item.price_incl_tax}{" "}</Box>
                        
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
      <Typography
        variant="h4"
        sx={{
          display: "flex",
         justifyContent: "center",
         alignItems: "center",
          marginTop: "1rem",
          marginRight: "1rem",
        }}
      >
        {cart && cart.length > 0 && (<>
       
        Total Amount : ₹{totalAmount}
       
       {" "}</>) }
      </Typography>
    </div>
  );
}

export default CartTable;
