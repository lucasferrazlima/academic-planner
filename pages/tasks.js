import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import {
  Button, Box, Checkbox, TextField, LinearProgress, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';

const baseUrl = 'http://localhost:3001/api';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [completeTasks, setCompleteTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showAddButton, setShowAddButton] = useState(true);

  // State to hold selected task info (for edit task page)
  const [selectedTask, setSelectedTask] = useState(null);

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
      const newCompleteTasks = completeTasks.filter((task) => task._id !== id);
      setCompleteTasks(newCompleteTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTask = (taskId) => {
    const task = tasks.find((task) => task._id === taskId);
    setSelectedTask(task);
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

  const handleShowForm = () => {
    setShowForm(true);
    setShowAddButton(false);
    console.log(showAddButton);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowAddButton(true);
  };

  return (
    <Box>
      <Box
        maxWidth="600px"
        margin="auto"
      >

        <LinearProgress
          variant="determinate"
          value={-10}
          sx={{
            maxWidth: '600px',
            margin: 'auto',
            marginTop: 1,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#494368',
            },
          }}
        />
        <Typography
          variant="h4"
          gutterBottom
          fontFamily="Konkhmer Sleokchher"
          sx={{
            textAlign: 'center',
            marginTop: '20px',
            marginBottom: '20px',
            color: '#494368',
          }}
        >
          My tasks
        </Typography>
        {showAddButton && (
        <Button
          onClick={handleShowForm}
          disableRipple
          sx={{
            margin: 'auto',
            display: 'flex',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <AddCircleIcon
            sx={{
              color: '#494368',
              fontSize: '80px',
              '&:hover': {
                scale: '1.1',
              },
            }}
          />
        </Button>
        )}
        {showForm && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '10px',
            padding: '20px 40px 20px 40px',
            margin: 'auto',
            marginTop: '20px',
            marginBottom: '20px',
            marginLeft: '20px',
            marginRight: '20px',
          }}
        >
          <Button
            onClick={handleCloseForm}
            disableRipple
            sx={{
              position: 'absolute',
              top: { xs: '5px', md: '5px' },
              right: { xs: '-5px', md: '-5px' },
              color: '#494368',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <CloseIcon />
          </Button>
          <form
            onSubmit={handleNewTask}
            style={{
              display: 'flex', flexDirection: 'column', gap: '5px', width: '100%',
            }}
          >
            <TextField
              variant="standard"
              name="title"
              id="title"
              label="Title"
              required
              size="small"
              fontFamily="Poppins"
              sx={{
                color: '#494368',
              }}
            />
            <TextField
              variant="standard"
              name="description"
              id="description"
              label="Description"
              multiline
              size="small"
              fontFamily="Poppins"
              sx={{
                color: '#494368',
              }}
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
            <Button
              type="submit"
              color="primary"
              variant="contained"
              sx={{
                mt: 1,
                width: { xs: '60%', md: '40%' },
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '15px',
                backgroundColor: '#494368',
                '&:hover': {
                  backgroundColor: '#332f49',
                },
              }}
            >
              Create Task
            </Button>
          </form>
        </Box>
        )}
        <List sx={{ mt: 2, marginLeft: '10px', marginRight: '10px' }}>
          {tasks.map((task) => (
            <ListItem
              key={task._id}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                border: '2px solid #494368',
                padding: '10px',
                marginBottom: '10px',
                fontFamily: 'Poppins',
              }}
            >
              <Checkbox
                sx={{
                  color: '#494368',
                  '&.Mui-checked': {
                    color: '#494368',
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
                onChange={() => handleCheckTask(task)}

              />
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
                <IconButton
                  edge="end"
                  aria-label="edit"
                  disableRipple
                  onClick={() => handleEditTask(task._id)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <EditIcon
                    sx={{
                      color: '#494368',
                      '&:hover': {
                        scale: '1.1',
                      },
                    }}
                  />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  disableRipple
                  onClick={() => handleDeleteTask(task._id)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <DeleteIcon
                    sx={{
                      color: '#494368',
                      '&:hover': {
                        scale: '1.1',
                      },
                    }}
                  />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
      <div style={{
        marginTop: '20px', backgroundColor: 'rgba(255, 255, 255, 0.5)',
      }}
      >
        <Typography
          variant="h6"
          component="h1"
          gutterBottom
          maxWidth="600px"
          margin="auto"
          fontFamily="Konkhmer Sleokchher"
          padding="10px"
          paddingTop="30px"
        >
          Completed tasks

        </Typography>
        <List
          sx={{
            mt: 2,
            maxWidth: '600px',
            margin: 'auto',

          }}

        >
          {completeTasks.map((task) => (
            <ListItem
              key={task._id}
              sx={{
                borderBottom: '1px solid #494368',
                padding: '10px',
                marginBottom: '10px',
                fontFamily: 'Poppins',
              }}
            >
              <Checkbox
                checked
                sx={{
                  color: '#494368',
                  '&.Mui-checked': {
                    color: '#494368',
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
                onChange={() => handleUncheckTask(task)}
              />
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
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteTask(task._id)}
                  disableRipple
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <DeleteIcon
                    sx={{
                      color: '#494368',
                      '&:hover': {
                        scale: '1.1',
                      },
                    }}
                  />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </Box>
  );
}

export default TasksPage;
