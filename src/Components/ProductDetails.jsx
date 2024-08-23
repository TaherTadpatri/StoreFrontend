import React, { useContext, useEffect, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Price from "./Price";
import Optionselection from "./Optionselection";
import Productdescription from "./Productdescription";
import ImageUpload from "./ImageUpload";
import { Box, CircularProgress } from "@mui/material";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Modal,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pincode from "./Pincode";
import AuthContext from "./Context/AuthContext";
import Logincomp from "./Logincomp";
import { useNavigate, useParams } from "react-router-dom";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600, // Adjust breakpoint for tablets (default is 600)
      md: 900, // Adjust breakpoint for desktops (default is 900)
      lg: 1200,
      xl: 1536,
    },
  },
});
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #add',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  marginRight: '1rem',
  marginBottom: '1rem'
};

function ProductDetails({ product }) {
  
  const { user, authTokens } = useContext(AuthContext);
  const [data, setdata] = useState();
  const [open, setopen] = useState(false);
  const params=useParams() 
  const [cartLoading,setCartLoading]=useState(false)
  console.log(params.productId) 

  const title = product.title;
  const description = product.description;
  const navigate=useNavigate() 
  const isCustomizable = product.attributes.find(
    (attribute) => attribute.code === "keycustomize"
  )?.value;

  const images = product.images.map((pro) => ({
    original: pro.original,
    thumbnail: pro.original,
  }));

  
  const cart = () => {
    if (user) {
      const addProductToCart=async()=>{ 
        setCartLoading(true)
        try{ 
          const response=await fetch('https://storebackend-production-9a2b.up.railway.app/apiv2/addToCart',{ 
            method : 'POST',
            headers: {
              "content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access),
            },
            body :JSON.stringify({ 
              product_id : params.productId,
              quantity: 1
            })
          
          })
          if(!response.ok){ 
            console.log('error adding to cart') 
          }
          const data=await response.json() 
          console.log(data)
          setCartLoading(false)
          navigate('/cart')
        }catch(error){ 
          console.log("error")
        }finally{ 
          setCartLoading(false)
        }
      }
      addProductToCart()
    } else {
      setopen(true);
      if (user) {
        console.log(user.user_id);
      }
    }
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Card
          sx={{
            maxWidth: "100%",
            borderRadius: "10px",
            border: "1px solid #add",
            marginTop: "1rem",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} style={{ marginTop: "1rem" }}>
              <Card
                sx={{
                  maxWidth: "100%",
                  borderRadius: "10px",
                  border: "1px solid #add",
                  marginTop: "1rem",
                  marginRight: "1rem ",
                  marginLeft: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <ReactImageGallery
                  showBullets={true}
                  showFullscreenButton={false}
                  showPlayButton={false}
                  showNav={true}
                  showIndex={false}
                  items={images}
                  originalHeight={400}
                >
                  {" "}
                </ReactImageGallery>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              {" "}
              {/* Product details container (full width on mobile, half on larger screens) */}
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  sx={{ fontFamily: "revert-layer" }}
                >
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </Typography>
                <Optionselection attributes={product.attributes} />
                <Pincode />
                <Price url={product.price} />

                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                ></Typography>

                {isCustomizable && <ImageUpload />}
                {!isCustomizable && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => cart()}
                    sx={{
                      fontSize: "1rem",
                      width: "100%",
                      marginBottom: "1rem",
                    }}
                  >
                    {cartLoading ? <> 
                    <CircularProgress> </CircularProgress>
                    </>: <>
                    add to cart</>}
                  </Button>
                )}
                <Productdescription attributes={product.attributes} />
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <Modal
          open={open}
          onClose={() => setopen(!open)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
          >
           <Logincomp/>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
}

export default ProductDetails;
