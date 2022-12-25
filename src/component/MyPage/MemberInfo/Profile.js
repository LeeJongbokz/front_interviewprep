import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import TableCell from '@mui/material/TableCell';
import LoadingSpinner from '../../UI/LoadingSpinner';
import useHttpRequest from '../../../hook/use-http';
import ContainerUI from '../../../component/UI/ContainerUI';
import ProfileHeader from '../../MyPage/ProfileHeader';
import MemberList from './MemberList';

export const TableCellColumnHead = ({ body }) => {
  return <TableCell component="th" scope="column" sx={{ color: 'white' }}>{body}</TableCell>;
}
const Profile = () => {
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
      <Typography component="h1" variant="h5" fontWeight="bold" sx={{ marginBottom: '20px'}}>
        회원 정보
      </Typography>

      <Card noValidate variant="outlined" sx={{ marginBottom: '20px', padding: '20px' }}>
        {isLoading && <LoadingSpinner />}
        {!isLoading && <MemberList memberInfo={memberInfo} />}
      </Card>
    </ContainerUI>
  )
}

export default Profile;