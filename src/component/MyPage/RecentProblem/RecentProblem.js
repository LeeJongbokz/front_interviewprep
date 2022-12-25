import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import TableCell from '@mui/material/TableCell';
import LoadingSpinner from '../../UI/LoadingSpinner';
import useHttpRequest from '../../../hook/use-http';
import ContainerUI from '../../UI/ContainerUI';
import ProfileHeader from '../ProfileHeader';
import RecentProblemList from './RecentProblemList';

export const TableCellColumnHead = ({ body }) => {
  return <TableCell component="th" scope="column" sx={{ color: 'white' }}>{body}</TableCell>;
}
const RecentProblem = () => {
  const [memberInfo, setMemberInfo] = useState([]);
  const { isLoading, sendGetRequest } = useHttpRequest();


  useEffect(() => {
    const memberInfoHandler = data => {
      setMemberInfo(data.data);
      console.log(data.data);
    };
    sendGetRequest(`/members/userInfo`, memberInfoHandler);
  }, [sendGetRequest]);

  return (
    <ContainerUI>
      <ProfileHeader></ProfileHeader>
      <Typography component="h1" variant="h5" fontWeight="bold" sx={{ marginBottom: '20px' }}>
        연습 문제
      </Typography>

      <Card noValidate variant="outlined" sx={{ marginBottom: '20px', padding: '20px' }}>
        {isLoading && <LoadingSpinner />}
        {!isLoading && <RecentProblemList memberInfo={memberInfo} />}
      </Card>
    </ContainerUI>
  )
}

export default RecentProblem;