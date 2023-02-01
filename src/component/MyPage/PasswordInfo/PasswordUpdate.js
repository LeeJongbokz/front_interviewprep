import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useHttpRequest from '../../../hook/use-http';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const PasswordUpdate = ({ memberInfo }) => {

  // console.log(memberInfo);
  const { sendGetRequest } = useHttpRequest();

  const [inputs, setInputs] = useState({
    password: memberInfo.password,
    newPassword: null,
    confirmPassword: null
  });
  const [query, setQuery] = useState([]);
  const { sendPutRequest } = useHttpRequest();
  const { password, newPassword, confirmPassword } = inputs; // 비구조화 할당을 통해 값 추출

  useEffect(() => {
    const examListHandler = data => {
      if (data.success) {
        console.log(inputs)
        console.log('성공ㅇㅇㅇㅇㅇㅇㅇㅇㅇ')
        successComponent()

      }
    };
    sendGetRequest('/members/userInfo', examListHandler);
    // sendPutRequest('/members/password/change',examListHandler)
    // successComponent()
  }, [sendGetRequest]);

  const successComponent = () => {

    console.log('alal')
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">비밀번호를 다시 입력해주세요</Alert>
      </Stack>
    )

  }

  const onChange = (e) => {
    const { value, id: targetId } = e.target;
    setInputs((prevState) => {
      return { ...prevState, [targetId]: value }
    });
    setQuery({
      ...query,
      [targetId]: value
    })
    console.log(query)
  };
  const passwordUpdateHandler = () => {

    sendPutRequest({
      endpoint: '/members/password/change',
      bodyData: {
        ...query
      },

    });
  };

  const onReset = () => {
    setInputs({
      ...inputs,
      password: '',
      newPassword: '',
      confirmPassword: ''
    })
    console.log(inputs)
    console.log(memberInfo.password)
  };

  return (
    <div>
      <Typography component="h5" fontWeight="800" >
        현재 비밀번호
      </Typography>
      <TextField
        id="password"
        label="password"
        type="password"
        margin="normal"
        name="password"
        required
        fullWidth
        value={password}
        onChange={onChange}
      />
      <div>
        {successComponent()}
      </div>
      <Typography component="h5" fontWeight="800" >
        새 비밀번호
      </Typography>
      <TextField
        id="newPassword"
        label="newPassword"
        type="password"
        margin="normal"
        name="newPassword"
        fullWidth
        value={newPassword}
        onChange={onChange}
      />
      <Typography component="h5" fontWeight="800" >
        새 비밀번호 확인
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center">
        <TextField
          id="confirmPassword"
          label="confirmPassword"
          type="password"
          margin="normal"
          name="confirmPassword"
          fullWidth
          value={confirmPassword}
          autoFocus
          onChange={onChange}
        />
      </Box>

      <div>
        <Button type="submit" variant="contained" label={'margin="normal"'} onClick={passwordUpdateHandler} sx={{ marginTop: '20px' }}>
          저장
        </Button>
        <Button type="submit" variant="contained" label={'margin="normal"'} onClick={onReset} sx={{ marginTop: '20px', marginLeft: '5px' }}>
          초기화
        </Button>
      </div>
    </div>
  )
}

export default PasswordUpdate;