import  CircularProgress  from '@mui/material/CircularProgress'
import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

function PriceComponent({url,cat}) {
    const [price,setPrice]=useState()
    const [loading,setloading]=useState(false)

    useEffect(()=>{ 
       const fetchdata =async ()=>{ 
        setloading(true)
        try{ 
            const response = await fetch(url,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            if(!response.ok){ 
                console.log('something went wrong') 
            }
            const data = await response.json();
            setPrice(data)
            setloading(false)

        }catch(error){ 
            console.log(error) 
            setloading(false) 
        }finally{ 
            setloading(false) 
        }
       }
    },[url])
  return (
    <div>
    {loading ? <CircularProgress/> :(
     <>
      {price ? (
       <Typography
         variant={cat ? 'h5' : 'h4'}
         sx={{
           color: "green",
           marginTop : cat ? "0px" : "1rem",
           marginBottom : cat ? "0px"  : "1rem",
         }}
       >
         ₹{price}
       </Typography>
     ) : (
       <>currently not available</>
     )}
     </>
    ) }
      
     </div>
  )
}

export default PriceComponent
