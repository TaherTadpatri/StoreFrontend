import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { Box, Grid, Icon, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import NavbarNew from "./NavbarNew";
import { useState, useEffect } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";

function PopularProducts() {
  const Popularcat = 2;
  const [loading, setloading] = useState(false);
  const [items, setitems] = useState();

  useEffect(() => {
    setloading(true);
    const fetchcatdata = async () => {
      try {
        const resonse = await fetch(
          "https://storebackend-production-9a2b.up.railway.app/apiv2/catproducts/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              category_id: Popularcat,
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
       {loading && <Grid container sx={{display : 'flex',alignItems: "center",justifyContent : 'center',height: "100%"}}>
          <Grid item > <CircularProgress/></Grid> 
          
        </Grid>}

      <Typography
        color="white"
        sx={{ paddingTop: "1rem", backgroundColor: "white", color: "black" }}
      >
       <h1><span style={{fontSize : '6rem', fontWeight: "bold", color: "red", display: "block" }}>
          Popular
        </span>
        </h1>
        <span style={{ fontSize: "4rem"}}>
          Product
        </span>
      </Typography>
      {items && (
        <div>
          <div style={{ backgroundColor: "primary" }}>
            <Grid
              container
              spacing={2}
              color="primary"
              style={{
                justifyContent: "center",
                alignItems: "center ",
                backgroundColor: "secondary",
                marginTop: "1rem",
                paddingRight: "1rem",
                paddingLeft: "1rem",
                marginBottom: "1rem",
              }}
            >
              {items.map((product, _) => (
                <Grid item xs={6} sm={4} md={3} lg={3} key={product.id}>
                  <ProductCard product={product} catogery_id={Popularcat} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopularProducts;
