import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import { Link } from 'react-router-dom';
// import useHttpRequest from '../../hook/use-http';
import RecentProblem from './RecentProblem';

const Test = ({ memberInfo }) => {
  console.log(memberInfo);
  const [value, setValue] = useState(0);
  const [inputs, setInputs] = useState({
    name: memberInfo.name,
    nickName: memberInfo.nickName,
    email: memberInfo.email,
    password: memberInfo.password,
  });

  // const { sendPostRequest } = useHttpRequest();
  const { name,nickName, email, password } = inputs; // 비구조화 할당을 통해 값 추출
  
  const onChange = (e) => {
    const { value, name, nickName, email, password } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
      [nickName]: value,
      [email]: value,
      [password]: value
    });
    console.log(value)
  };

  // const updateHandler = () => {
  //   console.log('FAV');
  //   setFavorite(true);
  //   setHeartCnt(prevState => prevState + 1);
  //   sendPostRequest({
  //     endpoint: '/heart',
  //     bodyData: {
  //       answerId: answerId,
  //     },
  //   });
  // };

  const onReset = () => {
    setInputs({
      name: memberInfo.name,
      nickName: memberInfo.nickName,
      email: memberInfo.email,
      password: memberInfo.password,
    })
    console.log(memberInfo.name)
  };
  const tableComponent = () => {
    if (memberInfo.answers) {
      return <RecentProblem memberInfo={memberInfo} />;
    }
  }

  const handleRecentProblem = (e, newValue) => {
    setValue(newValue);
    console.log(newValue);
  }

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
      <Typography component="h5" fontWeight="800" >
        비밀번호
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center">
        <TextField
          disabled
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
        <Button onClick="alert('test')" type="submit" variant="outlined" label={'margin="normal" '} sx={{ width: '150px', height: '54px' }}>
          비밀번호 변경
        </Button>
      </Box>
      <Box>
        <Tabs value={value} onChange={handleRecentProblem} >
          <Tab label="최근 푼 문제 " />
          {/* {loading && <LoadingSpinner />} */}
          <Tab label="내가 푼 모의고사" component={Link} to="#" />
        </Tabs>
      </Box>
      <Box>
        <Table>
          {tableComponent()}
        </Table>
      </Box>
      <div>
        <Button type="submit" variant="contained" label={'margin="normal"'}>
          저장
        </Button>
        <Button type="submit" variant="contained" label={'margin="normal"'} onClick={onReset}>
          초기화
        </Button>
      </div>
    </div>
  )
}

export default Test;