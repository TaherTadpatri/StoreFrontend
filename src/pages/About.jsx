import React from "react";
import NavbarNew from "../Components/NavbarNew";
import { Grid, Typography } from "@mui/material";
import aboutImage from "../../public/aboutuslogo.png";
import Footer from "../Components/Footer";
function About() {
  return (
    <div>
      <NavbarNew></NavbarNew>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <Grid
          item
          xs={12}
          lg={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h2" sx={{ marginTop: "1rem" }}>
            oh hi,we're{" "}
          </Typography>
          <Typography variant="h4">Frame Your <span style={{color : 'red'}}>Memories </span>  </Typography>
          <img
            src={aboutImage}
            style={{
              width: "50%",
              height: "auto",
              objectFit: "cover",
            }}
          />
          <Typography variant="h5" sx={{ marginTop: "1rem" ,fontFamily :'unset' }}>
            {" "}
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {" "}
            </Typography>{" "}
            Capturing Moments, Crafting Memories Since 1989, we've been your
            trusted partners in preserving life's precious moments. Based in
            Sandur, India, we specialize in professional photography and
            transforming your cherished images into stunning keepsakes.
          </Typography>
          <br />
          <Typography variant="h5" fontFamily ='unset'>
            {" "}
            Our skilled artisans create personalized products, including custom
            frames, mugs, and t-shirts, that perfectly complement your
            photographs. Let us help you turn your memories into timeless
            treasures.
          </Typography>
          <Typography variant="h5" sx={{fontWeight : "bold"  ,marginTop : '1rem'}}>Our Mission</Typography>
          <Typography variant="h5"  fontFamily ='unset'>
            We dedicated to transforming cherished memories into tangible
            keepsakes. Our mission is to design and create personalized products
            that celebrate life's special moments, exceeding our customers'
            expectations with exceptional quality and service.
          </Typography>
        </Grid>
      </Grid>
      <Footer/>
    </div>
  );
}

export default About;
