import React, { useContext, useState } from "react";
import AuthContext from "./Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormControl, Grid } from "@mui/material";

function ImageUpload() {
  const { user, authTokens } = useContext(AuthContext);
  const parmas = useParams();
  const navigate = useNavigate();
  const [image,setImage]=useState()



  const handleImageChange = (e) => {
   setImage(e.target.files[0]) 
   console.log(image)
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append('image' ,image)
    const uploadImage = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/apiv2/uploadCustomerimage",
          {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + String(authTokens.access),
            },
            body: formdata,
          }
        );
        if (!response.ok) {
          console.log("error uploading image");
        } else {
          console.log("image uploaded");
        }
      } catch (error) {
        console.log(error);
      }
    };
    uploadImage();
  };
  return (
    <div>
      {user ? (
        <Grid container>
          <Grid item xs={12}>
            <form onSubmit={(e) => handlesubmit(e)}>
              <input
                name="image_url"
                type="file"
                onChange={(e) => handleImageChange(e)}
              />
              <Button variant="contained" type="submit">
                Submit photos
              </Button>
            </form>
          </Grid>
        </Grid>
      ) : (
        <>
          <Button variant="contained" onClick={() => navigate("/login")}>
            Login to upload images
          </Button>
        </>
      )}
    </div>
  );
}

export default ImageUpload;
