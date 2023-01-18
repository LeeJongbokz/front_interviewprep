import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { BACKEND_BASE_URL } from '../../../global_variables';

import AuthContext from '../../../store/auth-context';
import useHttpRequest from '../../../hook/use-http';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';


import SubmitButtonGroup from './SubmitButtonGroup';

const AnswerForm = ({ questionId }) => {
  const maxLength = 500;

  const [answer, setAnswer] = useState('');
  const { sendPostRequest } = useHttpRequest();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async () => {
    if( authCtx.token === null || authCtx.refreshToken === null){
      authCtx.toggleLoginModal();
      return;
    }
    
    if (window.confirm('답안을 제출하시겠습니까?')) {
      const bodyData = {
        questionId,
        content: answer.slice(0, maxLength),
      };
      await sendPostRequest({
        endpoint: `/answer/`,
        bodyData
      }, () => {
        navigate('/test');
      });
      return;
    }
  };

  const changeHandler = e => {
    setAnswer(e.target.value);
  };

  return (
    <Box padding={2}>
      <Divider sx={{borderColor: "black", display:{xs:"block", md:"none"}}} />
      <FormLabel sx={{display:{xs:"block", md:"none"}}} component="label">답안작성란</FormLabel>
      <FormControl margin="dense" fullWidth variant="standard" sx={{ marginTop: '20px' }}>
        <TextField
          id="answer"
          multiline
          rows={6}
          onChange={changeHandler}
          placeholder="답을 입력해주세요"
          inputProps={{
            maxLength,
          }}
          helperText={`${answer.length}/${maxLength}`}
        />
      </FormControl>
      <SubmitButtonGroup questionId={questionId} submitHandler={submitHandler} />
    </Box>
  );
};

export default AnswerForm;
