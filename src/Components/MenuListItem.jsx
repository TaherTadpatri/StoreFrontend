import React from 'react'
import { ListItem, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
function MenuListItem({ label, path, subItems, open, setOpen }) {
    const handleClick = () => {
        setOpen((prevOpen) => !prevOpen);
      };
  return (
    <div>
         <ListItemButton onClick={handleClick} sx={{ width: '100%' }}>
        <ListItemText primary={label} />
        {subItems.length > 0 ? (open ? <ExpandLess /> : <ExpandMore />) : null}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {subItems.map((item) => (
          <NestedMenuItem key={item.label} {...item} />
        ))}
      </Collapse>
    </div>
  )
}

export default MenuListItem
