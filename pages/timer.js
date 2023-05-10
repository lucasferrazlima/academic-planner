import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import SettingsIcon from '@mui/icons-material/Settings';
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

  // handle when timer is reset
  const handleReset = () => {
    setTimerOn(false);
    setTimerMode('focus');
    setTimerColor('green');
    setTimerText('Get to work!');
    setTimer(focusTime * 60);
    setFocusTimeLeft(focusTime * 60);
    setBreakTimeLeft(breakTime * 60);
    setRoundsLeft(rounds);
    setTimePercent(0);
    setSessionComplete(false);
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
          setRoundsLeft((prevRoundsLeft) => prevRoundsLeft - 1);
          setTimePercent(0);
        } else if (timerMode === 'break' && breakTimeLeft === 0) {
          setTimerMode('focus');
          setTimerColor('green');
          setTimerText('Focus Time!');
          setFocusTimeLeft(focusTime * 60);
          setTimePercent(0);
        }
      }, 1000);

      if (roundsLeft === 0) {
        setSessionComplete(true);
        handleReset();
      }

      return () => clearInterval(timerInterval);
    }
  }, [timerOn, timerMode, focusTimeLeft, breakTimeLeft]);

  const formatTime = (timeSeconds) => {
    const minutes = Math.floor(timeSeconds / 60);
    const seconds = timeSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    setTimerColor(!timerOn ? '#494368' : (timerMode === 'focus' ? '#DF2935' : '#3692D3'));
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

        <Typography variant="h6" gutterBottom fontFamily="Konkhmer Sleokchher" sx={{ color: timerColor }}>
          {!timerOn ? 'Start your session' : (timerMode === 'focus' ? 'Focus Time!' : 'Take a Break!')}
        </Typography>
        <Typography
          variant="h1"
          color="#494368"
          fontFamily="Konkhmer Sleokchher"
        >
          {timerText}
        </Typography>
        <Typography variant="h7" gutterBottom>
          {roundsLeft === 1 ? `${roundsLeft} round left in session` : `${roundsLeft} rounds left in session`}
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <Button
            variant="contained"
            onClick={handleStart}
            disabled={timerOn || sessionComplete}
            size="large"
            sx={{
              backgroundColor: '#494368',
              '&:hover': {
                backgroundColor: '#332f49',
              },
            }}
          >
            Start
          </Button>
          <Button
            variant="contained"
            onClick={handlePause}
            disabled={!timerOn || sessionComplete}
            sx={{
              backgroundColor: '#494368',
              '&:hover': {
                backgroundColor: '#332f49',
              },
            }}
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
        <Button
          edge="end"
          color="primary"
          onClick={handleSettingsClick}
        >
          Settings
        </Button>
      </Box>

      <div style={{
        marginTop: '20px', backgroundColor: 'rgba(255, 255, 255, 0.5)', marginLeft: '-8px', marginRight: '-8px', marginBottom: '-8px',
      }}
      >

        <Typography
          variant="body1"
          fontFamily="Poppins"
          sx={{
            color: '#494368', textAlign: 'center', maxWidth: '550px', margin: 'auto', marginTop: '40px', padding: '20px',
          }}
        >
          Our timer is based on the
          {' '}
          <span style={{ color: '#332f49', fontWeight: 'bold' }}>Pomodoro Technique</span>
          , a time management method developed by Francesco Cirillo in the late 1980s.
          <br />
          <br />
          The technique involves breaking work into intervals, usually 25 minutes in length, separated by short breaks.
          <br />
          <br />
          Each interval is known as a "
          <span style={{ color: '#332f49', fontWeight: 'bold' }}>pomodoro</span>
          ," the plural in English of the Italian word pomodoro (tomato), after the tomato-shaped kitchen timer that Cirillo used as a university student.
          <br />
          <br />
          The method is based on the idea that frequent breaks can improve mental agility. It aims to reduce the impact of internal and external interruptions on focus and flow.
          <br />
          <br />
          The Pomodoro Technique has been shown to increase productivity and reduce burnout. Give it a try and see how it works for you!
        </Typography>
      </div>
    </div>
  );
}

export default TimerPage;
