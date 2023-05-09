import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import {
  Button, Checkbox, TextField, LinearProgress, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import EditIcon from '@mui/icons-material/Edit';

const baseUrl = 'http://localhost:3001/api';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [completeTasks, setCompleteTasks] = useState([]);

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
        console.log(data);
        const incompleteTasks = data.filter((task) => !task.completed);
        const completeTasks = data.filter((task) => task.completed);
        setTasks(incompleteTasks);
        setCompleteTasks(completeTasks);
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

    console.log(newTask);

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
    router.push(`/tasks/${taskId}`);
  };

  const handleCheckTask = async (task) => {
    try {
      const res = await fetch(`${baseUrl}/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...task, completed: true }),
      });
      const data = await res.json();
      const newTasks = tasks.filter((task) => task._id !== data._id);
      setTasks(newTasks);
      setCompleteTasks([...completeTasks, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUncheckTask = async (task) => {
    try {
      const res = await fetch(`${baseUrl}/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...task, completed: false }),
      });
      const data = await res.json();
      const newTasks = completeTasks.filter((task) => task._id !== data._id);
      setCompleteTasks(newTasks);
      setTasks([...tasks, data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <LinearProgress
        variant="determinate"
        value={100}
        sx={{
          maxWidth: '600px',
          margin: 'auto',
          marginTop: 1,
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#494368',
          },
        }}
      />
      <Typography variant="h4" component="h1" gutterBottom>My tasks</Typography>
      <form
        onSubmit={handleNewTask}
        style={{
          display: 'flex', flexDirection: 'column', gap: '5px', maxWidth: '80%', margin: '0 auto',
        }}
      >
        <TextField
          variant="standard"
          name="title"
          id="title"
          label="Title"
          required
          size="small"
        />
        <TextField
          variant="standard"
          name="description"
          id="description"
          label="Description"
          multiline
          size="small"

        />
        <TextField
          variant="standard"
          name="dueDate"
          id="dueDate"
          type="date"
          label="Due date"
          size="small"
          InputLabelProps={{ shrink: true }}
          format="DD-MM-YYYY"
        />
        <Button type="submit" color="primary" variant="contained" sx={{ mt: 1 }}>Create Task</Button>
      </form>
      <List sx={{ mt: 2 }}>
        {tasks.map((task) => (
          <ListItem key={task._id}>
            <Checkbox onChange={() => handleCheckTask(task)} />
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
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )
                    : null}
                </>
              )}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEditTask(task._id)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Typography variant="h5" component="h1" gutterBottom>Completed tasks</Typography>
      <List sx={{ mt: 2 }}>
        {completeTasks.map((task) => (
          <ListItem key={task._id}>
            <Checkbox checked onChange={() => handleUncheckTask(task)} />
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
              style={{ textDecoration: 'line-through' }}
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
