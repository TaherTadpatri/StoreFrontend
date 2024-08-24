import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Alert,
  TextField,
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

import { useNavigate } from "react-router-dom";
function Forgotpassword() {
  const [email, setEmail] = useState();
  const [otpRecived, setOtpRecived] = useState(false);
  const [error, setError] = useState(null);
  const [otp, setOtp] = useState();
  const [otperror, SetOtpError] = useState();
  const [changePassword, setChangePassword] = useState(false);
  const [newpassword, setnewPassword] = useState({
    newpassword: "",
    confirmpassword: "",
  });
  const [loading,setLoading]=useState(false)
  const [sendotploading,sendSetOtpLoading]=useState(false)
  const navigate=useNavigate()

  const forgoPawwrodAction = (e) => {
    e.preventDefault();
    setError(false);
    sendSetOtpLoading(true)
    const sendOtpRequest = async () => {
      try {
        const response = await fetch("https://frameyourmemories.up.railway.app/apiv2/getOtp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_email: email,
          }),
        });
        if (!response.ok) {
          console.log("something went wrong");
          setError(true);
        } else {
          const data = await response.json();
          console.log(data.email);
          setOtpRecived(true);
          sendSetOtpLoading(false)
        }
      } catch (error) {
        console.log(error);
      }finally{ 
        sendSetOtpLoading(false)
      }
    };
    sendOtpRequest();
  };
  const handleOtpVerification = (e) => {
    e.preventDefault();
    setError(false);
    SetOtpError(false);
    const verifyOtp = async () => {
      try {
        const response = await fetch(
          "https://frameyourmemories.up.railway.app/apiv2/validateOtp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_email: email,
              otp: otp,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setOtpRecived(false);
          setChangePassword(true);
        } else {
          SetOtpError(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyOtp();
  };
 const handlePasswordChange =(e) =>{ 
    e.preventDefault() 
    setLoading(true)
    const handlePasswordRequest = async()=>{ 
        try{ 
            const response= await fetch('https://frameyourmemories.up.railway.app/apiv2/changePassword',{ 
                method : 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({ 
                    new_password:newpassword.newpassword,
                    confirm_password : newpassword.confirmpassword,
                    email: email
                })
            })
            if(response.ok){ 
                const data = await response.json();
                console.log(data);
                setLoading(false);
                alert('password changed sucessfully')
                setTimeout(() => {
                     navigate('/')
                }, 500);
            }
        }catch(error){ 
            console.log('something went wrong') 
        }
    }
    handlePasswordRequest()
    
 }
  return (
    <div>
      <Container
        maxWidth="false"
        sx={{ position: "relative", height: "100vh" }}
      >
        {" "}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor : 'white',
            /* backgroundImage: `url(${"../../public/logindoddle.jpg"})`, */
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity:1,
            zIndex: -1,
          }}
        />
        <Container
          maxWidth="sm"
          sx={{
            display: "flex ",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 1,
                  padding: "40px",
                  borderRadius: 2,
                }}
              >
                {!changePassword && (
                  <>
                    <Typography variant="h5" color="black">
                      Reset Password
                    </Typography>
                    {otpRecived && <Alert>check your mail for otp</Alert>}
                    {error && (
                      <Alert severity="error">
                        No Account found with the provided email
                      </Alert>
                    )}
                    <form onSubmit={(e) => forgoPawwrodAction(e)}>
                      <TextField
                        id="email"
                        label="Email Address"
                        variant="outlined"
                        name="email"
                        margin="normal"
                        fullWidth
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                      {!otpRecived && ( !sendotploading ? (  <Button
                          variant="contained"
                          sx={{color : 'white',backgroundColor : 'black'  }}
                          type="submit"
                        >
                          Send Otp
                        </Button>) : (<CircularProgress/>)
                     )}
                    </form>
                    {otpRecived && (
                      <form onSubmit={(e) => handleOtpVerification(e)}>
                        <TextField
                          id="otp"
                          label="otp"
                          variant="outlined"
                          name="otp"
                          fullWidth
                          onChange={(e) => setOtp(e.target.value)}
                        />
                        {otperror && (
                          <Alert sx={{ marginTop: "1rem" }} severity="error">
                            Enter a valid otp
                          </Alert>
                        )}
                        <Button
                          variant="contained"
                       
                          type="submit"
                          sx={{color : 'white',backgroundColor : 'black'  ,marginTop : '1rem'}}
                        >
                          verify otp
                        </Button>
                      </form>
                    )}
                  </>
                )}
                {changePassword && (
                  <>
                    <Typography variant="h5" color="primary">
                      Change Password
                    </Typography>
                    <form style={{ marginTop: "1rem" }} onSubmit={(e)=>handlePasswordChange(e)}>
                      <TextField
                        id="newpassword"
                        label="New password"
                        name="newpassword"
                        variant="outlined"
                        value={newpassword.newpassword}
                        fullWidth
                        type="password"
                        required
                        onChange={(e) =>
                          setnewPassword({
                            ...newpassword,
                            newpassword: e.target.value,
                          })
                        }
                        sx={{ marginBottom: "1rem" }}
                      />
                      <TextField
                        id="conformpassword"
                        label="confirm password"
                        name="confirmpassword"
                        variant="outlined"
                        fullWidth
                        required
                        value={newpassword.confirmpassword}
                        type="password"
                        onChange={(e) =>
                          setnewPassword({
                            ...newpassword,
                            confirmpassword: e.target.value,
                          })
                        }
                        error={
                          newpassword.newpassword !==
                          newpassword.confirmpassword
                        }
                        helperText={
                          newpassword.newpassword !==
                          newpassword.confirmpassword
                            ? "passwords do not match"
                            : ""
                        }
                        sx={{ marginBottom: "1rem" }}
                      />

                    {!loading ? (<Button
                        variant="contained"
                        disabled={
                          newpassword.newpassword !==
                          newpassword.confirmpassword
                        }
                        type="submit"
                        sx={{ marginBottom: "1rem" ,color: 'white', backgroundColor : 'black'}}
                      >
                    Change Password
                      </Button>) : (<CircularProgress/>) }   
                    </form>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </div>
  );
}

export default Forgotpassword;
