import { Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { Grid } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const productData = [
  {
    id: 1,
    image: "https://m.media-amazon.com/images/I/31Vj8d7GiVL.jpg",
    name: "Awesome Product",
    description: "This is a very cool product that you should buy.",
    price: 19.99,
  },
  {
    id: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3nDFYoB02MdPsNwMODGF-q4-D14PYmExbng&s",
    name: "Mug print",
    description: "This is a very cool product that you should buy.",
    price: 19.99,
  },
  {
    id: 3,
    image: "https://m.media-amazon.com/images/I/31Vj8d7GiVL.jpg",
    name: "Awesome Product",
    description: "This is a very cool product that you should buy.",
    price: 19.99,
  },
  {
    id: 4,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3nDFYoB02MdPsNwMODGF-q4-D14PYmExbng&s",
    name: "Mug print",
    description: "This is a very cool product that you should buy.",
    price: 19.99,
  },

];
function Product() {
  const location=useLocation();
  
  return (
    <>
      
        <Typography
          variant="h4"
          sx={{ marginBottom: "1rem", marginTop: "1rem" ,display : 'flex ', justifyContent : 'center ', alignItems : 'center'}}
          color="primary.light"
        >
          Featured Products
        </Typography>
        <div style={{ backgroundColor: "primary" }}>
          <Grid container spacing={2} color="primary" style={{justifyContent : 'space-between', alignItems : 'center'}}>
            {productData.map((product, _) => (
              <Grid item xs={6} sm={4} md={3} lg={3} key={product.id}>
                <ProductCard product={product}  />
              </Grid>
            ))}
          </Grid>
        </div>
    </>
  );
}

export default Product;
