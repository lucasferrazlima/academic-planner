import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import TimerSettings from '../components/timerSettings';

function TimerPage() {
  const router = useRouter();
  const [rounds, setRounds] = useState(4); // number of rounds in a session
  const [focusTime, setFocusTime] = useState(25); // focus time of the timer in minutes
  const [breakTime, setBreakTime] = useState(5); // break time of the timer in minutes
  const [timer, setTimer] = useState(focusTime * 60); // timer in seconds
  const [timerOn, setTimerOn] = useState(false); // timer on/off
  const [timerMode, setTimerMode] = useState('focus'); // timer mode: focus/break
  const [roundsLeft, setRoundsLeft] = useState(rounds); // rounds left in the session
  const [focusTimeLeft, setFocusTimeLeft] = useState(focusTime * 60); // focus time left in seconds
  const [breakTimeLeft, setBreakTimeLeft] = useState(breakTime * 60); // break time left in seconds
  const [timerText, setTimerText] = useState(''); // text to display on the timer
  const [timerColor, setTimerColor] = useState(''); // color of the timer text
  const [sessionComplete, setSessionComplete] = useState(false); // session complete flag
  const [timePercent, setTimePercent] = useState(0); // percent of time gone in the timer
  const [showSettings, setShowSettings] = useState(false);

  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenUser = localStorage.getItem('token');
    setToken(tokenUser);
  }, []);

  const handleStart = () => {
    setTimerOn(true);
  };

  const handlePause = () => {
    setTimerOn(false);
  };

  // handle when values are changed in settings
  useEffect(() => {
    setTimer(focusTime * 60);
    setFocusTimeLeft(focusTime * 60);
    setBreakTimeLeft(breakTime * 60);
    setRoundsLeft(rounds);
    setTimePercent(0);
  }, [focusTime, breakTime, rounds]);

  useEffect(() => {
    if (timerOn) {
      const timerInterval = setInterval(() => {
        if (timerMode === 'focus') {
          setFocusTimeLeft((prevFocusTimeLeft) => prevFocusTimeLeft - 1);
          setTimePercent((prevTimePercent) => prevTimePercent + (100 / (focusTime * 60)));
        } else {
          setBreakTimeLeft((prevBreakTimeLeft) => prevBreakTimeLeft - 1);
          setTimePercent((prevTimePercent) => prevTimePercent + (100 / (breakTime * 60)));
        }

        if (timerMode === 'focus' && focusTimeLeft === 0) {
          setTimerMode('break');
          setTimerColor('red');
          setTimerText('Break Time!');
          setBreakTimeLeft(breakTime * 60);
        } else if (timerMode === 'break' && breakTimeLeft === 0) {
          setTimerMode('focus');
          setTimerColor('green');
          setTimerText('Focus Time!');
          setRoundsLeft((prevRoundsLeft) => prevRoundsLeft - 1);
          setFocusTimeLeft(focusTime * 60);
        }
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [timerOn, timerMode, focusTimeLeft, breakTimeLeft]);

  const formatTime = (timeSeconds) => {
    const minutes = Math.floor(timeSeconds / 60);
    const seconds = timeSeconds % 60;

    return `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (timerMode === 'focus') {
      setTimerText(formatTime(focusTimeLeft));
    } else {
      setTimerText(formatTime(breakTimeLeft));
    }
  }, [timerOn, timerMode, focusTimeLeft, breakTimeLeft, timer]);

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div>
      <LinearProgress
        variant="determinate"
        value={timePercent}
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '450px',
          maxHeight: '250px',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '10px',
          padding: '20px',
          margin: 'auto',
          marginTop: '20px',
        }}
      >
        <Button edge="end" color="primary" onClick={handleSettingsClick}>
          <SettingsApplicationsIcon />
        </Button>
        <Typography variant="h3" color="black" gutterBottom>
          Timer
        </Typography>

        <Typography variant="h5" gutterBottom>
          {timerText}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {timerMode === 'focus' ? 'Focus Time!' : 'Break Time!'}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {roundsLeft === 0 ? 'Session Complete!' : `${roundsLeft} Rounds Left`}
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStart}
            disabled={timerOn || sessionComplete}
          >
            Start
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePause}
            disabled={!timerOn || sessionComplete}
          >
            Pause
          </Button>
        </div>
        {showSettings
        && (
        <TimerSettings
          rounds={rounds}
          setRounds={setRounds}
          focusTime={focusTime}
          setFocusTime={setFocusTime}
          breakTime={breakTime}
          setBreakTime={setBreakTime}
        />
        )}
      </Box>
    </div>
  );
}

export default TimerPage;
