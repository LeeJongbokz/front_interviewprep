import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import classes from '../../Test/Problem.module.css';


const RecentProblemTable = ({ memberInfo }) => {
  console.log(memberInfo.answers);
  const navigate = useNavigate();

  const timeForToday = (value) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  }
  timeForToday()

  return (
    <TableBody>
      <TableRow className={classes.row}>
        <TableCell component="th" scope="row">번호</TableCell>
        <TableCell>내용</TableCell>
        <TableCell>날짜</TableCell>
      </TableRow>
      {memberInfo.answers.map((item) => {
        console.log(item)
        return (
          <>
            <TableRow hover className={classes.row} onClick={() => navigate(`/test/${item["@id"]}`)}>
              <TableCell component="th" scope="row">{item.id}</TableCell>
              <TableCell>{item.content}</TableCell>
              <TableCell>{item.modifiedDate}</TableCell>
            </TableRow>

          </>
        )
      })}
    </TableBody>
  );
};

export default RecentProblemTable;
