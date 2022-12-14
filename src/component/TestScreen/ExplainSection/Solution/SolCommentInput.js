import { useRef } from 'react';
import useHttpRequest from '../../../../hook/use-http';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const SolCommentInput = ({ answerId, setComments }) => {
  const textRef = useRef();
  const { sendPostRequest } = useHttpRequest();

  const commentSubmitHandler = async () => {
    const postResponseHandler = data => {
      setComments(prevState => {
        return [
          ...prevState,
          { id: data.data.id, memberName: data.data.name, comment: val, myAnswer: true },
        ];
      });
    };

    const val = textRef.current.value;
    await sendPostRequest(
      {
        endpoint: '/answer/comment/',
        bodyData: {
          answerId: answerId,
          comment: val,
        },
      },
      postResponseHandler
    );
    
    textRef.current.value = '';
  };

  return (
    <FormControl fullWidth variant="standard" margin="dense">
      <TextField multiline fullWidth inputRef={textRef} />
      <Stack direction="row" marginTop={1} spacing={1}>
        <Button variant="contained" onClick={commentSubmitHandler}>
          등록
        </Button>
      </Stack>
    </FormControl>
  );
};

export default SolCommentInput;
