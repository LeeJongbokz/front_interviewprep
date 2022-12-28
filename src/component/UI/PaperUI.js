import React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const PaperUI = ({children, title}) => {
  return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginX: "auto",
          marginTop:"10%",
          maxWidth:"500px"
        }}
      >
        <Grid padding={4} component={Paper} square>
          <Typography align="center" component="h1" variant="h5">
            {title}
          </Typography>
          {children}
        </Grid>
      </Box>
  );
};

export default PaperUI;
