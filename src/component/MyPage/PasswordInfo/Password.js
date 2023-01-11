import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TableCell from '@mui/material/TableCell';
import LoadingSpinner from '../../UI/LoadingSpinner';
import useHttpRequest from '../../../hook/use-http';
import ContainerUI from '../../../component/UI/ContainerUI';
import ProfileHeader from '../../MyPage/ProfileHeader';
import PasswordUpdate from './PasswordUpdate';

export const TableCellColumnHead = ({ body }) => {
  return <TableCell component="th" scope="column" sx={{ color: 'white' }}>{body}</TableCell>;
}
const Password = () => {
  const [memberInfo, setMemberInfo] = useState([]);
  const { isLoading, sendGetRequest } = useHttpRequest();


  useEffect(() => {
    const memberInfoHandler = data => {
      setMemberInfo(data.data);
      // console.log(data.data);
    };
    sendGetRequest(`/members/userInfo`, memberInfoHandler);
  }, [sendGetRequest]);

  return (
    <ContainerUI>
      <ProfileHeader initValue={1} />
      <Typography component="h1" variant="h5" fontWeight="bold" sx={{ marginBottom: '20px' }}>
        비밀번호 변경
      </Typography>
      <Card noValidate variant="outlined" sx={{ marginBottom: '20px', padding: '20px' }}>
        {isLoading && <LoadingSpinner />}
        {!isLoading && <PasswordUpdate memberInfo={memberInfo} />}
      </Card>
    </ContainerUI>
  )
}

export default Password;