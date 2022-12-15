import React, { useEffect, useState, useRef } from 'react';

import NumberPad from './NumberPad';
import useHttpRequest from '../../hook/use-http';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import ContainerUI from '../UI/ContainerUI';
import AnswerForm from './AnswerForm';

const FrontendExam = () => {
  
  const length = 5;
  const inputRef = useRef();

  const [exam, setExam] = useState('');
  const [answerList, setAnswerList] = useState(Array(length).fill(''));
  const [questionIdx, setQuestionIdx] = useState(0);
  const { sendGetRequest } = useHttpRequest();

  const changeIdxHandler = index => {
    setQuestionIdx(index);
    inputRef.current.value = answerList[index] || '';
  };

  //   const submitHandler = async () => {
  //     if (window.confirm('답안을 제출하시겠습니까?')) {
  //       const bodyData = {
  //         examId: examId,
  //         memberId: memberId,
  //         answers: answers
  //         content: answerRef.current.value.slice(0, 50),
  //       };
  //       const response = await fetch(`http://52.202.27.18:8080//exam`, {
  //         method: 'POST',
  //         body: JSON.stringify(bodyData),
  //         headers: {
  //           'Content-Type': 'application/json',
  //           accessToken: authCtx.token,
  //           refreshToken: authCtx.refreshToken,
  //         },
  //       });
  //       if (!response.ok) {
  //         alert('오류가 발생했습니다. 다시 시도해주세요!');
  //         return;
  //       }
  //       navigate('/test');
  //       return;
  //     }
  //   };

  useEffect(() => {
    const examHandler = data => {
      setExam(data.data);
    };
    sendGetRequest(`/exam/kit/1`, examHandler); // TODO 이것 연동!!
  }, [sendGetRequest]);

  const submitHandler = async () => {
    const inputText = inputRef.current.value;
    setAnswerList(prevAnswers => {
      prevAnswers[questionIdx] = inputText;
      return prevAnswers;
    });
    inputRef.current.value = '';
    setQuestionIdx(Math.min(questionIdx + 1, length - 1));
    console.log(answerList);
    checkDone(answerList);
    // Optimization : let's make useReducer!!
  };

  const checkDone = answerList => {
    if (answerList.filter(i => i.trim().length > 0).length !== length) {
      return 0;
    }
    if (window.confirm('모든 문제가 완료되었습니다! 제출하시겠습니까?')) {
      console.log('submit');
    }
  };

  return (
    <ContainerUI>
      <NumberPad
        answerList={answerList.map(i => i.length > 0)}
        questionIdx={questionIdx}
        changeIdxHandler={changeIdxHandler}
        length={length}
      />
      <Box marginTop={2}>
        {exam && (
          <Typography variant="h4" gutterBottom>
            #{questionIdx + 1}
          </Typography>
        )}
      </Box>
      <Box padding={2}>
        <Divider sx={{ borderColor: 'black', display: { xs: 'block', md: 'none' } }} />
        <AnswerForm inputRef={inputRef} />
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={submitHandler} m={1}>
            제출하기
          </Button>
        </Stack>
      </Box>
    </ContainerUI>
  );
};

export default FrontendExam;
