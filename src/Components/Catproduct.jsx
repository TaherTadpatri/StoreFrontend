import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
function Catproduct({ products ,catid}) {
  return (
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
            marginTop: '1rem'
          }}
        >
          {products.map((product, _) => (
            <Grid item xs={6} sm={4} md={3} lg={3} key={product.id}>
              <ProductCard product={product} catid={catid} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Catproduct;
