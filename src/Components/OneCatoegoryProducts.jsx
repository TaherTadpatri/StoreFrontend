import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import NavbarNew from "./NavbarNew";
import { useState, useEffect } from "react";

function OneCatoegoryProducts() {
  const trendingProductCategory = 1;
  const [loading, setloading] = useState(false);
  const [items, setitems] = useState();
  const BASE_URL=import.meta.env.VITE_BACKEND_BASE_URL
  useEffect(() => {
    setloading(true);
    const fetchcatdata = async () => {
      try {
        const resonse = await fetch(
          `${BASE_URL}apiv2/catproducts/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              category_id: trendingProductCategory,
            }),
          }
        );
        if (!resonse.ok) {
          console.log("error");
        } else {
          const data = await resonse.json();
          console.log(data);
          setitems(data);
          setloading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    fetchcatdata();
  }, []);
  return (
    
      <div
        sx={{
          marginTop: "1rem",
          paddingTop : '1rem',
          display: "flex",
          alignItems: "center",
          justifyContent : 'center',
          marginLeft: '1rem',
        }}
      >
         <Typography variant="h1" color="white" sx={{ paddingTop: "1rem" ,backgroundColor : 'white',color : 'black'}}>
          <span style={{fontWeight : 'bold',color : 'red'}}> New</span>
          <span style={{fontSize: '2rem'}}>Launch </span> 
        </Typography>
        {loading && <Grid container sx={{display : 'flex',alignItems: "center",justifyContent : 'center',height: "100%"}}>
          <Grid item > <CircularProgress/></Grid> 
          
        </Grid>}

       
        {items && (
          
          
              <Grid
                container
                spacing={2}
                color="primary"
                style={{
                  justifyContent: "center",
                  alignItems: "center ",
                  backgroundColor: "white",
                  paddingTop: "1rem",
                  paddingLeft : '1rem',
                  paddingRight : '1rem',
                  color: 'black'
                }}
              >
                {items.map((product, _) => (
                  <Grid item xs={6} sm={4} md={3} lg={3} key={product.id} sx={{paddingLeft: '0.5rem',paddingBottom: '1rem'}}>
                    <ProductCard
                      product={product}
                      catogery_id={trendingProductCategory}
                    />
                  </Grid>
                ))}
              </Grid>
         
         
        )}
      </div>
  );
}

export default OneCatoegoryProducts;
