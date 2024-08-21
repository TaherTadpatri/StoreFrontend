import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Drawer from "@mui/material/Drawer";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Box, Grid, ListItemButton, Menu } from "@mui/material";

import { Link } from "@mui/material";
import logo from "/studioframe.png";
import { Badge } from "@mui/material";
import { Collapse } from "@mui/material";
import MenuItems from "./MenuItems";
import SearchComp from "./SearchComp";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { MenuItem } from "@mui/material";
import AuthContext from "./Context/AuthContext";
import cartContext from "./Cart/CartContext";
import MenuListItem from "./MenuListItem";

const NavbarNew = () => {
  const { cart } = useContext(cartContext);
  const [islogedin, setloggedIn] = useState(false);
  const { user, authToken, logoutUser } = useContext(AuthContext);
  useEffect(() => {
    if (user) setloggedIn(true);
    else setloggedIn(false);
  }, []);

  const styles = {
    appBar: {
      backgroundColor: "white",
      marginTop: "0px",
      fontSize: "1rem",
      width: "100%",
      paddding: "0px",
      color: "black",
    },
    icons: {
      color: "#FEFBF6",
      fontSize: "1rem",
    },
  };
  const handleuserlogin = () => {
    navigate("/Login");
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchbtn, setsearch] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchClose = () => {
    setsearch(false);
  };
  const handleSearchOpen = () => {
    setsearch(!searchbtn);
  };
  const [logoutloading, setlogoutloading] = useState(false);
  const menuItems = [
    { label: "Home", path: "/" },
    {
      label: "Catogery",
      path: "/Catogery",
      subItems: [
        { label: "shop by catogery", path: "/shopbycatogery" },
        { label: "shop by event", path: "/shopbyevent" },
      ],
    },
    { label: "About", path: "/About" },
    { label: "Contact us", path: "/Contact" },
    { label: "Signup", path: "/Signup" },
  ];
  const logout = () => {
    setlogoutloading(true);
    logoutUser();
    setlogoutloading(false);
    handleClose();
    setloggedIn(false);
    navigate("/");
  };
  // ... other component logic if needed
  const navigate = useNavigate();
  return (
    <>
      {searchbtn && (
        <SearchComp
          searchbtn={searchbtn}
          handleSearch={handleSearchClose}
        ></SearchComp>
      )}
      <AppBar position="sticky" sx={styles.appBar}>
        <Toolbar
          sx={{
            display: { xs: "flex", md: "flex" },
            justifyContent: "space-between",
          }}
        >
          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

        
          <Grid
           
            noWrap
         
            sx={{
              display: "flex",
              justifyContent: "center",
              flexGrow: { xs: 1, md: 0 },
              alignItems: "center",
              width: { xs: "100%", md: "unset" },
              
            }}
          >
            <img
              src={logo}
              alt="logo"
              width="50%"
              height="auto"
              
              onClick={() => navigate("/")}
            />
            
          </Grid>

          {/* Desktop Menu Items */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {menuItems.map((item) => (
              {/* <ListItem key={item.label} sx={{width : '100%'}}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  key={item.label}
                >
                  <ListItemText primary={item.label}></ListItemText>
                </ListItemButton>
              </ListItem>
            ))} */}
            <item.subItems?.length > 0 ? (
              <MenuListItem key={item.label} {...item} />
            ) : (
              <ListItem key={item.label} sx={{ width: '100%' }}>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            )
          ))}
          </Box>

          {/* Search, Cart, and Profile Icons (right-aligned on both mobile and desktop) */}
          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <IconButton
              color="inherit"
              onClick={() => {
                handleSearchOpen();
              }}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => {
                navigate("/Cart");
              }}
            >
              <ShoppingCartIcon />
              {cart.length > 1 && <Badge> </Badge>}
            </IconButton>
            <IconButton
              color="inherit"
              id="menu-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              arai-expand={open ? "true" : undefined}
              onClick={islogedin ? handleClick : handleuserlogin}
            >
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        id="menu-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
        <MenuItem onClick={() => navigate("/orders")}>Orders</MenuItem>
        <MenuItem onClick={() => logout()}>
          {logoutloading ? "loading..." : "logout"}{" "}
        </MenuItem>
      </Menu>
      <Drawer
        variant="temporary"
        anchor="bottom"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ width: { xs: "100%", sm: "unset", height: "100vh" } }}
      >
        <MenuItems menuItems={menuItems}> </MenuItems>
      </Drawer>
    </>
  );
};

export default NavbarNew;
