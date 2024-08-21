import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Alert } from "@mui/material";
import axios from "axios";
import AuthContext from "./Context/AuthContext";
import { Link } from "react-router-dom";
import {InputAdornment} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
function Logincomp() {

  

const csrfToken = document.querySelector('meta[name="csrf-token"]');

axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
  const mobileStyle = {
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 1, // Adjust padding
    paddingLeft: "40px", // Adjust left padding
    paddingRight: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center content within the box
    justifyContent: "center", // Center content vertically within the box
  };
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const location = useLocation();
  const [page, setpage] = useState();
 
  const {user,authTokens,loginUser} =useContext(AuthContext)
  console.log(user)
  useEffect(() => {
    if(user){ 
      navigate('/')
    }
    try {
      const pagelocation = location.state.page;
     
      setpage(pagelocation || '/');
    } catch (error) {
      setpage(false);
    }
  });


 
 
  const loginAction = async(e) =>{ 
    e.preventDefault()
    setloading(true)
    setError(false)
    const response=await loginUser(e) 
    console.log(response);
    if(response === 'true'){ 
      setloading(false) 
      navigate(page || '/');
    }
    else{ 
      setloading(false) 
      setError(true)
    }
  }
  return (
    <>
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
            backgroundImage: `url(${"/logindoddle.jpg"})`, 
            backgroundRepeat: "no-repeat", 
            backgroundSize: "cover", 
            backgroundPosition: "center",
            opacity: 1, 
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
               
                <Typography variant="h3" color="black">
                  Login
                </Typography>
                
                {error && (
                  <>
                    <Alert severity="error">invalid login credentials</Alert>
                  </>
                )}
                <form onSubmit={loginAction} >
                <TextField
                  id="email"
                  label="Email Address"
                  variant="outlined"
                  name="email"
                  margin="normal"
                  fullWidth
                  value={email} // Bind the state variable to the value prop
                  onChange={(event) => setEmail(event.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  name="password"
                  margin="normal"
                  fullWidth
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
           <Link to="/forgotpassword"> forgot password</Link><div style= {{ marginBottom : '1rem'}}></div>
                <Button
                  variant="contained"
                 
                  sx={{ marginRight: "3px" ,color : 'white',backgroundColor : 'black' }}
                  type="submit"
                  endIcon={
                    loading && <CircularProgress color="inherit" size={24} />
                  }
                >
                  {loading ? "Login..." : "Login"}
                </Button>
                <div style={{display : 'flex' , flexDirection : 'row' ,marginTop : '1rem'}}>
                <Typography>Don't have a account</Typography>
                 <Link to="/signup" style={{marginLeft : '10px' , color : 'blue'}}>sign up
                 </Link>
                </div>
                </form>
               
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default Logincomp;
