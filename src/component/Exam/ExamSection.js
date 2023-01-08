import React, { useEffect, useState, useRef } from 'react';

import NumberPad from './NumberPad';
import useHttpRequest from '../../hook/use-http';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import ContainerUI from '../UI/ContainerUI';
import AnswerForm from './AnswerForm';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';
import Timer from './Timer';

const ExamSection = ({ examStart }) => {
  const inputRef = useRef();
  const spentSec = Math.floor((+new Date() - examStart) / 1000);

  const { examId } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [length, setLength] = useState(0);
  const { isLoading, sendGetRequest, sendPostRequest } = useHttpRequest(true);

  const changeIdxHandler = index => {
    setQuestionIdx(index);
    inputRef.current.value = exam[index]?.content || '';
  };

  useEffect(() => {
    const examHandler = data => {
      if (data.success) {
        setExam(
          data.data.questions.map(i => {
            return { questionid: i.id, title: i.title, content: '' };
          })
        );
        setLength(data.data.questions.length);
      }
    };
    sendGetRequest(`/exam/kit/${examId}`, examHandler); // TODO 이것 연동!!
  }, [sendGetRequest, examId]);

  const submitHandler = async () => {
    const inputText = inputRef.current.value;
    setExam(prevState => {
      prevState[questionIdx].content = inputText;
      return prevState;
    });

    setQuestionIdx(prevIdx => {
      if (prevIdx !== length - 1) {
        inputRef.current.value = '';
      }
      return Math.min(prevIdx + 1, length - 1);
    });

    // Optimization : let's make useReducer!!
  };

  const submitExam = () => {
    // if (exam.filter(i => i.content.trim().length > 0).length !== length) {
    //   return 0;
    // }
    if (window.confirm('모의고사 답변을 제출하시겠습니까?')) {
      const submitCallback = () => {
        navigate('/exam/');
      };
      const data = exam.map(i => {
        return { questionId: i.questionid, content: i.content };
      });

      sendPostRequest(
        {
          endpoint: `/exam/kit/${examId}`,
          bodyData: data,
        },
        submitCallback
      );
    }
  };

  return (
    <ContainerUI>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Timer initSeconds={Math.max(600 - spentSec, 0)} />
          <Box padding={2}>
            {exam.length > 0 && (
              <>
                <Typography variant="h4" gutterBottom>
                  #{questionIdx + 1}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {exam[questionIdx].title}
                </Typography>
              </>
            )}
          </Box>
          <Box padding={2}>
            <AnswerForm inputRef={inputRef} />
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" onClick={submitHandler} m={1}>
                저장
              </Button>
            </Stack>
          </Box>
          <Divider />
          <NumberPad
            answerList={exam}
            questionIdx={questionIdx}
            changeIdxHandler={changeIdxHandler}
            length={length}
          />
          <Box>
            <Button sx={{ marginLeft: 1 }} onClick={submitExam} variant="contained">
              최종제출
            </Button>
          </Box>
        </>
      )}
    </ContainerUI>
  );
};

export default ExamSection;
