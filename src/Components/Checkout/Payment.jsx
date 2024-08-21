import React from 'react'
import NavbarNew from '../NavbarNew'
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Payment({setActivestep}) {
  return (
    <div>
        <Button variant="text" startIcon={<ArrowBackIcon />} onClick={() => {
      
    }}>
      Back
    </Button>
    </div>
  )
}

export default Payment
