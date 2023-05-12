import React, { useState } from 'react';
import router from 'next/router';
import { Box, Button } from '@mui/material';

const baseUrl = 'http://localhost:3001/api';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        body: JSON.stringify({
          name, username, email, password,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      localStorage.setItem('token', data.token);

      if (res.status === 201) {
        router.push('/tasks');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
      margin: 'auto',
      marginTop: 5,
      maxWidth: 600,
      textAlign: 'center',

    }}
    >
      <img
        src="./images/logo.svg"
        alt="Logo"
        style={{
          maxWidth: 300,
          margin: 'auto',
          borderBottom: '4px solid #e0e0e0',
          paddingBottom: 40,
          textAlign: 'center',
        }}
      />
      <h1>Registration</h1>
      <form
        onSubmit={handleRegister}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 5,
          margin: 'auto',
          marginTop: 5,
          maxWidth: 600,
          textAlign: 'center',
        }}
      >
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{
            mt: 1,
            width: { xs: '60%', md: '50%' },
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '15px',
            backgroundColor: '#494368',
            '&:hover': {
              backgroundColor: '#332f49',
            },
          }}
        >
          Register
        </Button>
      </form>
    </Box>
  );
}

export default LoginPage;
