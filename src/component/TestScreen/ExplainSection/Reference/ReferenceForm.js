import { useState } from 'react';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import useHttpRequest from '../../../../hook/use-http';

const ReferenceForm = ({ questionId, setReferenceList, saveReference }) => {
  const [reference, setReference] = useState('');
  const { sendPostRequest } = useHttpRequest();

  const changeHandler = e => {
    setReference(e.target.value);
  };

  const submitHandler = async () => {
    if (window.confirm('레퍼런스를 등록 하시겠습니까?')) {
      await sendPostRequest({
        endpoint: `/question/ref/`,
        bodyData: {
          questionId: questionId,
          link: reference.slice(0, 1000),
        },
      });

      setReferenceList(prevState => {
        const newState = [
          {
            id: 9000,
            link: reference,
            date: 'XXXX-XX-XX',
            heartCnt: 0,
          },
          ...prevState,
        ];
        saveReference(newState);
        return newState;
      });
      setReference('');
    }
  };
  return (
    <Box>
      <FormControl margin="dense" fullWidth variant="standard" sx={{ marginTop: '20px' }}>
        <TextField
          id="reference"
          multiline
          rows={3}
          onChange={changeHandler}
          value={reference}
          placeholder="Input your reference"
          inputProps={{
            maxLength: 1000,
          }}
          helperText={`${reference.length}/1000`}
        />
      </FormControl>
      <Stack direction="row" spacing={1} marginBottom={1}>
        <Button variant="contained" onClick={submitHandler} m={1}>
          등록하기
        </Button>
      </Stack>
      <Divider />
    </Box>
  );
};

export default ReferenceForm;
