import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  responsiveFontSizes,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
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

function SearchProductPage({data} ) {
    console.log(data)
const navigate=useNavigate()

 const handleclick= (productId) =>{ 
  console.log("clicked")
  navigate(`/product/${productId}`)
  
 }
  return (
    <div>
 <ThemeProvider theme={theme}>
   <Grid container spacing={2} sx={{display: 'flex', flexDirection:'column' ,alignContent : "center" ,alignItems : 'center'}}>
    {data.map((product, index) => (
      <div key={product.id || index} style={{marginTop : '1rem',marginLeft: '1rem'}}> 
       <Card
        sx={{
          maxWidth: 300,
          height: "100%",
          borderRadius: "10px",
          boxShadow: "3",
        }}
        onClick={() => handleclick(product.id)}
      >
       
        <CardActionArea>
          <CardMedia
            component="img"
            image={product.images[0].original}
            alt={product.title}
            sx={{
              borderRadius: "10px",
              marginTop: "10px",
              marginLeft: "10px",
              marginRight: "10px",
              border: "1px solid #add",
              width: "90%",
              height: "100%",
              objectFit: "cover",
              aspectRatio: "4/3",
            }}
          />
          <CardContent sx={{ backgroundColor: "white" }}>
            {" "}
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                [theme.breakpoints.down("sm")]: {
                  fontSize: "15px", // Adjust font size as needed
                },
              }}
            >
              {product.title}
            </Typography>
            
              <Button
                variant="outlined"
                color="primary"
                sx={{ marginTop: "0.5rem" }}
              >
                {" "}
                Add to cart{" "}
              </Button>
          </CardContent>
        </CardActionArea>
      </Card>
        
      </div>
    ))}
    </Grid>
    </ThemeProvider>
  </div>
  );
}

export default SearchProductPage;
