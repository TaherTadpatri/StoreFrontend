import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import {
  Paper,
  Button,
  Typography,
  useScrollTrigger,
  Stack,
  Box,
} from "@mui/material";
import { Grid } from "@mui/material";
import { ListItem } from "@mui/material";
function Carsoulmui(props) {
  const [items, setItem] = useState();
  const [isDesktop, setDesktop] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const handleResize = () => setDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);

    const fetchdata = async () => {
      try {
        const resonse = await fetch("https://tahertadpatri.pythonanywhere.com/apiv2/caursol/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!resonse.ok) {
          throw new Error("error");
        }
        const data = await resonse.json();
        setItem(data);
      } catch (error) {
        console.log("error fetching ");
      }
    };

    fetchdata();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {items && (
        <Carousel indicators={false} navButtonsAlwaysInvisible={true}>
          {items.map((item, i) => (
            <div key={i}>
              {isDesktop ? (
                <DesktopItem key={i} item={item} />
              ) : (
                <Item key={i} item={item} />
              )}
            </div>
          ))}
        </Carousel>
      )}
    </>
  );
}

function Item(props) {
  const imageUrl = `http://localhost:8000${props.item.image}`;


  return (
    <Paper
      sx={{
        width: "100%",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "10px",
        marginTop: "1px",
        backgroundImage: `url(${imageUrl}), linear-gradient(to top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
       
        border: "1px solid #add",
      }}
    ></Paper>
  );
}

function DesktopItem(props) {
  const imageUrl = `http://localhost:8000${props.item.image}`;

  return (
    <Grid container>
      <Grid Item xs={8}>
        <Paper
          sx={{
            width: "100%",
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${imageUrl}), linear-gradient(to top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
         
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <Box sx={{paddingLeft : '2rem',paddingTop : '5rem' }}> 
        <Typography variant="h1" color="black">
          {" "}
          {props.item.title}
        </Typography>
        <Typography variant="h5"> {props.item.description}</Typography>
        <Button variant="contained" sx={{backgroundColor : 'black'
        }}>Explore</Button>
        </Box>
        
      </Grid>
    </Grid>
  );
}

export default Carsoulmui;
