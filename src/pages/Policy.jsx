import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Grid, Typography, Stack, Button } from "@mui/material";
import Footer from "../Components/Footer";
import NavbarNew from "../Components/NavbarNew";
function Policy() {
  return (
    <>
      <NavbarNew />
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} lg={12}>
          <Typography variant="h2" sx={{ float: "center" ,marginLeft : '1rem ' }}>
            Policy{" "}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ textDecoration: "none", marginLeft: "1rem" }}
          >
            <Button
              variant="outlined"
              sx={{ textDecoration: "none", marginLeft: "1rem" }}
            >
              {" "}
              <Typography variant="div">
                <Link to="termsandcondition" style={{ textDecoration: "none" }}>
                  Terms and Conditions
                </Link>{" "}
              </Typography>
            </Button>
            <Button variant="outlined">
              {" "}
              <Typography>
                {" "}
                <Link to="Refundpolicy" style={{ textDecoration: "none" }}>
                  Refund policy
                </Link>
              </Typography>
            </Button>
          </Stack>
          <Outlet />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default Policy;
