import React, { useContext, useEffect, useState } from "react";
import {
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Information, { fetchShippingAddress } from "../Components/Checkout/Information";
import AuthContext from "../Components/Context/AuthContext";
import NavbarNew from "../Components/NavbarNew";
import { Card, CardContent } from "@mui/material";
import { Box, Button } from "@mui/material";
function Profile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shippingDetails, setShippingDetails] = useState();
  const { authTokens } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState();
  const [newDetails,setNewDetails]=useState({ 
    'name': '',
    'email': '',
  })
  
  const [editUser, setEditUser] = useState(false);

  const handleEditClick = () => {
    setEditUser(!editUser);
  };
  useEffect(() => {
    setLoading(true);
    const getDetails = async () => {
        try{  const shippingData = await fetchShippingAddress(authTokens);
            setShippingDetails(shippingData);
        }catch(error){ 
            setError(error.message);
        }
    
      try {
        const response = await fetch(
          "https://frameyourmemories.up.railway.app/apiv2/getUserInformation",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access),
            },
          }
        );
        if (!response.ok) {
          console.log("something went wrong");
        }
        const data = await response.json();
        setUserDetails(data);
        
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, []);

  return (
    <div>
      <NavbarNew />
      {loading && (
        <div
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
      {userDetails && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}> 
              <Typography variant="h3" component="div" >
                User Profile
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                    fontWeight="bold"
                  >
                    Username:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="username"
                    name="name"
                    variant={editUser ? "standard" : "standard"}
                    value={userDetails.user}
                    disabled={!editUser}
                    onChange={(e) => {
                        const updatedDetails = { ...userDetails }; 
                        updatedDetails.user = e.target.value; 
                        setUserDetails(updatedDetails);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                    fontWeight="bold"
                  >
                    Email:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="email"
                    name="email"
                    variant={editUser ? "standard" : "standard"}
                    value={userDetails.email}
                    disabled={!editUser}
                    onChange={(e) => {
                        const updatedDetails = { ...userDetails }; 
                        updatedDetails.email = e.target.value; 
                        setUserDetails(updatedDetails);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
           {/* <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}> 
              <Button variant="contained" onClick={handleEditClick}>
                {editUser ? "Save" : "Edit"}
              </Button>
                </Grid>*/}
          </Grid>
        </Box>
      )}
     {/* {shippingDetails && ( 
        <Grid container xs={12}> 
           <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                    fontWeight="bold"
                  >
                    Email:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="email"
                    name="email"
                    variant={editUser ? "standard" : "standard"}
                    value={shippingDetails.first_name}
                    disabled={!editUser}
                    onChange={(e) => {
                        const updatedDetails = { ...userDetails }; 
                        updatedDetails.email = e.target.value; 
                        setUserDetails(updatedDetails);
                    }}
                  />
                  

                  
                </Grid>
              </Grid>
            </Grid>
        </Grid>
      )}  */}
      <Information/>
    </div>
  );
}

export default Profile;
