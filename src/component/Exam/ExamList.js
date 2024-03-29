import { useState, useEffect, useContext } from 'react';
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
import LoadingSpinner from '../UI/LoadingSpinner';
import AuthContext from '../../store/auth-context';

const ExamList = () => {
  const [examList, setExamList] = useState([]);
  const { isLoading, sendGetRequest } = useHttpRequest();

  const authCtx = useContext(AuthContext);
  
  useEffect(() => {
    const examListHandler = data => {
      if (data.success) {
        setExamList(
          data.data.map(i => {
            return { id: i.id, title: i.title, image: i.picture };
          })
        );
      }
    };
    sendGetRequest('/exam/kit', examListHandler);
  }, [sendGetRequest]);

  return (
    <ContainerUI>
      <Typography component="h1" variant="h5" fontWeight="bold">
        실력 테스트
      </Typography>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Grid container marginTop={3} spacing={3} columns={6} justify="center">
          {examList.map(i => {
            const examId = i.id;
            const title = i.title;
            const image = i.image;
            return (
              <Grid
                item
                key={examId}
                component={Link}
                to={authCtx.isLoggedIn ? `/exam/${examId}` : '/login/'}
                xs={6}
                sm={3}
                md={2}
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  alignSelf: 'center',
                  justifySelf: 'center',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    margin: 'auto',
                    height: 400,
                    maxWidth: '350px',
                    border: 1,
                    borderColor: 'rgba(0, 0, 0, 0.12)',
                    borderRadius: 3,
                  }}
                >
                  <Box sx={{ height: '200px' }}>
                    <img
                      className={classes.examImage}
                      src={image}
                    />
                  </Box>
                  <Typography
                    component="div"
                    margin={1}
                    sx={{ height: '24px', fontWeight: 600 }}
                    gutterBottom
                  >
                    {title || '제목'}
                  </Typography>
                  <Typography component="div" margin={2} sx={{ color: 'gray', height: '80px' }}>
                    부제목
                  </Typography>
                  <Stack
                    direction="row"
                    margin={1}
                    spacing={1}
                    sx={{ position: 'absolute', bottom: 0 }}
                  >
                    <Chip size="small" variant="outlined" label="JavaScript" color="success" />
                    <Chip size="small" variant="outlined" label="JAVA" color="success" />
                    <Chip size="small" variant="outlined" label="Spring" color="success" />
                  </Stack>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}
    </ContainerUI>
  );
};

export default ExamList;
