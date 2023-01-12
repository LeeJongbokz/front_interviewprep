import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';

const ProfileHeader = ({initValue = 0}) => {
  const [value, setValue] = useState(initValue);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 1,
        borderBottom: 'solid 1px #f4f4f4',
        marginBottom: '50px;'
      }}
    >
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="회원정보수정" component={Link} to="/my-page" />
        <Tab label="비밀번호 변경" component={Link} to="/passwordUpdate" />
        <Tab label="내가 푼 문제" component={Link} to="/RecentProblem" />
      </Tabs>
    </Box>
  )
}

export default ProfileHeader;