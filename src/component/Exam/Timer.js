import { Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { THEME_COLOR } from '../../global_variables';

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
    <Box
      component="div"
      sx={{
        position: 'absolute',
        top: '65px',
        width : {
          xs : "80%",
          sm : "auto",
        },
        right: {
          sm : 0
        },
        padding: 2,
        marginRight: {
          sm : 1
        },
        border: 1,
        borderRadius: 3,
        textAlign: 'center',
        borderColor: THEME_COLOR,
        color: THEME_COLOR,
      }}
    >
      <Typography component="span" variant="h5">
        남은 시간 {fillTwoNumber(minutes)}:{fillTwoNumber(seconds)}
      </Typography>
    </Box>
  );
};

export default Timer;
