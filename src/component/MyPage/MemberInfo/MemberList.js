import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useHttpRequest from '../../../hook/use-http';

const MemberList = ({ memberInfo }) => {

  console.log(memberInfo);

  const [inputs, setInputs] = useState({
    name: memberInfo.name,
    nickName: memberInfo.nickName,
    email: memberInfo.email,
    password: memberInfo.password,
  });

  const { sendPutRequest } = useHttpRequest();
  const { name, nickName, email} = inputs; // 비구조화 할당을 통해 값 추출
  
  const onChange = (e) => {

    const { value, name, nickName, email} = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
      [nickName]: value,
      [email]: value,
    });
    
  };
  const infoUpdateHandler = () => {
    sendPutRequest({
      endpoint: '/members/change',
      bodyData: {
        name: name,
        nickName: nickName,
        email: email,
      },
    });
  };
  const onReset = () => {
    setInputs({
      name: memberInfo.name,
      nickName: memberInfo.nickName,
      email: memberInfo.email,
    })
    console.log(memberInfo.name)
  };

  return (
    <div>
      <Typography component="h5" fontWeight="800" >
        닉네임
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center">
        <TextField
          id="nickName"
          label="nickName"
          name="nickName"
          type="text"
          margin="normal"
          required
          fullWidth
          value={nickName}
          onChange={onChange}
        />
      </Box>
      <Typography component="h5" fontWeight="800" >
        이름
      </Typography>
      <TextField
        id="name"
        label="name"
        name="name"
        type="text"
        margin="normal"
        disabled
        fullWidth
        value={name}
        onChange={onChange}
      />
      <Typography component="h5" fontWeight="800" >
        이메일
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center">
        <TextField
          id="email"
          label="email"
          type="email"
          margin="normal"
          name="email"
          required
          fullWidth
          value={email}
          onChange={onChange}
        />
      </Box>
      <div>

        <Button type="submit" variant="contained" label={'margin="normal"'} onClick={infoUpdateHandler} sx={{marginTop: '20px'}}>
          저장
        </Button>
        <Button type="submit" variant="contained" label={'margin="normal"'} onClick={onReset} sx={{marginTop: '20px', marginLeft:'5px'}}>
          초기화
        </Button>
      </div>
    </div>
  )
}

export default MemberList;