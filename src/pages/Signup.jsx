import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link } from "react-router-dom"; // Import for optional "Already have an account" link
import { Alert, Typography, alertClasses } from "@mui/material";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isWhatsappSubscribed, setIsWhatsappSubscribed] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const navigate=useNavigate()
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    setError(false);
    setPasswordError(false);
  
    if (!validatePassword(password)) {
      setloading(false);
      setPasswordError(
        "Password must contain at least 8 character ,one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    try {
      const response = await fetch("https://frameyourmemories.up.railway.app/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password1: password,
          password2: confirmPassword,
        }),
        
      });
      if (response.ok) {
        navigate("/login");
      }
      if (!response.ok) {
        setloading(false);
        throw new Error ()
      }
      
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorData = error.response.data;
        if (errorData.non_field_errors && errorData.non_field_errors.length > 0) {
          const errorMessage = errorData.non_field_errors[0];
          console.error('Error:', errorMessage);
          alert(errorMessage);
        } else {
          console.error('Other 400 error:', error.response.data);
        }
      } else {
        console.error('Other error:', error);
      }
      setError('email id already registred user different id ')
    }
    finally {
      setloading(false);
      setEmail("");
      setConfirmPassword("");
      setPassword("");
      setUsername("");
    }
  };

  return (
    <>
      <Container
        maxWidth="false"
        sx={{ position: "relative", height: "100vh" }}
      >
        {" "}
        {/* Ensures background fills viewport height */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${"/logindoddle.jpg"})`,
           
            backgroundRepeat: "no-repeat", // Prevent image tiling
            backgroundSize: "cover", // Stretch image to fill container
            backgroundPosition: "center",
            opacity: 1, // Add transparency (optional)
            zIndex: -1, // Place behind Login form
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
                <Typography variant="h3" sx={{color : 'black'}}>
                  Register
                </Typography>
                {error && (
                  <>
                    <Alert severity="error">{error}</Alert>
                  </>
                )}
                <form onSubmit={(e)=>handleSubmit(e)}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    type="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      if (validatePassword(password)) {
                        setPasswordError(null);
                      } else {
                        setPasswordError(
                          "Password must contain at least 9 character ,one uppercase letter, one lowercase letter, one number, and one special character."
                        );
                      }
                    }}
                  />
                  <TextField
                    label="Confirm Password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    error={password !== confirmPassword}
                    helperText={
                      password !== confirmPassword
                        ? "Passwords do not match"
                        : ""
                    }
                  />
                  
                  {passwordError && (
                    <Alert severity="error">{passwordError}</Alert>
                  )}
                 
                  <Button
                    type="submit"
                    variant="contained"
                  
                    sx={{ mt: 2, width: "100%" ,color :"white",backgroundColor : 'black'}}
                  >
                    {loading ? (
                      <>
                        Sign up <CircularProgress />
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                  {/* Optional "Already have an account" link */}
                </form>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  );
};

export default Signup;
