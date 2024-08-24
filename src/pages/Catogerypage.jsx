import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Catproduct from "../Components/Catproduct";
import NavbarNew from "../Components/NavbarNew";
import { Grid, Typography ,Container} from "@mui/material";
import ProductCard from "../Components/ProductCard";
import CircularProgress from "@mui/material/CircularProgress";

function Catogerypage() {
  const [loading, setloading] = useState(false);
  const catogeryid = useParams();
  const catogery_id = catogeryid.catogeryid;
  console.log(catogery_id);
  const [items, setitems] = useState();
  useEffect(() => {
    const fetchcatdata = async () => {
      setloading(true);
      try {
        const resonse = await fetch(
          "https://frameyourmemories.up.railway.app/apiv2/catproducts/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              category_id: catogeryid.catogeryid,
            }),
          }
        );
        if (!resonse.ok) {
          console.log("error");
        } else {
          const data = await resonse.json();
          console.log(data);
          setitems(data);
          setloading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    fetchcatdata();
  }, []);

  return (
    <Grid container sx={{backgroundColor : "#EDEADE"}}>
      <Grid item xs={12}>
        <NavbarNew />
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        <Container maxWidth="md" spacing={0}> {/* Center content on desktop */}
          <Grid container sx={{ backgroundColor: "#EDEADE", marginBottom: "1rem" }}>
            {items && items.length > 0 && (
              <Grid container>
                <Grid item xs={12} sx={{ backgroundColor: "#EDEADE", paddingTop: "2rem" }}>
                  <Typography variant="h2" sx={{ color: "black", textAlign: "center" }}>
                    {items[0].categories[0]}
                  </Typography>
                </Grid>
              </Grid>
            )}
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
            {items && (
              <Grid container spacing={2} color="primary" sx={{ backgroundColor: "#EDEADE" ,paddingTop : '2rem'}}>
                {items.map((product, _) => (
                  <Grid item xs={6} sm={4} md={3} lg={3} key={product.id}>
                    <ProductCard product={product} catogery_id={catogery_id} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Catogerypage;
