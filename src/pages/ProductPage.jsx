import React, { useEffect, useRef, useState } from "react";
import NavbarNew from "../Components/NavbarNew";
import { useLocation, useParams } from "react-router-dom";
import ProductDetails from "../Components/ProductPage/ProductDetails";
import { CircularProgress } from "@mui/material";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
function ProductPage() {
  const productid = useParams();
  const productId = productid.productId;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [product, setProduct] = useState();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  useEffect(() => {
    setLoading(true);
    setError(false);
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `${BACKEND_BASE_URL}api/products/${productId}/`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          setError("Something went wrong");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
        console.log(data);
        setError("");
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, []);

  return (
    <div>
      <NavbarNew> </NavbarNew>

      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress> </CircularProgress>{" "}
        </div>
      )}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden "}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {product && <ProductDetails product={product} />}
      </motion.div>
    </div>
  );
}

export default ProductPage;
