import { Alert, Grid, Typography, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import {Button} from "@mui/material";
function PageNotFound() {
  return (
    <Grid container sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
    }}>
      <Grid item>
        <Box sx={{
          textAlign: 'center',
          padding: '2rem',
          marginRight : '1rem',
          marginLeft: '1rem',
          borderRadius: '10px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        }}>
          <Alert severity="error" sx={{ marginBottom: '1rem' }}>
            <Typography variant="h2">404</Typography>
            <Typography variant="h5">Page Not Found</Typography>
          </Alert>
          <Typography variant="body1">
            Sorry, the page you are looking for does not exist.
          </Typography>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" sx={{textDecoration : "none"}}>
              Go to Homepage
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}

export default PageNotFound;