import { useRef } from 'react';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const SolCommentInput = () => {
  const inputRef = useRef();

  const commentSubmitHandler = () => {
    console.log(inputRef.current.value);
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
