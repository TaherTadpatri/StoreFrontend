import { CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function Price({ url ,cat}) {
  const [price, setprice] = useState();
  const [loading,setloading]=useState(false)
  useEffect(() => {
    setloading(true)
    const fetchprice = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        if (!response.ok) {
          console.log("error fetching details");
        } else {
          const data = await response.json();
          
          setprice(data.excl_tax);
          setloading(false)
        }
      } catch (error) {
        console.log(error);
        setloading(false)
      }
    };
    fetchprice();
  }, [url]);

  
  return (
    <div>
   {loading ? <CircularProgress/> :(
    <>
     {price ? (
      <Typography
        variant={cat ? 'h5' : 'h4'}
        sx={{
          color: "green",
          marginTop : cat ? "0px" : "1rem",
          marginBottom : cat ? "0px"  : "1rem",
        }}
      >
        ₹{price}
      </Typography>
    ) : (
      <>currently not available</>
    )}
    </>
   ) }
     
    </div>
  );
}

export default Price;
