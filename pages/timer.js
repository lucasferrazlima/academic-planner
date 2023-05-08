import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
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
  }, [focusTime, breakTime, rounds]);

  useEffect(() => {
    if (timerOn) {
      const timerInterval = setInterval(() => {
        if (timerMode === 'focus') {
          setFocusTimeLeft((prevFocusTimeLeft) => prevFocusTimeLeft - 1);
        } else {
          setBreakTimeLeft((prevBreakTimeLeft) => prevBreakTimeLeft - 1);
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          width: '50%',
          height: '50%',
          borderRadius: '10px',
          boxShadow: 3,
          padding: '20px',
          margin: 'auto',

        }}
      >
        <Button edge="end" color="primary" onClick={handleSettingsClick}>
          <SettingsApplicationsIcon />
        </Button>
        <Typography variant="h3" gutterBottom>
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
