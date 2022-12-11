 import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
// import TableCell from '@mui/material/TableCell';
// import LoadingSpinner from '../UI/LoadingSpinner';
import { Link } from 'react-router-dom';

// import useHttpRequest from '../../hook/use-http';

import RecentProblem from './RecentProblem';

const MemberList = ({memberInfo}) => {
    const { fetchedEmail = "aa", fetchedPassword="gg" } = memberInfo;
    const [email, setEmail] = useState(fetchedEmail);
    const [password, setPassword] = useState(fetchedPassword || "password");
    // const [confirmPassword, setConfrimPassword] = useState('');
    // const [name, setName] = useState('');
    // const [nickname, setNickname] = useState('');
    // const [open, setOpen] = useState(false);
    // const [newNickname, setnewNickname] = useState(false);
    // const [value, setValue] = useState(0);
  
    const onSubmitEmail = async e => {
      e.preventDefault();
  
      const bodyData = {
        name: name,
        nickname: nickname,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };
      const response = await fetch(`http://52.202.27.18:8080/members/email/change`, {
        method: 'PUT',
        body: JSON.stringify(bodyData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('성공!')
      console.log(bodyData.email);
      if (!response.ok) {
        alert('오류가 발생했습니다. 다시 시도해주세요!');
        return;
      }
  
      // try {
      //   const res = API.post('members/signup');
      //   console.log(res);
      //   console.log(HandleChange(e));
      // } catch (err) {
      //   console.log(err);
      // }
  
    };
  
    function handleRecentProblem(e, newValue) {
      setValue(newValue);
      console.log(newValue);
    }
  
    const handleClickOpen = (e) => {
  
      switch (e.target.name) {
        case 'nicknameChange':
          setNickname(e.target.value);
          setnewNickname(true);
          console.log('닉네임부분');
          break;
        case 'passwordChange':
          setPassword(e.target.value);
          console.log('비밀번호 부분')
          setOpen(true);
          break;
        case 'email':
          setEmail(e.target.value);
          setOpen(true);
          break;
        default:
      }
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const HandleChangeName = () => {
      alert('닉네임 변경')
    }

  
  return (
    <>
    <Typography component="h5" fontWeight="800" >
          닉네임
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <TextField
            id="nickname"
            label="nickname"
            name="nickname"
            type="text"
            margin="normal"
            required
            fullWidth
            value={nickname}
            onChange={HandleChange}
          />
          <Button
            name="nicknameChange"
            type="submit"
            variant="outlined"
            label={'margin="normal" '}
            sx={{ width: '150px', height: '54px' }}
            onClick={e => handleClickOpen(e)}
          >
            닉네임 변경
          </Button>
          <Dialog open={newNickname} onClose={handleClose} >
            <DialogTitle>
              닉네임 변경
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                닉네임을 변경하시겠습니까?ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>취소</Button>
              <Button onClick={handleClose} onChange={HandleChangeName}>변경</Button>
            </DialogActions>
          </Dialog>
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
          onChange={HandleChange}
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
            onChange={HandleChange}
          />
          <Button onClick={onSubmitEmail} type="submit" variant="outlined" label={'margin="normal" '} sx={{ width: '150px', height: '54px' }}>
            이메일 변경
          </Button>
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

            onChange={e => HandleChange(e)}
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
                    fullWidth
                    value={password}
                    autoFocus
                    variant="standard"
                  />
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" >
                  <DialogContentText fontWeight="600" sx={{ width: '250px' }}>
                    새 비밀번호
                  </DialogContentText>
                  <TextField
                    id="password"
                    label="password"
                    type="password"
                    margin="normal"
                    name="password"
                    fullWidth
                    value={password}
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
                <Button onClick={handleClose} onChange={HandleChangeName}>변경</Button>
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
            <RecentProblem />
          </Table>
        </Box>
    </>
  );
};

export default MemberList;
