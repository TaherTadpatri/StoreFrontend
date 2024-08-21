import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert, Stack } from "@mui/material";
import Navbarnew from "../Components/NavbarNew";
import Footer from "../Components/Footer";
import ContactPhoto from "../../public/aboutphoto.jpg";
function Contact() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    message: "",
  });
  const handleform = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setMessage(null);
      const response = await fetch("https://tahertadpatri.pythonanywhere.com/apiv2/contactus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setLoading(false);
      setError(null);
      setMessage(data.message);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const setText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log(form);
  return (
    <div>
      <Navbarnew />
      {/*<ArrowBackIcon
        sx={{ fontSize: "3rem", marginLeft: "1rem", marginTop: "1rem" }}
        onClick={() => navigate(-1)}
  />*/}
      <Container
        maxWidth="md"
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={ContactPhoto}
          style={{ borderRadius: "1rem", marginTop: "2rem", width: "100%" }}
        />
        <Typography variant="h1">
          Here to{" "}
          <span
            style={{
              fontWeight: "bold",
              fontFamily: "monospace",
              color: "green",
            }}
          >
            help
          </span>
        </Typography>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          sx={{ marginTop: "3rem" }}
        >
          Contact Us
        </Typography>

        <Box noValidate sx={{ mt: 1 }}>
          <form onSubmit={(e) => handleform(e)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="first_name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setText(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                  onChange={(e) => setText(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  required
                  onChange={(e) => setText(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="phone"
                  label="Phone Number"
                  name="phone_number"
                  type="tel"
                  fullWidth
                  onChange={(e) => setText(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="message"
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  fullWidth
                  required
                  onChange={(e) => setText(e)}
                />
              </Grid>
            </Grid>
            {message && (
              <Alert severity="info" sx={{ marginTop: "1rem" }}>
                {" "}
                {message}
              </Alert>
            )}
            {error && (
              <Alert severity="danger" sx={{ marginTop: "1rem" }}>
                {" "}
                {error}{" "}
              </Alert>
            )}
            {loading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "2rem",
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, textTransform: "none" }}
              >
                send
              </Button>
            )}
          </form>
        </Box>
        <Grid item xs={12} sx={{ marginTop: "2rem" }}>
          <Stack direction="row" spacing={2}>
            <Typography>instagram</Typography>
            <Typography>whatsapp</Typography>
            <Typography>email</Typography>
          </Stack>
          <Stack
            direction="column"
            sx={{ marginTop: "2rem", marginBottom: "2rem" }}
          >
            <Typography>Address:</Typography>
            <Typography>
              Shafi Photo Stuido,
              <br />
              Beside Nurani Masjid ,<br />K P T C L raod,
              <br />
              sandur-583119
            </Typography>
            <Typography sx={{ marginTop: "1rem" }}>
              Phone Number: <br />
              +916361002427
              <br />
              +919448632365
            </Typography>
          </Stack>
        </Grid>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default Contact;
