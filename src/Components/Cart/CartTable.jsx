import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  linkClasses,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useContext, useEffect, useState } from "react";
import ProductQuantity from "./ProductQuantity";
import cartContext from "./CartContext";
import AuthContext from "../Context/AuthContext";

function CartTable() {
  const [CartItems, setCart] = useState([]);
  const { cart, product, lines, loading } = useContext(cartContext);
  const [total, setTotal] = useState();
  const { authTokens } = useContext(AuthContext);
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  const productDetails= lines.map ((line)=>{ 
     const correctproduct=product.find((p)=>p.url === lines.product)
     console.log(correctproduct)
     const details={ 
      title :correctproduct?.title,
      price : line.price_excl_tax,
      quantity : line.quantity,
      price_excluding_tax :line.price_excl_tax,
      price_including_tax :line.price_incl_tax,
     }
  })

  const findproductDetails = (line)=>{ 
    return product.find((p)=> p.url == line.product) 
  }

  return (
    <Grid container maxWidth="lg" justifyContent="center">
      <Grid item="sx">

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width  : '100%'
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Grid>
            <Table>
              <TableContainer>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6" color="inherit">
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" color="inherit">
                        Quantity
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" color="inherit">
                        Price
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>

                {cart?.map((line) => (
                <TableRow key={line.id}>
             
                   
                    <TableCell>
                    <img src={`${BASE_URL}${line.images[0].original}` } /><Typography>{line?.title}</Typography></TableCell>
                    <TableCell><Typography>{line.quantity}</Typography><br/><Typography>*Cusotmization products can only be one</Typography>
                     <Button variant="outlined" sx={{textDecoration : 'none'}}>Remove</Button>
                    </TableCell>
                    <TableCell>{line.price} INR</TableCell>
                 
               
              </TableRow>
                ))}
              </TableContainer>
            </Table>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default CartTable;
