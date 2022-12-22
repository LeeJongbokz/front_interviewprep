import { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

import useHttpRequest from '../../../../hook/use-http';

let savedQuestion = '';

const QuestionField = ({ questionId }) => {
  const [question, setQuestion] = useState('');
  const { sendGetRequest } = useHttpRequest();

  useEffect(() => {
    const questionHandler = data => {
      setQuestion(data.data.title);
      savedQuestion = data?.data?.title || "";
    };
    if (!savedQuestion) {
      sendGetRequest(`/question/single/${questionId}`, questionHandler);
    } else if (savedQuestion){
      setQuestion(savedQuestion);
    }
  }, [sendGetRequest, questionId, question]);

  return (
    <Box marginTop={2}>
      {question && (
        <Typography variant="h4" gutterBottom>
          #{questionId}.
        </Typography>
      )}
      <Typography variant="h5" gutterBottom>
        {question}
      </Typography>
    </Box>
  );
};

export default QuestionField;
