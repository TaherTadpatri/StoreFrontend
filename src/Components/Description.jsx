import { Grid, Icon, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import UploadIcon from "@mui/icons-material/Upload";
import TuneIcon from "@mui/icons-material/Tune";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import { motion } from "framer-motion";
import { useState } from "react";
function Description() {
  
  const [isDesktop, setDesktop] = useState(window.innerWidth >= 768);
  useEffect(()=>{ 
    const handleResize = () => setDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  },[])
  return (
    <div>
     {isDesktop ? <DesktopVersion/> : <MobileVersion/> }
    </div>
  );
}
function MobileVersion() { 
  return ( 
    <div style={{backgroundColor : '#EDEADE', paddingBottom : '2rem'}}> 
        <Grid
        container
        sx={{
          height: "auto",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor : '#EDEADE'
        }}
      > 
 
        <Typography variant="h1" color="black" sx={{  marginTop: "1rem" }}>
          How we work
        </Typography>
    
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "0.5rem",
        }}
      >
        <Grid item xs={12} sm={12} md={4}>
         
            <Box
              sx={{
                height: "auto",
                display :"flex",
                flexDirection : 'row',
                alignItems : 'center',
                justifyContent : 'center',
                backgroundColor: "#696969",
                marginRight : "5rem",
                borderTopRightRadius : '10px',
                borderBottomRightRadius : '10px'
                 
              }}
            >
              <Grid item xs={4} sx={{paddingLeft : '1rem'}} >
                <AddShoppingCartRoundedIcon   sx={{ fontSize: '5rem' ,color : 'white'}} />
              </Grid>
              <Grid item xs={8}> 
               <Stack direction="column" > 
               <Typography variant="h4" color="white" sx={{ marginTop: "10px" }}>
                {" "}
                choose your product{" "}
              </Typography>
         
            
         
               <Typography variant="body" color='white' sx={{paddingBottom : '1rem '}}>
                select a product from our various collection
              </Typography>
               </Stack>
              </Grid>
             
            </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Box
              sx={{
                height: "auto",
                display: "flex",
                flexDirection: "row",
                justfiyContent: "center",
                alignItems: "center",
                backgroundColor: "#696969",
                marginLeft : '5rem',
                borderTopLeftRadius : '10px',
                borderBottomLeftRadius : "10px"
               
              }}
            >
<UploadIcon  sx={{ fontSize: '5rem' ,color : 'white'}}/>{" "}

              <Stack direction="column">
              <Typography variant="h4" color="white" sx={{ marginTop: "10px" }}>
                {" "}
                Submit your photos{" "}
              </Typography>
         
                {" "}
                
            
              <Typography variant="body1" color='white'>
                Submit your photos via whatsapp or mail
              </Typography> </Stack>
              
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <motion.div whileHover={{ scale: 1.2 }}>
            <Box
              sx={{
                height: "auto",
                display: "flex",
                flexDirection: "row",
                justfiyContent: "center",
                alignItems: "center",
                backgroundColor: "#696969",
                marginRight : "5rem",
                borderTopRightRadius : '10px',
                borderBottomRightRadius : "10px"
                
              }}
            >
               <TuneIcon  sx={{ fontSize: '5rem' ,color : 'white'}}/>{" "}

               <Stack direction="column"> 
               <Typography variant="h4" color="white" sx={{ marginTop: "10px" }}>
                {" "}
                Customize your photos{" "}
              </Typography>
             
                {" "}
               
           
              <Typography variant="body1" color='white' sx={{paddingBottom : '1rem'}}>
                Edit your photos with unlimited changes
              </Typography>
               
               </Stack>
              
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </div>
  )
}

function DesktopVersion(){ 
  return(
    <>
    <Grid
        container
        sx={{
          height: "auto",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor : 'white'
        }}
      > 
 
        <Typography variant="h1" color="black" sx={{  marginTop: "1rem" }}>
          How we work
        </Typography>
    
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "0.5rem",
        }}
      >
        <Grid item xs={12} sm={12} md={4}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
          >
            <Box
              sx={{
                height: "100px",
                display: "flex",
                flexDirection: "column",
                justfiyContent: "center",
                alignItems: "center",
                backgroundColor: "#bb94f2",
                borderRadius: "10px",
               
                md: {
                  height: "500px",
                },
              }}
            >
              <Typography variant="h4" color="white" sx={{ marginTop: "10px" }}>
                {" "}
                choose your product{" "}
              </Typography>
              <Icon>
                <AddShoppingCartRoundedIcon   sx={{ fontSize: 'large' }} />
              </Icon>
              <Typography variant="body">
                select a product from our various collection
              </Typography>
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Box
              sx={{
                height: "100px",
                display: "flex",
                flexDirection: "column",
                justfiyContent: "center",
                alignItems: "center",
                backgroundColor: "orange",
                borderRadius: "10px",
               
              }}
            >
              <Typography variant="h6" color="white" sx={{ marginTop: "10px" }}>
                {" "}
                Submit photos{" "}
              </Typography>
              <Icon>
                {" "}
                <UploadIcon iconSizeMedium />{" "}
              </Icon>
              <Typography variant="body1">
                Submit your photos via whatsapp or mail
              </Typography>
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <motion.div whileHover={{ scale: 1.2 }}>
            <Box
              sx={{
                height: "100px",
                display: "flex",
                flexDirection: "column",
                justfiyContent: "center",
                alignItems: "center",
                backgroundColor: "#995954",
                borderRadius: "10px",
         
              }}
            >
              <Typography variant="h6" color="white" sx={{ marginTop: "10px" }}>
                {" "}
                Customize your photos{" "}
              </Typography>
              <Icon>
                {" "}
                <TuneIcon iconSizeMedium />{" "}
              </Icon>
              <Typography variant="body1">
                Edit your photos with unlimited changes
              </Typography>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
      </>
  )
}
export default Description;
