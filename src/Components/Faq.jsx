import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Typography,
  Grid,
  Container
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMoreRounded";
function Faq() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchFaq = async () => {
      try {
        const response = await fetch("https://tahertadpatri.pythonanywhere.com/apiv2/faq", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          console.log("something went wrong");
        } else {
          const data = await response.json();
          console.log(data);
          setItems(data);
          setLoading(false);
        }
      } catch (error) {
        console.log("something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchFaq();
  }, []);
  return (
    <Grid Container> 
    <div style={{marginLeft : '1rem',marginRight : '1rem' }}>
      <Typography
        variant="h4"
        color="primary"
        sx={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        Faq
      </Typography>
      {loading && <CircularProgress />}
      {items && (
        <>
          {items.map((item, index) => (
            <Accordion key={index} >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}-content`} 
                id={`panel${index + 1}-header`} 
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {item.faq_title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails><Typography variant="body1">{item.faq_description}</Typography></AccordionDetails>
            </Accordion>
          ))}
        </>
      )}
    </div>
    </Grid>
  );
}

export default Faq;
