import {
  Grid,
  Typography,
  Box,
  CardContent,
  CardMedia,
  CardActionArea,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useInView, motion } from "framer-motion";

function PinterestGrid() {
  const ref = useRef(null);
  const isinView = useInView(ref, { once: true });
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const [items, setitem] = useState();
  useEffect(() => {
    setLoading(true);
    const fetchdata = async () => {
      try {
        const response = await fetch("https://storebackend-production-9a2b.up.railway.app/api/categories/", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          console.log("error fetching");
        } else {
          const data = await response.json();
          setitem(data);
          console.log(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, []);

  const styles = {
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px,3fr))",
      gap: theme.spacing(1),
      paddingRight : '1rem',
      paddingLeft : "1rem",
      //backgroundColor : "black"
    },
    gridItem: {
      position: "relative",
      overflow: "hidden",
      //borderRadius: theme.shape.borderRadius,
      // Remove or set to transparent as needed
      backgroundColor: "primary.light",
      border: "1px solid #add",
      borderRadius: '1rem',
      marginTop : '1rem',
    },
    gridItemImage: {
      width: "100%",
      height: "auto",
    },
    gridItemContent: {
      padding: theme.spacing(2),
      position: "absolute",
      bottom: 0,
      left: 0,
      right : 0,
    top :0,
      
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems :'center'
      
    },
    gridItemTitle: {
      fontWeight: "bold",
      marginBottom: theme.spacing(1),
    
    },
  };

  const navigate = useNavigate();
  const handleclick = (url) => {
    const id = url.substr(-2)[0];
    console.log(id);
    navigate(`/catogery/${id}`);
  };

  useEffect(()=>{ 
    console.log(isinView)
  },[isinView])

  return (
    <>
      <Typography
        id="target-comp"
        variant="h2"
        sx={{ color : 'black' ,marginLeft : '1rem'}}
      >
         Shop by <br/><span style={{fontWeight : 'bold',color: 'red '
         }}>  Catogery</span>
      </Typography>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          <CircularProgress />
        </div>
      )}

      <Grid container sx={styles.gridContainer}>
        {items && (
          <>
            {items.map((item) => (
             <div key={item.name} ref={ref}> 
             <motion.div
               whileTap={{ scale: 1.1 }}
           >

                <Grid
                  item
                  sx={styles.gridItem}
                  onClick={() => handleclick(item.url)}
                >
                  <CardActionArea>
                    {/*<StarIcon sx={{ fontSize: 'large' }} />*/}
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.title}
                      sx={styles.gridItemImage}
                    />
                    <CardContent sx={styles.gridItemContent}>
                    <Typography
                        variant="h6"
                        color="white"
                        sx={styles.gridItemTitle}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="body2"></Typography>
            </CardContent>
                  </CardActionArea>
                </Grid>
                
           </motion.div>
           </div>
            ))}
          </>
        )}
      </Grid>
    </>
  );
}

export default PinterestGrid;
