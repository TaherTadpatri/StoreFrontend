import React, { useEffect, useRef } from 'react'
import Carsoulmui from '../Components/Carsoulmui'
import ReviewHome from '../Components/ReviewHome'
import PinterestGrid from '../Components/PinterestGrid'
import NavbarNew from '../Components/NavbarNew'
import Description from '../Components/Description'
import { motion,useInView } from 'framer-motion'
import OneCatoegoryProducts from '../Components/OneCatoegoryProducts'
import PopularProducts from '../Components/PopularProducts'
import Faq from '../Components/Faq'
import HomePageCustomDesign from '../Components/HomePageCustomDesign'
import Footer from '../Components/Footer'
import TimeLine from '../Components/TimeLine'

function Home() {
 
  const ref=useRef(null)
  const isInView=useInView(ref,{once : false})
  useEffect(()=>{ 
    console.log(isInView) 
  },[])
  return (
    <div >
      <motion.div 
      initial ={{y:-75}}
       animate={{y: 0}}
       transition={{duration :0.5 , delay : 0.5}}
      > <NavbarNew> </NavbarNew> </motion.div>
     
       <motion.div 
        variants={{
          "hidden" : {opacity:  0 ,y:75},
          "visible" : {opacity : 1 , y :0}
        }}
        ref={ref}
        initial ="hidden" 
        animate={isInView ? 'visible' : "hidden "} 
        transition={{duration :0.5 , delay : 0.5}}
       >

     <HomePageCustomDesign/>
        
    
      {/*} <Carsoulmui></Carsoulmui> */}
      
      <PinterestGrid></PinterestGrid>
      <TimeLine/>
       <OneCatoegoryProducts/> 
       
       <PopularProducts/>
       {/*<Description/> */}
       
       <Faq/>
       {/*<ReviewHome> </ReviewHome> */}
       </motion.div>
       <Footer/> 
    </div>
  )
}

export default Home
