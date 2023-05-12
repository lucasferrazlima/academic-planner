import React, { useState } from 'react';
import router from 'next/router';
import { Box, Button } from '@mui/material';
import DOMPurify from 'dompurify';

const baseUrl = 'http://localhost:3001/api';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        body: JSON.stringify({
          username: DOMPurify.sanitize(username),
          password: DOMPurify.sanitize(password),
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      localStorage.setItem('token', data.token);

      if (res.status === 200) {
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
      <h1>Login</h1>
      <form
        onSubmit={handleLogin}
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
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
          Login
        </Button>
      </form>
    </Box>
  );
}

export default LoginPage;
