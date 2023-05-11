import Link from 'next/link';
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function IndexPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleRegister = () => {
    router.push('/register');
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

      <Typography
        variant="h5"
        fontFamily="Konkhmer Sleokchher"
        sx={{
          margin: 'auto', marginTop: 5,
        }}
      >
        Welcome to our
        {' '}
        <span style={{ color: '#D04EA4' }}>
          student helper
          {' '}
        </span>
        app
      </Typography>

      <Typography
        variant="body1"
        fontFamily="Poppins"
        sx={{
          margin: 'auto', marginTop: 3, maxWidth: '600px', textAlign: 'center',
        }}
      >
        Our goal is to
        {' '}
        <span style={{ color: '#D04EA4', fontWeight: 'bold' }}>
          simplify
          {' '}
        </span>
        {' '}
        and
        <span style={{ color: '#D04EA4', fontWeight: 'bold' }}>
          {' '}
          organize
          {' '}
        </span>
        your student life with tools and resources to help you succeed academically. Our app is constantly evolving with new features to maximize your investment in education.
      </Typography>
      <Typography
        variant="body1"
        fontFamily="Poppins"
        sx={{ marginTop: 3, maxWidth: '600px', textAlign: 'center' }}
      >
        Thank you for choosing our app and let us help you excel in your academic journey!
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            marginTop: 5,
            backgroundColor: '#494368',
            '&:hover': {
              backgroundColor: '#332f49',
            },
          }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          onClick={handleRegister}
          sx={{
            marginTop: 5,
            marginLeft: 5,
            backgroundColor: '#494368',
            '&:hover': {
              backgroundColor: '#332f49',
            },
          }}
        >
          Register
        </Button>
      </Box>

    </Box>
  );
}
