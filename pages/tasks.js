import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import {
  Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const baseUrl = 'http://localhost:3001/api';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenUser = localStorage.getItem('token');
    setToken(tokenUser);
    const user = jwt.decode(tokenUser);
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!token) return;
        const res = await fetch(`${baseUrl}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [token]);

  const handleNewTask = (e) => {
    e.preventDefault(); // prevent page refresh
    setTasks([...tasks, e.target.task.value]); // add new task to tasks
    e.target.reset();
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1); // remove 1 item at index
    setTasks(newTasks);
  };

  const handleEditTask = (taskId) => {
    router.push(`/test/${taskId}`);
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>My tasks</Typography>
      <form onSubmit={handleNewTask}>
        <TextField
          variant="outlined"
          name="task"
          id="task"
          placeholder="Add task"
          size="small"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>Create Task</Button>
      </form>
      <List sx={{ mt: 2 }}>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText primary={task.title} secondary={task.description} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default TasksPage;
