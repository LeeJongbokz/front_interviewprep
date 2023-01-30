import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import AnswerField from './AnswerSection/AnswerForm';

import ExplainSection from './ExplainSection/ExplainSection';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './ExplainSection/fetchForQuery';

const TestScreen = () => {
  const { questionId } = useParams();
  queryClient.removeQueries();
  return (
    <QueryClientProvider client={queryClient}>
      <Container maxWidth={false} sx={{ backgroundColor: 'white', paddingTop: '50px' }}>
        <Grid container borderTop={1} borderColor={'lightGray'} minHeight="88vh">
          <Grid item xs={12} md={6} sx={{ borderRight: { md: 'solid 1px lightGray' } }}>
            <Suspense>
              <ExplainSection questionId={questionId} />
            </Suspense>
          </Grid>
          <Grid item xs={12} md={6}>
            <AnswerField questionId={questionId} />
          </Grid>
        </Grid>
      </Container>
    </QueryClientProvider>
  );
};

export default TestScreen;
