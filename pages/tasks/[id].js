import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import {
  Button, Checkbox, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import EditIcon from '@mui/icons-material/Edit';

const baseUrl = 'http://localhost:3001/api';

function TaskPage() {
  const router = useRouter();
  const { id } = router.query;

  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenUser = localStorage.getItem('token');
    setToken(tokenUser);
    const user = jwt.decode(tokenUser);
  }, []);

  const handleEditTask = async (e) => {
    e.preventDefault();
    const editedTask = {
      title: e.target.title.value,
      description: e.target.description.value,
      dueDate: e.target.dueDate.value,
    };
    try {
      const res = await fetch(`${baseUrl}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedTask),
      });
      const data = await res.json();
      router.push('/tasks');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>My tasks</Typography>
      <form
        onSubmit={handleEditTask}
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
        />
        <Button type="submit" color="primary" variant="contained" sx={{ mt: 1 }}>Create Task</Button>
      </form>
    </div>
  );
}

export default TaskPage;
