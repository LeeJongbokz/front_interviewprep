import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import AnswerField from './AnswerSection/AnswerForm';

import ExplainSection from './ExplainSection/ExplainSection';
import { Modal } from '@mui/material';
import LoginForModal from '../Login/LoginForModal';

const TestScreen = () => {
  const { questionId } = useParams();
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  return (
    <Container maxWidth={false} sx={{ backgroundColor: 'white', paddingTop: '50px' }}>
      <Grid container borderTop={1} borderColor={'lightGray'} minHeight="88vh">
        <Grid item xs={12} md={6} sx={{ borderRight: { md: 'solid 1px lightGray' } }}>
          <ExplainSection questionId={questionId} />
        </Grid>
        <Grid item xs={12} md={6}>
          <AnswerField setLoginModalOpened={setLoginModalOpened} questionId={questionId} />
        </Grid>
      </Grid>
      <Modal open={loginModalOpened} onClose={() => setLoginModalOpened(false)}>
        
          <LoginForModal redirectUrl="./" callback={() => setLoginModalOpened(false)} />
      
      </Modal>
    </Container>
  );
};

export default TestScreen;
