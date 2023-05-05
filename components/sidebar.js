import React, { useState } from 'react';
import {
  SwipeableDrawer, List, ListItem, ListItemText, Button,
} from '@mui/material';
import TaskIcon from '@mui/icons-material/Task';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function CustomDrawer(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  const list = (
    <List>
      <ListItem
        button
        onClick={() => {
          props.router.push('/tasks');
        }}
      >
        <TaskIcon />
        <ListItemText primary="Tasks" />
      </ListItem>
      <ListItem button onClick={() => props.router.push('/timer')}>
        <AccessTimeIcon />
        <ListItemText primary="Timer" />
      </ListItem>
    </List>
  );

  return (
    <>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list}
      </SwipeableDrawer>
      <Button onClick={toggleDrawer(true)}>Menu</Button>
    </>
  );
}

export default CustomDrawer;
