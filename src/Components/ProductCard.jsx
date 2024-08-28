import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  responsiveFontSizes,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import Price from "./Price";
import PriceComponent from "./PriceComponent";
const theme = createTheme({
  palette: {
    primary: {
      main: "#7469B6",
    },
    secondary: {
      main: "#FFE6E6",
    },
  },
});

function ProductCard({ product ,catogery_id }) {
  const title = product.title;
  const shortenedTitle = title.split(' ').slice(0, 4).join(' ') + '...';
  const description = product.descriptions;
  const customize = product.attributes[0].value;
  const image = product.images[0].original;
  const location = useLocation();
  const navigate = useNavigate();
  const url = product.children.length > 1 ? product.children[0].price : product.price;
  const handleclick = (productid) => {
    console.log(productid);
    const path = `/catogery/${catogery_id}/product/${productid}`;
    console.log(path);
    navigate(path);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          maxWidth: 300,
          height: "100%",
          borderRadius: "20px",
          boxShadow: "4",
                   
        }}
        onClick={() => handleclick(product.id)}
      >
       
        <CardActionArea>
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
           
          
           
            
              border: "1px solid #add",
              width: '100%', // Use 100% width for better responsiveness
              height: 'auto',
              objectFit: "cover",
              
            }}
          />
          <CardContent sx={{ backgroundColor: "white" ,paddingBottom : '0px' }}>
            {" "}
            <Typography
              gutterBottom
            
              component="div"
              sx={{
                [theme.breakpoints.down("sm")]: {
                  fontSize: "0.9rem", 
                },
              }}
              fontWeight="bold"
            >
              {shortenedTitle}
            </Typography>
            <Price url={url} cat={true}/> 
       
          {/*  {customize ? (
              <Button
                variant="contained"
                sx={{ marginTop: "0.5rem" ,backgroundColor : "black",color : 'white'}}
              >
                Customize
              </Button>
            ) : (
              <Button
                variant="outlined"
               
                sx={{ marginTop: "0.5rem",backgroundColor : "black",color : 'white' ,textTransform : "none" }}
              >
                {" "}
                Add to cart{" "}
              </Button>
            )} */}
          </CardContent>
        </CardActionArea>
      </Card>
    </ThemeProvider>
  );
}

export default ProductCard;
