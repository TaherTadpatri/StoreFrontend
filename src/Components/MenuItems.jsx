import React from 'react'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { List,ListItem,ListItemIcon,Collapse,ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'
import { useState } from 'react'
function MenuItems({menuItems}) {
    const [openSubmenu, setOpenSubmenu] = useState(null); // Track open submenu
  console.log(menuItems)
  const handleClick = (item) => {
    setOpenSubmenu(openSubmenu === item ? null : item);
  };
   
  return (
    <div>
        <List>
          {menuItems.map((item) => (
            <React.Fragment key={item.label}>
              {item.subItems ? ( 
                <>
                  <ListItem button onClick={() => handleClick(item.label)}>
                  <ListItemText primary={item.label} sx={{backgroundColor:'primary' }} />
                    <ListItemIcon>
                      {openSubmenu === item.label ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItemIcon>
                    
                  </ListItem>
                  <Collapse
                    in={openSubmenu === item.label}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => (
                        <ListItem
                          button
                          key={subItem.label}
                          component={Link}
                          to={subItem.path}
                        >
                          <ListItemText primary={subItem.label} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                // No subItems, render a simple list item
                <ListItem
                  button
                  component={Link}
                  to={item.path}
                  key={item.label}
                >
                  <ListItemText primary={item.label} />
                </ListItem>
              )}
            </React.Fragment>
          ))}
        </List>
    </div>
  )
}

export default MenuItems
