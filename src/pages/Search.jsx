import { CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarNew from "../Components/NavbarNew";
import SearchProductPage from "../Components/Search/SearchProductPage";
import SearchIcon from "@mui/icons-material/Search";
import { Alert } from "@mui/material";

function Search() {
  const params = useParams();
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const searchquery = params.searchquery;
  useEffect(() => {
    const fetchProducts = async () => {
      setloading(true);
      setError(null);
      try {
        const response = await fetch("https://frameyourmemories.up.railway.app/apiv2/search", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            search: searchquery,
          }),
        });
        if (!response.ok) {
          setError("something went wrong");
        } else {
          const data = await response.json();
          setData(data);
          setloading(false);
        }
      } catch (error) {
        setloading(false);
        setError(error);
      }
    };
    fetchProducts();
  }, [searchquery]);

  return (
    <div>
      <NavbarNew />
      <div style={{ marginTop: "1rem" }}></div>
      {loading && (
      <div style={{ 
        display : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width : '100%'
      }}><CircularProgress /></div>)}
      {error && <Alert severity="error"> {error}</Alert>}
      {data?.length >= 1 ? (
        <SearchProductPage data={data} />
      ) : (
        !loading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              width: "100%",
            }}
          >
            <SearchIcon />
            <Typography variant="h4" component="h2">
              No results found
            </Typography>
          </div>
        )
      )}
    </div>
  );
}

export default Search;
