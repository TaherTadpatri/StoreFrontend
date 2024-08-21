import React from 'react'
import { Typography, Grid, Box, Card, CardContent, CardHeader } from '@mui/material';
function TernsAndCondition() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader title="Terms & Conditions" />
          <CardContent>
            <Typography variant="h6">Order Changes</Typography>
            <Typography paragraph>
              After order confirmation, we cannot accommodate requests for photograph replacements or changes in sizes or materials. Please ensure that a high-resolution photograph is sent to the whatsapp number +916361002427 along with clear instructions.
            </Typography>
            <Typography variant="h6">Design Revisions</Typography>
            <Typography paragraph>
              Revisions or modifications will only be accepted for digital/soft copy designs. Once the design receives approval, we will commence the actual product's design process.
            </Typography>
            <Typography variant="h6">Final Product Modifications</Typography>
            <Typography paragraph>
              Please note that modifications will not be accepted for the final products.
            </Typography>
            <Typography variant="h6">Product Dispatch</Typography>
            <Typography paragraph>
              Upon completion of the product design, we will dispatch it to the provided address.
            </Typography>
            <Typography variant="h6">Promotional Usage</Typography>
            <Typography paragraph>
              If, during the order placement, customers instruct us not to use their product for promotional and advertisement purposes on our website and social media, we will respect their request.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TernsAndCondition
