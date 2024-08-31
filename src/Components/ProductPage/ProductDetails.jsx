import React, { useContext, useEffect, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Price from "../Price";
import Optionselection from "../Optionselection";
import Productdescription from "../Productdescription";
import ImageUpload from "../ImageUpload";
import { Alert, Box, CircularProgress } from "@mui/material";
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
import Pincode from "../Pincode";
import AuthContext from "../Context/AuthContext";
import Logincomp from "../Logincomp";
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
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #add",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  marginRight: "1rem",
  marginBottom: "1rem",
};

function ProductDetails({ product }) {
  const { user, authTokens } = useContext(AuthContext);
  const [data, setdata] = useState();
  const [open, setopen] = useState(false);
  const params = useParams();
  const [cartLoading, setCartLoading] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [priceUrls, setPriceUrls] = useState([]);
  const [sizeSelected, setSelectedSize] = useState();
  const [productIds, setProductIds] = useState();
  const [error,setError]=useState(null)
  const title = product.title;
  const description = product.description;
  const navigate = useNavigate();
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  const isCustomizable = product.attributes.find(
    (attribute) => attribute.code === "keycustomize"
  )?.value;

  const images = product.images.map((pro) => ({
    original: pro.original,
    thumbnail: pro.original,
  }));

  useEffect(() => {
    const variants = product.children;
    const productIds = variants.map((product) => {
      const size = product.attributes?.find(
        (attribute) => attribute.code === "sizes"
      )?.value;
      return { productId: product.id, size: size };
    });

    const allSizes = variants.map((product) => {
      const size = product.attributes?.find(
        (attribute) => attribute.code === "sizes"
      )?.value;
      return size;
    });

    const urls = variants.map((product) => product.price);
    setSizes(allSizes);
    setPriceUrls(urls);
    setSelectedSize(allSizes[0]);
    setProductIds(productIds);
    console.log(productIds);
  }, []);

  console.log(params);
  const cart = () => {
    if (user) {
      const productIdsWithSize = productIds.filter(
        (item) => item.size === sizeSelected
      );
      const productId = productIdsWithSize.map((item) => item.productId);
      const id = parseInt(productId);
      console.log(id);
      const url =
        sizes.length == 0
          ? `${BACKEND_BASE_URL}api/products/${params.productId}/`
          : `${BACKEND_BASE_URL}api/products/${id}/`;
      console.log(url);
      const product_id= sizes.length== 0 ? params.productId : id
      const addProductToCart = async () => {
        setCartLoading(true);
        try {
          const response = await fetch(`${BACKEND_BASE_URL}apiv2/cart/`, {
            method: "POST",
            headers: {
              "content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access),
            },
            body: JSON.stringify({
              product_id: product_id,
              quantity: 1,
            }),
          });
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          const data = await response.json();

          setCartLoading(false);
          navigate("/cart");
        } catch (error) {
          setError('something went wrong try again') 
          setCartLoading(false)
        } finally {
          setCartLoading(false);
        }
      };
      addProductToCart();
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
            paddingTop: "1rem",
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
                {sizes.length > 0 && (
                  <Optionselection
                    sizes={sizes}
                    priceurls={priceUrls}
                    sizeSelected={sizeSelected}
                    setSelectedSize={setSelectedSize}
                  />
                )}
                <Pincode />
                {sizes.length == 0 && <Price url={product.price} cat={false} />}

                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                ></Typography>

                {isCustomizable && <ImageUpload />}
                {!isCustomizable && (
                  <Button
                    variant={cartLoading ? "outlined" : "contained"}
                    onClick={() => cart()}
                    sx={{
                      fontSize: "1rem",
                      width: "100%",
                      marginBottom: "1rem",
                      backgroundColor: "black",
                      textTransform: "none",
                    }}
                  >
                    {cartLoading ? (
                      <>
                        <CircularProgress sx={{ color: "black" }}>
                          {" "}
                        </CircularProgress>
                      </>
                    ) : (
                      <>Add to cart</>
                    )}
                  </Button>
                )}
                {error && <Alert severity="error"> {error}</Alert>}
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
          <Box sx={style}>
            <Logincomp />
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
}

export default ProductDetails;
