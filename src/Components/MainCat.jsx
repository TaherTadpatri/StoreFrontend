import {
  Grid,
  Typography,
  Box,
  CardContent,
  CardMedia,
  CardActionArea,
  Button,
  Card,
  useScrollTrigger,
} from "@mui/material";
import { useTheme } from "@mui/material";
import StarIcon from "@mui/icons-material/Star"; // Example icon
import imgmug from "../../public/mug.png";
import { useEffect, useState } from "react";

function MainCat() {
  const [items, setitem] = useState();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/categories/", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          console.log("error fetching");
        } else {
          const data = await response.json();
          setitem(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);
  const theme = useTheme();

  const styles = {
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Adjust grid width as needed
      gap: theme.spacing(2),
      backgroundColor: theme.palette.secondary,
      marginBottom: "1rem",
      mr: "1rem",
    },
    gridItem: {
      display: "flex",
      flexDirection: "row",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.primary.light,
    },
    gridItemContent: {
      flex: 1, // Allow content to fill available space
      padding: theme.spacing(2),
    },
    gridItemImage: {
      width: "150px", // Adjust image width as needed
      height: "100%",
      objectFit: "cover", // Ensure image fills container while maintaining aspect ratio
    },
    // ... other styles
  };

  return (
    <>
      <Typography
        id="target-comp"
        variant="h4"
        color="primary.light"
        sx={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        Shop by Category
      </Typography>
     {items && (<Grid container sx={styles.gridContainer}>
        {items.map((item) => (
          <Grid item sx={styles.gridItem} key={item.name}>
            <Button variant="outlined ">
              <CardContent sx={styles.gridItemContent}>
                <Typography
                  variant="h6"
                  color="secondary"
                  sx={{ fontWeight: "bold" }}
                >
                  {item.name}
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
              </CardContent>
              <CardMedia
                component="img"
                image={item.image}
                alt={item.name} // Provide alternative text for accessibility
                sx={styles.gridItemImage}
              />
            </Button>
          </Grid>
        ))}
      </Grid>)} 
    </>
  );
}

export default MainCat;
