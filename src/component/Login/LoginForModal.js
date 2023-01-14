import React, { useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { Link } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DividingLine from '../UI/DividingLine';
import IconGroup from './IconGroup';

const LoginForModal = ({ isOpen = false, callback = () => {} }) => {
  const authCtx = useContext(AuthContext);

  const formRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmitHandler = e => {
    e.preventDefault();
    if (formRef.current.reportValidity() === false) {
      return;
    }

    authCtx
      .login(emailRef.current.value, passwordRef.current.value)
      .then(data => {
        if (data.error) {
          throw new Error();
        } else if (data.success === false) {
          alert('인증정보가 올바르지 않습니다.');
          return;
        } else {
          return;
        }
      })
      .catch(e => {
        alert('인증이 실패했거나 오류가 발생했습니다!');
      });
    callback();
    return;
  };

  return (
    <Modal open={isOpen} onClose={callback}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginX: 'auto',
          marginTop: '10%',
          maxWidth: '500px',
        }}
      >
        <Grid padding={4} component={Paper} square={true}>
          <Typography align="center" component="h1" variant="h5">
            로그인
          </Typography>
          <form onSubmit={onSubmitHandler} ref={formRef} noValidate>
            <TextField
              id="email"
              label="email"
              type="email"
              margin="normal"
              inputRef={emailRef}
              autoComplete="on"
              required
              fullWidth
            />
            <TextField
              id="password"
              label="passwords"
              type="password"
              margin="normal"
              inputRef={passwordRef}
              autoComplete="off"
              required
              fullWidth
            />
            <ButtonGroup fullWidth sx={{ marginTop: 2 }}>
              <Button type="submit" variant="contained">
                로그인
              </Button>
              <Button variant="outlined" component={Link} to="/signup">
                회원가입
              </Button>
            </ButtonGroup>
          </form>
          <DividingLine />
          <IconGroup />
        </Grid>
      </Box>
    </Modal>
  );
};

export default LoginForModal;
