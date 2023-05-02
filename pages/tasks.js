import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import {
  Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';

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

  const handleNewTask = async (e) => {
    e.preventDefault(); // prevent page refresh
    const newTask = {
      title: e.target.title.value,
      description: e.target.description.value,
      dueDate: e.target.dueDate.value,
    };

    try {
      const res = await fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });
      const data = await res.json();
      console.log(data);
      setTasks([...tasks, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const newTasks = tasks.filter((task) => task._id !== id);
      setTasks(newTasks);
    } catch (error) {
      console.error(error);
    }
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
          name="title"
          id="title"
          placeholder="Task title"
          size="small"
          fullWidth
        />
        <TextField
          variant="outlined"
          name="description"
          id="description"
          placeholder="Task description"
          size="small"
          fullWidth
        />
        <TextField
          variant="outlined"
          name="dueDate"
          id="dueDate"
          type="date"
          placeholder="Due date"
          size="small"
          fullWidth
        />
        <Button type="submit" color="primary" sx={{ mt: 1 }}>Create Task</Button>
      </form>
      <List sx={{ mt: 2 }}>
        {tasks.map((task) => (
          <ListItem key={task._id}>
            <ListItemText
              primary={task.title}
              secondary={(
                <>
                  {task.description}
                  {task.dueDate
                    ? (
                      <span style={{
                        display: 'flex', alignItems: 'center', gap: '4px', paddingTop: '5px',
                      }}
                      >
                        <EventIcon />
                        {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                      </span>
                    )
                    : null}
                </>
              )}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task._id)}>
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
