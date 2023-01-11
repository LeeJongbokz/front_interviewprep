import { useNavigate } from 'react-router-dom';
import classes from './Problem.module.css';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CheckIcon from '@mui/icons-material/Check';

const Problem = ({ problem }) => {
  const navigate = useNavigate();
  return (
    <TableRow hover className={classes.row} onClick={() => navigate(`/test/${problem.id}`)}>
      <TableCell component="th" scope="row">{problem.id}</TableCell>
      <TableCell sx={{width:"20px"}}>{problem.status && <CheckIcon sx={{fontSize:"15px"}} color="success" />}</TableCell>
      <TableCell>{problem.title}</TableCell>
      <TableCell>{problem.type || '-'}</TableCell>
    </TableRow>
  );
};

export default Problem;
