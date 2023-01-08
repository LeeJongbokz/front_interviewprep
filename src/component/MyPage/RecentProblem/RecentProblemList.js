import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import RecentProblemTable from './RecentProblemTable';
import { Link } from 'react-router-dom';


const RecentProblemList = ({ memberInfo }) => {

  const [value, setValue] = useState(0);
  console.log(memberInfo);

  const handleRecentProblem = (e, newValue) => {
    setValue(newValue);
    console.log(newValue);
  }

  const tableComponent = () => {
    if (memberInfo.answers) {
      return <RecentProblemTable memberInfo={memberInfo} />;
    }
  }

  return (
    <div>

      <Box>
        <Tabs value={value} onChange={handleRecentProblem} >
          <Tab label="최근 푼 문제" component={Link} to="/RecentProblem" />
          {/* {loading && <LoadingSpinner />} */}
          <Tab label="모의고사" component={Link} to="/RecentExam" />
        </Tabs>
      </Box>
      <Box>
        <Table>
          {tableComponent()}
        </Table>
      </Box>
    </div>
  )
}

export default RecentProblemList;