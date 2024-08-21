import React from "react";
import { Rating, Typography } from "@mui/material";

import { Card, CardContent } from "@mui/material";
import { Grid } from "@mui/material";

const Review = ({ customerName, rating, description }) => {
  return (
    <Card sx={{ marginBottom: "0.5rem", backgroundColor: "secondary.main" }}>
      {" "}
      {/* Add spacing for each card */}
      <CardContent>
        <Typography variant="body1">{customerName}</Typography>
        <Rating name="read-only" value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
};

const reviews = [
  {
    customerName: "John Doe",
    rating: 5,
    description: "This product is amazing! I highly recommend it.",
  },
  {
    customerName: "taher",
    rating: 5,
    description: "This product is amazing! I highly recommend it.",
  },
  {
    customerName: "arfa",
    rating: 5,
    description: "This product is amazing! I highly recommend it.",
  },
  // Add more reviews here
];

function ReviewHome() {
  return (
    <div>
      <Typography variant="h4" color="primary.light" sx={{ marginTop: "1rem" }}>
        Reviews
      </Typography>
      <Grid
        container
        spacing={2}
        color="primary"
        sx={{
          marginTop: "1rem",
          backgroundColor: "primary",
        }}
      >
        {reviews.map((review) => (
          <Grid item xs={12} sm={6} md={4} key={review.customerName}>
            <Review {...review} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ReviewHome;
