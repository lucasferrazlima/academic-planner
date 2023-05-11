import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import {
  Button, Box, TextField, Typography,
} from '@mui/material';

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
    <Box
      maxWidth="550px"
      margin="auto"
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
      }}

    >
      <Typography variant="h4" component="h1" gutterBottom>Edit Task</Typography>
      <form
        onSubmit={handleEditTask}
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
        <Button
          type="submit"
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
  );
}

export default TaskPage;
