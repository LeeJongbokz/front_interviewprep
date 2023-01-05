import { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

import useHttpRequest from '../../../../hook/use-http';

let lastQuestionId;
let savedQuestion = '';

const QuestionField = ({ questionId }) => {
  if( questionId !== lastQuestionId){
    savedQuestion = "";
  }
  const [question, setQuestion] = useState(savedQuestion);
  const { sendGetRequest } = useHttpRequest();

  useEffect(() => {
    const questionHandler = data => {
      setQuestion(data.data.title);
      savedQuestion = data?.data?.title || '';
    };
    if (!savedQuestion) {
      sendGetRequest(`/question/single/${questionId}`, questionHandler);
    } else if (savedQuestion) {
      setQuestion(savedQuestion);
    }
  }, [sendGetRequest, questionId, question]);

  return (
    <Box marginTop={2}>
      {question && (
        <Typography variant="h6" gutterBottom 
        sx={{
          border:1 ,
          borderColor:'lightgray',
          borderRadius:4,
          // boxShadow:1,
          padding: 2,
        }}>
          {question}
        </Typography>
      )}
    </Box>
  );
};

export default QuestionField;
