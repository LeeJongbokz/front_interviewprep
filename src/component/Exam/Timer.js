import { Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';

const Timer = ({ initSeconds = 600 }) => {
  const [leftSeconds, setLeftSeconds] = useState(initSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftSeconds(prevSeconds => {
        if (prevSeconds === 0) {
          console.log('TIMEs UP!');
          clearInterval(interval);
          return 0;
        }
        const nextSeconds = Math.max(prevSeconds - 1, 0);
        return nextSeconds;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [leftSeconds]);

  const divValueAndRest = (main, by) => {
    const value = Math.floor(main / by);
    const rest = main % by;
    return [value, rest];
  };

  const fillTwoNumber = number => {
    return number.toString().padStart(2, '0');
  };

  const [minutes, seconds] = divValueAndRest(leftSeconds, 60);

  return (
    <Box component="div" sx={{ textAlign: 'center', width: '90%', margin: 2 }}>
      <Typography component="span" variant="h5">
        남은 시간 {fillTwoNumber(minutes)}:{fillTwoNumber(seconds)}
      </Typography>
    </Box>
  );
};

export default Timer;
