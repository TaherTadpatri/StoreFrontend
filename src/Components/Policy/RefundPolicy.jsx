import React from 'react'
import { Typography, Grid, Box, Card, CardContent, CardHeader, CardMedia } from '@mui/material';
function RefundPolicy() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader title="Refund & Replacement Policy" />
          <CardContent>
            <Typography variant="h6">Refund Policy</Typography>
            <Typography paragraph>
              Please note that personalized products are non-refundable and cannot be cancelled once the order is placed.
            </Typography>
            <Typography variant="h6">Replacement Policy</Typography>
            <Typography paragraph>
              To facilitate damage claims, kindly record a full unboxing video when opening your package. In the event of damage, replacements will be processed based on the provided video.
            </Typography>

            
            <Typography variant="h6">Damage Replacement Guidelines</Typography>
            <Typography paragraph>
              In case of any damages, it is essential to report them within 48 hours of receiving your order. To initiate the process, please send a video detailing the damage, along with your order information, to our WhatsApp number: +916361002427.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default RefundPolicy
