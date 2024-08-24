import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom'

function CartProduct({data}) {
   //const {productInformation,Cart}=data;
    useEffect(()=>{ 
         const fetchproducts =async () =>{ 
            setLoading(true)
            setError(false) 
            try{ 
                const response= await fetch('https://frameyourmemories.up.railway.app/apiv2/cartproducts/',{ 
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + String(authTokens.access),
                     },
                     body :JSON.stringify({ 
                        cart_id : cart_id
                     })
                })
                if(response.ok){ 
                    const data = await response.json()
                    setProducts(data)
                    setLoading(false)
                    setError()

                }
                else{ 
                    console.log('error')
                }
            }catch(error){ 
                setError(error)
            }finally{ 
                setLoading(false)
            }
         }
         fetchproducts()
    },[])
  //console.log(data)
  return (
    <div>
      <h1>{}</h1>
    </div>
  )
}

export default CartProduct
