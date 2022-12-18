import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';
import useHttpRequest from '../../hook/use-http';
import RecentProblem from './RecentProblem';

const Test = ({ memberInfo }) => {

  console.log(memberInfo);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [updatePasswords, setUpdatePasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [inputs, setInputs] = useState({
    name: memberInfo.name,
    nickName: memberInfo.nickName,
    email: memberInfo.email,
    password: memberInfo.password,
  });
  
  const { sendPutRequest } = useHttpRequest();
  const { name, nickName, email, password } = inputs; // 비구조화 할당을 통해 값 추출
  const { newPassword, confirmPassword } = updatePasswords;
  const {updateResult, setupdateResult} = useState([]);
  // const updateResult = [];
  const onChange = (e) => {
    
    const { value, name, nickName, email, password, newPassword, confirmPassword } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
      [nickName]: value,
      [email]: value,
      [password]: value
    });
    // const { newPassword, confirmPassword } = e.target;
    setUpdatePasswords({
      ...updatePasswords,
      [confirmPassword]: value,
      [newPassword]: value
    });
    console.log(e.target)
    console.log(value)
    if(e.target){
      setupdateResult({
        id: e.target.id,
        name: e.target.value
      });
      // updateResult.push({
      //   id: e.target.id,
      //   name: e.target.value
      // })
    }
    console.log(updateResult)
  };
  // const infoUpdateCheck = () => {
  //   const updateResult = [];
  //   const { value, name, nickName, email, password} = e.target;
  //   if()
  // };
  const infoUpdateHandler = () => {
    console.log(updateResult)
    sendPutRequest({
      endpoint: '/members/change',
      bodyData: {
        name: name,
        nickName: nickName,
        email: email,
      },
    });
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
    handleClose();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <div>
          <Button name="passwordChange" type="submit" variant="outlined" label={'margin="normal" '} sx={{ width: '150px', height: '54px' }} onClick={e => handleClickOpen(e)}>
            비밀번호 변경
          </Button>
          <Dialog open={open} onClose={handleClose} >
            <DialogTitle fontWeight="800">비밀번호 변경</DialogTitle>
            <DialogContent>
              <Box display="flex" justifyContent="center" alignItems="center" >
                <DialogContentText fontWeight="600" sx={{ width: '250px' }}>
                  현재 비밀번호
                </DialogContentText>
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
                  autoFocus
                  variant="standard"
                />
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center" >
                <DialogContentText fontWeight="600" sx={{ width: '250px' }}>
                  새 비밀번호
                </DialogContentText>
                <TextField
                  id="newPassword"
                  label="newPassword"
                  type="password"
                  margin="normal"
                  name="newPassword"
                  fullWidth
                  value={newPassword}
                  autoFocus
                  variant="standard"
                />
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center" >
                <DialogContentText fontWeight="600" sx={{ width: '250px' }}>
                  비밀번호 확인
                </DialogContentText>
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
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>취소</Button>
              {confirmPassword === newPassword && <Button onClick={passwordUpdateHandler}>변경</Button>}
              {confirmPassword !== newPassword && <Button onClick={alert('새 비밀번호가 일치하지 않습니다')}>변경</Button>}
            </DialogActions>
          </Dialog>
        </div>
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
        <Button type="submit" variant="contained" label={'margin="normal"'} onClick={infoUpdateHandler}>
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