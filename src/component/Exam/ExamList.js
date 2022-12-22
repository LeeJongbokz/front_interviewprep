import { useState, useEffect } from 'react';
import ContainerUI from '../UI/ContainerUI';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { Link } from 'react-router-dom';

import classes from './ExamList.module.css';
import useHttpRequest from '../../hook/use-http';
// import LoadingSpinner from '../UI/LoadingSpinner';

const ExamList = () => {
  const [examList, setExamList] = useState([]);
  const { sendGetRequest } = useHttpRequest();

  useEffect(() => {
    const examListHandler = data => {
      if (data.success) {
        setExamList(
          data.data.map(i => {
            return { id: i.id, title: i.title };
          })
        );
      }
    };
    sendGetRequest('/exam/kit', examListHandler);
  }, [sendGetRequest]);

  return (
    <ContainerUI>
      <Typography component="h1" variant="h5" fontWeight="bold">
        모의고사
      </Typography>
      <Grid container marginTop={3} spacing={3} columns={6} justify="center">
        {examList.map(i => {
          const examId = i.id;
          const title = i.title;
          return (
            <Grid
              item
              key={examId}
              component={Link}
              to={`/exam/${examId}`}
              xs={6} sm={3} md={2}
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                alignSelf: 'center',
                justifySelf: 'center',
              }}
            >
              <Box
                sx={{
                  position:"relative",
                  margin: 'auto',
                  height: 400,
                  maxWidth: '350px',
                  border: 1,
                  borderColor: 'rgba(0, 0, 0, 0.12)',
                  borderRadius: 3,
                }}
              >
                <img
                  className={classes.examImage}
                  src="https://www.zdnet.com/a/img/resize/e0a9cadd3b0038b854680cff5a197bdf96580443/2021/07/19/8a337c80-5ed6-43a1-98fb-b981d420890f/programming-languages-shutterstock-1680857539.jpg?auto=webp&width=1280"
                  alt="noImg"
                />

                <Typography
                  component="div"
                  margin={1}
                  sx={{ height: '24px', fontWeight:600 }}
                  gutterBottom
                >
                  {title || '제목'}
                </Typography>
                <Typography component="div" margin={2} sx={{ color: 'gray', height: '80px' }}>
                  부제목
                </Typography>
                <Stack direction="row" margin={1} spacing={1} sx={{ position:"absolute", bottom:0}}>
                  <Chip size='small' variant="outlined" label="JavaScript" color="success" />
                  <Chip size='small' variant="outlined" label="JAVA" color="success" />
                  <Chip size='small' variant="outlined" label="Spring" color="success" />
                </Stack>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </ContainerUI>
  );
};

export default ExamList;
