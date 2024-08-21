import { TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react'
import AuthContext from '../Context/AuthContext';
import { useContext ,useState,useEffect} from 'react';
import {Table} from '@mui/material';
import {Container} from '@mui/material';

export const fetchShippingAddress = async (authTokens) => {
  
  try {
    const response = await fetch(
      "http://localhost:8000/apiv2/getUserAddress/",
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    if (!response.ok) {
      console.log("error fetching data");
    }
    const data = await response.json();
    const initialFormData = {
      phone_number: data.formdata?.phone_number || "",
      first_name: data.formdata?.first_name || "",
      last_name: data.formdata?.last_name || "",
      line1: data.formdata?.line1 || "",
      line2: data.formdata?.line2 || "",
      state: data.formdata?.state || "",
      postcode: data.formdata?.postcode || "",
    };

    return initialFormData
  } catch (error) {
    console.log(error);
  }
}
function Information() {

    const{user,authTokens}=useContext(AuthContext)

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    line1: "",
    line2: "",
    line4: "",
    state: "",
    postcode: "",
    phone_number: "+91",
    county: "",
    user_id: user.id,
  });
  useEffect(() => {
    const fetchAddressDetails = async () => {
      try {
        const response = await fetch(
          "https://tahertadpatri.pythonanywhere.com/apiv2/getUserAddress/",
          {
            method: "GET",
            headers: {
              "content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access),
            },
          }
        );
        if (!response.ok) {
          console.log("error fetching data");
        }
        const data = await response.json();
        const initialFormData = {
          phone_number: data.formdata?.phone_number || "",
          first_name: data.formdata?.first_name || "",
          last_name: data.formdata?.last_name || "",
          line1: data.formdata?.line1 || "",
          line2: data.formdata?.line2 || "",
          state: data.formdata?.state || "",
          postcode: data.formdata?.postcode || "",
        };

        setFormData(initialFormData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddressDetails();
  }, []);

  return (
    <div style={{paddingTop : "2rem" , paddingLeft: "1rem"}}>

      <Typography variant='h3' color='black' >Shipping Address</Typography>
        <TableContainer component={Container} elevation={3}>
      <Table>
        <TableHead>
          <TableRow >
            <TableCell ><Typography variant='h5'>Field</Typography></TableCell>
            <TableCell><Typography variant='h5'>Value</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key="first_name">
            <TableCell>First Name</TableCell>
            <TableCell>{formData.first_name}</TableCell>
          </TableRow>
          <TableRow key="last_name">
            <TableCell>Last Name</TableCell>
            <TableCell>{formData.last_name}</TableCell>
          </TableRow>
          <TableRow key="address">
            <TableCell>Address</TableCell>
            <TableCell>
              {formData.line1}
              <br />
              {formData.line2 ? formData.line2 + '<br />' : ''}
              {formData.line4}
            </TableCell>
          </TableRow>
          <TableRow key="state">
            <TableCell>State</TableCell>
            <TableCell>{formData.state}</TableCell>
          </TableRow>
          <TableRow key="postcode">
            <TableCell>Postcode</TableCell>
            <TableCell>{formData.postcode}</TableCell>
          </TableRow>
          <TableRow key="phone_number">
            <TableCell>Phone Number</TableCell>
            <TableCell>{formData.phone_number}</TableCell>
          </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Information
