import { useState, useEffect } from 'react';
import ContainerUI from '../UI/ContainerUI';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import useHttpRequest from '../../hook/use-http';
import LoadingSpinner from '../UI/LoadingSpinner';
import { Link } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';
const ExamList = () => {
  const [exam, setExam] = useState([]);
  const { isLoading, sendGetRequest } = useHttpRequest();
  // const navigate = useNavigate();

  useEffect(() => {
    const examListHandler = data => {
      setExam(data.data);
      console.log(data.data);
    };
    sendGetRequest(`/exam/kit`, examListHandler);
  }, [sendGetRequest]);

  return (
    <ContainerUI>
      <Typography component="h1" variant="h5" fontWeight="bold">
        모의고사
      </Typography>
      <Grid container spacing={3} columns={6}>
        <Grid component={Link} to="#" item xs={6} sm={3} md={2} sx={{}}>
          <Box sx={{ height: 300, border: 1, borderColor: 'rgba(0, 0, 0, 0.12)', borderRadius: 3 }}>
            <Typography component="div" margin={2} gutterBottom>
              TEST1
              {isLoading && <LoadingSpinner />}
              {!isLoading && 
              <Typography exam={exam}/>}
            </Typography>
            <Divider />
            <Typography component="div" margin={2} variant='h5'>스프링 모의고사</Typography>
          </Box>
        </Grid>
      </Grid>
      {/* <Button variant="outlined" onClick={() => navigate('/exam/frontend')}>
        FRONTEND
      </Button>
      <Button variant="outlined" onClick={() => navigate('/exam/frontend')}>
        BACKEND
      </Button> */}
    </ContainerUI>
  );
};

export default ExamList;
