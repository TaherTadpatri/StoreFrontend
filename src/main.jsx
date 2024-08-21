import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import Signup from "./pages/Signup.jsx";
import Catogery from "./pages/Catogery.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Catogerypage from "./pages/Catogerypage.jsx";
import { AuthProvider } from "./Components/Context/AuthContext.jsx";
import { CartProvider } from "./Components/Cart/CartContext.jsx";
import Checkout from "./pages/Checkout.jsx";
import Forgotpassword from "./Components/Login/Forgotpassword.jsx";
import Search from "./pages/Search.jsx";
import Payment from "./pages/Payment.jsx";
import OrderSucess from "./pages/OrderSucess.jsx";
import Orders from "./pages/Orders.jsx";
import Contact from "./pages/Contact.jsx";
import Profile from "./pages/Profile.jsx";
import NavbarNew from "./Components/NavbarNew.jsx";
import Footer from "./Components/Footer.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Policy from "./pages/Policy.jsx";
import TernsAndCondition from "./Components/Policy/TernsAndCondition.jsx";
import RefundPolicy from "./Components/Policy/RefundPolicy.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", // Your primary color7469B6
    },
    secondary: {
      main: "#FFE6E6", // Your secondary color
    },
    typography: {
      h1: {
        fontSize: "2.5rem", // Customize heading styles
      },
      body1: {
        fontSize: "1rem", // Customize body text style
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/Login",
    element: <Login/>,
  },
  {
    path: "/forgotpassword",
    element: <Forgotpassword />,
  },
  {
    path: "/Cart",
    element: <PrivateRoute><Cart /></PrivateRoute> ,
  },
  {
    path: "catogery/:catogeryid/product/:productId",
    element: <ProductPage />,
  },
  {
    path: "catogery/:catogeryid",
    element: <Catogerypage />,
  },
  {
    path: "/checkout",
    element: <PrivateRoute> <Checkout /></PrivateRoute>,
  },
  {
    path: "/search/:searchquery",
    element: <Search />,
  },
  {
    path: "/product/:productId",
    element: <ProductPage />,
  },
  {
    path: "/shopbycatogery",
    element: <Catogery />,
  },
  {
    path: "/shopbyevent/",
    element: <Catogery />,
  },
  {
    path: "/payment",
    element: <PrivateRoute> <Payment /> </PrivateRoute>,
  },
  {
    path: "/ordersucessfull",
    element: <PrivateRoute>  <OrderSucess /></PrivateRoute>,
  },
  {
    path: "/orders",
    element:<PrivateRoute><Orders /></PrivateRoute> ,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/profile",
    element: <PrivateRoute><Profile/></PrivateRoute>,
  },
  {
    path : '/policy',
    element : <Policy/>, 
    children:[ 
      { 
        path : "termsandcondition",
        element : <TernsAndCondition/>
      },
      { 
        path : "Refundpolicy",
        element : <RefundPolicy/> 
      },
     
      
    ]
  },
  {
    path : "*",
    element : <PageNotFound/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router}>
          
          <Footer />
        </RouterProvider>
      </CartProvider>
    </AuthProvider>
  </ThemeProvider>
);
