import { useState, useEffect } from 'react';

import ContainerUI from '../UI/ContainerUI';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from  '@mui/material/Divider';
import { Link } from 'react-router-dom';

import useHttpRequest from '../../hook/use-http';

// import { useNavigate } from 'react-router-dom';
const ExamList = () => {

  const [examList, setExamList] = useState([]);
  const { sendGetRequest } = useHttpRequest()

  useEffect( ()=>{
    const examListHandler = (data) => {
      if(data.success){
        setExamList(data.data.map(i =>{ return {"id": i.id, "title": i.title}}))
      }
    }
    sendGetRequest('/exam/kit', examListHandler)
  }, [sendGetRequest])

  return (
    <ContainerUI>
      <Typography component="h1" variant="h5" fontWeight="bold">
        모의고사
      </Typography>
      <Grid container marginTop={3} spacing={3} columns={6}>{
        examList.map(i => {
          const examId = i.id;
          const title = i.title;
          return (
          <Grid key={examId} component={Link} to={`/exam/${examId}`} item xs={6} sm={3} md={2} sx={{ textDecoration:"none", color:"inherit"}}>
          <Box sx={{ height: 300, border: 1, borderColor: 'rgba(0, 0, 0, 0.12)', borderRadius: 3 }}>
              <Typography component="div" margin={2} gutterBottom>
                TEST{examId}
              </Typography>
              <Divider />
              <Typography component="div" margin={2} variant='h5'>{title}</Typography>
          </Box>
        </Grid>);
        })
      }</Grid>
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
