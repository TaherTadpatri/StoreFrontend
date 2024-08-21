import React from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/material';

function Search() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <TextField
        variant="outlined"
        label="Search"
        fullWidth // Make the TextField occupy most space on smaller screens
        sx={{ mr: 1, flexGrow: 1, maxWidth: { xs: '60%', md: '70%' ,lg : '90%' } }} // Adjust width for responsiveness
      />
      <Button variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
}

export default Search;
