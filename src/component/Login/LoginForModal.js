import React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import LoginForm from './LoginForm';

const LoginForModal = ({ isOpen = false, callback = () => {} }) => {

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
          <LoginForm callback={callback} />
        </Grid>
      </Box>
    </Modal>
  );
};

export default LoginForModal;