import { Box, Grid, Typography } from "@mui/material";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Carsoulmui from "./Carsoulmui";
const items = [
  {
    id: 1,
    name: "photoframe",
    color: "orange",
  },
  {
    id: 2,
    name: "photobook",
    color: "green",
  },
  {
    id: 3,
    name: "caicature",
    color: "red",
  },
 
];

const itemVariants = {
  initial: {
    opacity: 0,
    y: -30, // Initial position off the screen (adjust as needed)
  },
  enter: {
    opacity: 1,
    y: 0, // Final position on the screen
    transition: { duration: 1, ease: "easeInOut" }, // Adjust animation duration and easing
  },
};
/*<motion.div
key={item.id}
variants={itemVariants}
initial="initial"
animate={index === currentIndex ? "enter" : "initial"} 
> */ 
function HomePageCustomDesign() {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex   
   + 1) % items.length);
      }, 2000); 
  
      return () => clearInterval(intervalId);
    }, [items]);
  return (
    <div>
      <Grid conatiner spacing={0}>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{ width: "100%", backgroundColor: "#" }}
        >
          <Box
            sx={{
              paddingTop: "3rem",
              paddingLeft: "1rem",
              paddingBottom: "1rem",
            }}
          >
            <Typography variant="h1" color="black" fontStyle="bold">
                          Custom <span>Design </span>{" "}
            </Typography>
            <Typography variant="h3" color="black">
             {" "}
              for your  {" "}
            </Typography>
            {items.map((item,index) => (
              
        
                <Typography variant="h3" color={item.color} key={item.id}>
                  {item.name},
                </Typography>
          
            ))}
              <Typography variant="h3" color="brown">And many more.</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} lg={8} sx={{backgroundColor : '#EDEADE'
        }}> 
         <Box  >
            <Carsoulmui/>
         </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePageCustomDesign;
