import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Form, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { Alert } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";

const stickynavbar = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "1rem",
  zIndex: 999,
  justifyContent : 'flex-end'
};

function UserInformation() {
  const navigate = useNavigate();
  const { authTokens, user } = useContext(AuthContext);
  const [loading, setloading] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    line1: "",
    line2: "",
    line4: "",
    state: "",
    postcode: "",
    phone_number: "+91",
    county: "",
    user_id: user.id,
  });
  useEffect(() => {
    const fetchAddressDetails = async () => {
      setloading(true);
      try {
        const response = await fetch(
          "https://tahertadpatri.pythonanywhere.com/apiv2/getUserAddress/",
          {
            method: "GET",
            headers: {
              "content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access),
            },
          }
        );
        if (!response.ok) {
          console.log("error fetching data");
        }
        const data = await response.json();
        const initialFormData = {
          phone_number: data.formdata?.phone_number || "",
          first_name: data.formdata?.first_name || "",
          last_name: data.formdata?.last_name || "",
          line1: data.formdata?.line1 || "",
          line2: data.formdata?.line2 || "",
          state: data.formdata?.state || "",
          postcode: data.formdata?.postcode || "",
        };
      
        setFormData(initialFormData);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };
    fetchAddressDetails();
  }, []);

  const validatePhoneNumber = (phonenumber) => {
    const indianPhoneNumberRegex = /^\d{10}$/;
    return indianPhoneNumberRegex.test(phonenumber);
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name == "phone_number") {
      const isValid = validatePhoneNumber(e.target.value);
      if (!isValid) {
        setPhoneNumberError("enter a valid 10 digit phone number");
      } else {
        setPhoneNumberError(null);
        setFormData({ ...formData, phone_number: `+91${e.target.value}` });
        return;
      }
    }
    if (e.target.name == "pincode") {
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setloading(true);
      await updateUserinformation();
      setloading(false);
      navigate("/payment");
    } catch (error) {
      console.log("something went wrong");
    }
  };
  const updateUserinformation = async () => {
    try {
      const response = await fetch(
        "https://tahertadpatri.pythonanywhere.com/apiv2/updateUserAddress/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            formData: formData,
          }),
        }
      );
      if (!response.ok) {
        console.log("error adding address");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("error with application");
    }
  };
  return (
    <div>
      {loading && (<div style={{ 
        display : 'flex',
        alignItems  : 'center',
        justifyContent : 'center',
        height : '100vh'
      }}>
         <CircularProgress/> 
      </div>)}
      {!loading && (
        <Grid container sx={{paddingLeft: '1rem',paddingRight : '1rem',
          display : 'flex',flexDirection : 'column',alignItems : "center" ,justifyContent : "flex-end"
        }}>
          <Grid Item xs={12} lg={8} >
            <Typography variant="h4" sx ={{paddingTop: '1rem'}}>User Details</Typography>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <TextField
                id="outlined-uncontrolled-firstname"
                label="first name"
                name="first_name"
                defaultValue={formData.first_name}
                value={formData.first_name}
                onChange={(e) => handleChange(e)}
                fullWidth
                required
                margin="normal"
              />

              <TextField
                id="outlined-uncontrolled-lastName"
                label="last name"
                name="last_name"
                defaultValue={formData.last_name}
                value={formData.last_name}
                onChange={(e) => handleChange(e)}
                fullWidth
                margin="normal"
              />

              <TextField
                id="outlined-uncontrolled-phoneNumber"
                label="phone Number"
                name="phone_number"
                defaultValue={formData.phone_number}
                value={formData.phone_number}
                onChange={(e) => handleChange(e)}
                fullWidth
                required
                error={Boolean(phoneNumberError)}
                margin="normal"
                /*InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  ),
                }}*/
                helperText={phoneNumberError}
              />

              <TextField
                id="outlined-uncontrolled-line1"
                label="Address line 1"
                name="line1"
                defaultValue={formData.line1}
                value={formData.line1}
                onChange={(e) => handleChange(e)}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                id="outlined-uncontrolled-line2"
                label="Address line 2"
                name="line2"
                defaultValue={formData.line2}
                value={formData.line2}
                onChange={(e) => handleChange(e)}
                fullWidth
                margin="normal"
              />
              <TextField
                id="outlined-uncontrolled-city"
                label="city"
                name="city"
                defaultValue={formData.city}
                value={formData.city}
                onChange={(e) => handleChange(e)}
                fullWidth
                required
                autoFocus
                margin="normal"
              />

              <TextField
                id="outlined-uncontrolled-postcode"
                label="pincode"
                name="postcode"
                defaultValue={formData.postcode}
                value={formData.postcode}
                onChange={(e) => handleChange(e)}
                fullWidth
                required
                margin="normal"
              />

              <TextField
                id="outlined-uncontrolled-state"
                label="state"
                name="state"
                defaultValue={formData.state}
                value={formData.state}
                onChange={(e) => handleChange(e)}
                fullWidth
                required
                margin="normal"
              />
              {loading ? (
                <div  sx={stickynavbar} >
                   <CircularProgress />
                </div>
               
              ) : (
                <div sx={stickynavbar}> 
                  <Button
                  sx={{backgroundColor : 'black',
                    color :'white',
                    justifyContent : 'flex-end'
                  }}
                  type="submit"
                  variant="contained"
                  disabled={phoneNumberError}
                  
                >
                  Submit
                </Button>
                </div>
                
              )}
            </Form>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default UserInformation;
