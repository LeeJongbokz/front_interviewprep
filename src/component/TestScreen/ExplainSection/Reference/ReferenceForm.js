import { useState, useContext } from 'react';

import AuthContext from '../../../../store/auth-context';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import useHttpRequest from '../../../../hook/use-http';

import { queryClient, useMutation } from '../fetchForQuery';

const ReferenceForm = ({ questionId, queryKey }) => {
  const [reference, setReference] = useState('');
  const { sendPostRequest } = useHttpRequest();
  const authCtx = useContext(AuthContext);

  const changeHandler = e => {
    setReference(e.target.value);
  };

  const saveReferenceMutation = useMutation({
    mutationFn: async () => {
      await sendPostRequest(
        {
          endpoint: `/question/ref/`,
          bodyData: {
            questionId: questionId,
            link: reference.slice(0, 1000),
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries({queryKey : [queryKey], exact: true});
    },
  });

  const submitHandler = async () => {
    if (authCtx.token === null) {
      authCtx.toggleLoginModal();
      return;
    }

    if (window.confirm('레퍼런스를 등록 하시겠습니까?')) {
      saveReferenceMutation.mutate();
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
