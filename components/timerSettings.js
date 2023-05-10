import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function TimerSettings({
  rounds, setRounds, focusTime, setFocusTime, breakTime, setBreakTime,
}) {
  const handleRoundsChange = (event) => {
    setRounds(Number(event.target.value));
  };

  const handleFocusTimeChange = (event) => {
    setFocusTime(Number(event.target.value));
  };

  const handleBreakTimeChange = (event) => {
    setBreakTime(Number(event.target.value));
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      zIndex: 1,
      position: 'absolute',
      top: { xs: '100px', md: '150px' },
      padding: '20px',
      backgroundColor: '#f5f5f5',
      gap: '20px',
    }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
      >
        Settings
      </Typography>

      <TextField
        id="rounds"
        label="Rounds"
        type="number"
        value={rounds}
        onChange={handleRoundsChange}
      />
      <TextField
        id="focus-time"
        label="Focus Time (minutes)"
        type="number"
        value={focusTime}
        onChange={handleFocusTimeChange}
      />
      <TextField
        id="break-time"
        label="Break Time (minutes)"
        type="number"
        value={breakTime}
        onChange={handleBreakTimeChange}
      />
    </Box>

  );
}

export default TimerSettings;
