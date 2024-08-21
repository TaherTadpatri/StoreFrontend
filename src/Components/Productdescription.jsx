import { Card, CardContent } from '@mui/material'
import React from 'react'
import {Accordion,AccordionDetails,AccordionSummary,Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

function Productdescription({attributes}) {

    const [expanded, setExpanded] = useState(true); // Default to expand the first part

  const description = attributes.find((attribute) => attribute.code === 'descriptionpro');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
    
  return (
  <div sx={{marginTop : '1rem'}}>
       <Accordion sx={{marginTop : '1rem' , border : '1px solid #add'}} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ fontWeight: 'bold' }}>Product Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Card sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
            <CardContent>
              <div dangerouslySetInnerHTML={{ __html: description.value }} />
            </CardContent>
          </Card>
        </AccordionDetails>
        
      </Accordion>
      <Accordion>
      <AccordionSummary
         expandIcon={<ExpandMoreIcon />}
         aria-controls="panel2bh-content"> 
         <Typography sx= {{fontWeight : 'bold'}} >Reviews</Typography>
          </AccordionSummary>
        <AccordionDetails> 
             <h4>no revies yet</h4>
        </AccordionDetails>
         </Accordion>
    </div>
  )
}

export default Productdescription
