import React, { useEffect } from "react";
import { useState } from "react";
import Price from "./Price";
import { CircularProgress, Typography } from "@mui/material";

function Optionselection({ sizes, priceurls ,sizeSelected,setSelectedSize}) {
 
  const [price, setprice] = useState({});
  const [index, setindex] = useState(0);
  const [loading, setloading] = useState(false);

  const options = sizes.map((size, index) => ({
    value: size,
    label: size,
    index: index,
  }));

  const handleChange = (e, index) => {
    setSelectedSize(e.target.value);
    setindex(index);
  };
  return (
    <div>
      <Typography variant="h6" color="secondary">
        select size
      </Typography>
      {!price && <CircularProgress> </CircularProgress>}
      {!loading && (
        <>
          <select
            style={{
              width: "100%",
              fontSize: "1rem",
              padding: '5px', // Add spacing for better visual appearance
              border: "1px solid #ccc", // Basic border for visibility
              borderRadius:'4px', // Round corners for Material-UI style
            }}
            value={sizeSelected}
            onChange={(e) =>
              handleChange(
                e,
                options.findIndex((option) => option.value === e.target.value)
              )
            }
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <Price url={priceurls[index]} cat={false} />
        </>
      )}
    </div>
  );
}

export default Optionselection;
