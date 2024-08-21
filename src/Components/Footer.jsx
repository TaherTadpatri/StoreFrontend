import React from "react";
import {
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  Box
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DesktopFooter from "./DesktopFooter";

const MobileFooter = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Divider sx={{ marginTop: "1rem" }} />
      <Grid container sx={{ marginTop: "1rem" }}>
        <Grid
          item
          xs={12}
          sx={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
            marginBottom: "1rem",
          }}
        >
          <Stack
            direction="row"
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <TextField
              label="subscribe"
              name="subscribe"
              variant="outlined"
              type="mail"
              sx={{ width: "80%", fontSize: "2rem" }}
              size="small"
            ></TextField>
            <Button
              variant="contained"
              sx={{ textTransform: "none", marginLeft: "1rem" }}
            >
              {" "}
              subscribe
            </Button>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          spacing={2}
        >
          <Grid item xs={6} direction="column">
            <Stack direction="column" sx={{ padding: "20px" }} spacing={1}>
              <Typography component="h3" onClick={() => navigate("/")}>
                Home
              </Typography>
              <Typography component="div" onClick={() => navigate("/About")}>
                About us
              </Typography>
              <Typography component="div" onClick={() => navigate("/Contact")}>
                Contact us
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} direction="column">
            <Stack direction="column" sx={{ padding: "20px" }} spacing={1}>
              <Typography component="h3" onClick={() => navigate("/signup")}>
                Sign in
              </Typography>
              <Typography component="div" onClick={() => navigate("/orders")}>
                Orders
              </Typography>
              <Typography component="div" onClick={() => navigate("/orders")}>
                Return & exchange
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Grid item xs={6} direction="column">
            <Stack direction="column" sx={{ padding: "20px" }} spacing={1}>
              <Typography component="h3" onClick={() => navigate("/")}>
                Instagram
              </Typography>
              <Typography component="div" onClick={() => navigate("/About")}>
                whatsapp
              </Typography>
              <Typography component="div" onClick={() => navigate("/Contact")}>
                Email
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap  :'wrap',
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography onClick={()=>navigate('/policy/termsandcondition')}>Terms & Condition</Typography>
      
          <Typography onClick={()=>navigate('/policy/Refundpolicy')}>Refund Policy</Typography>
      

        </Grid>
      </Grid>
    </div>
  );
};
function Footer() {
  const [isDesktop, setDesktop] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const handleResize = () => setDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      <Grid container lg={12} >{isDesktop ? <DesktopFooter /> : <MobileFooter />}</Grid>
    </div>
  );
}

export default Footer;
