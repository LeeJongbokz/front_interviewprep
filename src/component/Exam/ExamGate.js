import { Button, Typography, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import ContainerUI from '../UI/ContainerUI';
import ExamSection from './ExamSection';

const ExamGate = () => {
  const [examStart, setExamStart] = useState(0);

  useEffect(() => {
    const storedExamStart = + localStorage.getItem("exam");

    if(storedExamStart>0){    
      const spentSec = Math.floor((+new Date() - storedExamStart)/1000);
      if(spentSec > 660){
        localStorage.removeItem("exam");      
        setExamStart(-1);
      } else {
        setExamStart(storedExamStart)
      }
    } else {
      setExamStart(-1);
    }
  }, []);

  const openHandler = () => {
    setExamStart(+Date.now());
    localStorage.setItem("exam", Date.now());
  };

  return (
    <ContainerUI>
      {examStart > 0 && <ExamSection examStart={examStart} />}
      {examStart < 0 && (
        <Box align="center">
          <Typography variant="h4" marginTop={5} marginBottom={5}>테스트를 시작합니다.</Typography>
          <Button variant="contained" onClick={openHandler}>
            시작
          </Button>
        </Box>
      )}
    </ContainerUI>
  );
};

export default ExamGate;
