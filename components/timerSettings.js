import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

function TimerSettings({
  rounds, setRounds, focusTime, setFocusTime, breakTime, setBreakTime, isOpen, onClose,
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
    <Box>
      {isOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 2,
          }}
          onClick={onClose}
        />
      )}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '50px', md: '50px' },
          left: { xs: '30%', md: '50%' },
          transform: { xs: 'translateX(-21%)', md: 'translateX(-50%)' },
          padding: '20px',
          backgroundColor: '#f5f5f5',
          gap: '20px',
          zIndex: 3,
          display: isOpen ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '15px',
        }}
      >
        <Button
          onClick={onClose}
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
        <Typography
          variant="h6"
          component="h1"
          gutterBottom
          fontFamily="Poppins"
          sx={{
            color: '#494368',
          }}
        >
          Timer Settings
        </Typography>
        <TextField
          id="rounds"
          label="Rounds in a session"
          type="number"
          value={rounds}
          onChange={handleRoundsChange}
          InputLabelProps={{
            style: { color: '#494368' },
          }}
        />
        <Typography
          variant="body1"
          fontFamily="Poppins"
          fontSize="12px"
          sx={{
            alignSelf: 'flex-start',
          }}
        >
          For each round:
        </Typography>
        <TextField
          id="focus-time"
          label="Focus Time (minutes)"
          type="number"
          value={focusTime}
          onChange={handleFocusTimeChange}
          InputLabelProps={{
            style: { color: '#494368' },

          }}
        />
        <TextField
          id="break-time"
          label="Break Time (minutes)"
          type="number"
          value={breakTime}
          onChange={handleBreakTimeChange}
          InputLabelProps={{
            style: { color: '#494368' },

          }}
        />

      </Box>
    </Box>
  );
}

export default TimerSettings;
