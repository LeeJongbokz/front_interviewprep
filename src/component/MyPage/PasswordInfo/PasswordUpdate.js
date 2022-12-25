import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useHttpRequest from '../../../hook/use-http';


const PasswordUpdate = ({ memberInfo }) => {

  console.log(memberInfo);
  // const [value, setValue] = useState(0);

  // const [updatePasswords, setUpdatePasswords] = useState({
  //   newPassword: '',
  //   confirmPassword: ''
  // });
  const [inputs, setInputs] = useState({
    password: memberInfo.password,
    newPassword: '',
    confirmPassword: ''
  });

  const { sendPutRequest } = useHttpRequest();
  const { password, newPassword, confirmPassword } = inputs; // 비구조화 할당을 통해 값 추출
  // const { newPassword, confirmPassword } = updatePasswords;

  const onChange = (e) => {

    const { value, password, newPassword, confirmPassword } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤 // name 키를 가진 값을 value 로 설정

      [password]: value,
      [newPassword]: value,
      [confirmPassword]: value,
    });
    // const { newPassword, confirmPassword } = e.target;
    // setUpdatePasswords({
    //   ...updatePasswords,
    //   [confirmPassword]: value,
    //   [newPassword]: value
    // });
    console.log(e.target)
    console.log(value)
  };
  const passwordUpdateHandler = () => {
    console.log(password)
    console.log(newPassword)
    sendPutRequest({
      endpoint: 'members/password/change',
      bodyData: {
        password: password,
        newPassword: newPassword
      },
    });
  };

  const onReset = () => {
    setInputs({
      password: memberInfo.password,
      newPassword: '',
      confirmPassword: ''
    })
  };

  return (
    <div>
      <Typography component="h5" fontWeight="800" >
        비밀번호
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
        variant="standard"
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
          variant="standard"
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