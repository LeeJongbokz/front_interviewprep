import { useRef } from 'react';
import useHttpRequest from '../../../../hook/use-http';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const SolCommentInput = ({answerId}) => {
  const inputRef = useRef();
  const { sendPostRequest } = useHttpRequest();

  const commentSubmitHandler = async () => {
    console.log(inputRef.current.value);
    await sendPostRequest({
      endpoint : '/answer/comment/',
      bodyData : {
        "answerId": answerId,
        "comment": inputRef.current.value
      }
    });
    inputRef.current.value = "";
    //ToDo comment API 적용
  };

  return (
    <FormControl fullWidth variant="standard" margin="dense">
      <TextField multiline fullWidth inputRef={inputRef}  />
      <Stack direction="row" marginTop={1} spacing={1}>
        <Button variant="contained" onClick={commentSubmitHandler}>등록</Button>
      </Stack>
    </FormControl>
  );
};

export default SolCommentInput;
