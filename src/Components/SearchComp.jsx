import React, { useState } from "react";
import { Modal, Box ,TextField} from "@mui/material";
import {Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function SearchComp({ searchbtn, handleSearch }) {
  const [search,setsearch]=useState("")
  const navigate=useNavigate() 


  const searchstyle = {
    position: "fixed", 
    top: 0,
    left: 0, 
    width: "100%",
    height: "3rem", 
    bgcolor: 'white',
    boxShadow: 24, 
    p: 4,
    zIndex: 1000,
  };
  const Search = (e)=>{ 
    e.preventDefault();
    handleSearch()
    navigate(`/search/${search}`)
  
  }
  return (
    <>
      <Modal
        open={searchbtn}
        onClose={handleSearch}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
       <form onSubmit={(e)=>Search(e)}>
        <Box sx={searchstyle}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              variant="outlined"
              label="Search"
              fullWidth 
              sx={{
                mr: 1,
                flexGrow: 1,
                
                maxWidth: { xs: "60%", md: "70%", lg: "90%" },
              }} 
              onChange={(e)=>setsearch(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit" disabled={search.length == 0}
              sx={{backgroundColor: 'black',color : 'white'}}
            >

              Search
            </Button>
     
          </Box>
        </Box>
        </form>
      </Modal>
    </>
  );
}

export default SearchComp;
