import React, { useState } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { FormControl, Alert, } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
function Pincode() {
  const [pincode, setpincode] = useState();
  const [error, seterror] = useState(false);
  const [servicealbe, setserviceable] = useState(false);
  const [loading,setloading]=useState(false)
  const [city,setcity]=useState()
  const [days,setdays]=useState()
  const fetchservice = async () => {
    setserviceable('')
    setloading(true)
    try {
      const response = await fetch(
        "https://frameyourmemories.up.railway.app/apiv2/checkservice/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pickup_postcode: "583119",
            delivery_postcode: pincode,
            weight: "1",
            cod: 0,
          }),
        }
      );
      if (!response.ok) {
        console.log("error");
      } else {
        const data = await response.json();
        console.log(data);
        try {
          if (data.data.available_courier_companies.length >= 1) {
            const deliverydata=data.data.available_courier_companies[0]
           setcity(deliverydata.city)
            setdays(deliverydata.estimated_delivery_days)
            setserviceable(true);
          } else {
            setserviceable(false);
          }
        } catch (error) {
          seterror(true)
        }
      }
      setloading(false)
    } catch (error) {
      console.log(error.delivery_postcode[0]);
      setloading(false)
    }finally{ 
        setloading(false)
    }
  };
  const handleChange = (event) => {
    const newPincode = event.target.value;
    setpincode(newPincode);
    seterror(newPincode.length !== 6);
  };
  console.log(pincode);
  return (
    <>
      <h4>check delivery</h4>
      <div style={{ marginBottom: '1rem' }}>
      <FormControl error={error}>
        <TextField
          id="pincode"
          label="Pincode"
          value={pincode}
          onChange={handleChange}
          error={error}
          size="small"
        />
      </FormControl>
      {loading ? (<CircularProgress   sx={{ marginLeft: "1rem" }} size={24} />) : (  <Button
        variant="outlined"
        onClick={fetchservice}
        sx={{ marginLeft: "1rem" }}
        size="medium"
      >
        check 
      </Button>)}
    
      { servicealbe && (
        <Alert sx={{marginTop: '0.5rem'}} icon={<CheckIcon fontSize="inherit" />} severity="success">
         {city} , expected delivery in {days} days
        </Alert>
      )}
      {error && (
        <Alert sx={{marginTop: '0.5rem'}} severity="error">Enter a valid pincode</Alert>
      )}
    </div>



     {/*  <div style={{ marginBottom : '1rem'}}
      >
        <FormControl error={error}>
          <TextField
            id="pincode"
            label="Pincode"
            value={pincode}
            onChange={handleChange}
            error={error}
            size="small" 
          />
        </FormControl>
        <Button
       
          variant="outlined"
          onClick={() => fetchservice()}
          sx={{ marginLeft: "1rem" }}
        >
          check {loading && <CircularProgress sx={{height : '10px'}}> </CircularProgress>}
        </Button>
        {servicealbe && (
        <Alert  icon={<CheckIcon fontSize="inherit" />} severity="success">
       Serviceable
      </Alert>
      )}
      {!servicealbe && ( 
        <Alert severity="error">Enter a valid pincode</Alert>
      )}
    </div> */}
      
    </>
  );
}

export default Pincode;
