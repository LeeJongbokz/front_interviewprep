import Problem from './Problem';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import { THEME_COLOR } from '../../global_variables';

export const TableCellColumnHead = ({body}) => {
  return <TableCell component="th" scope="column" sx={{ color: 'white' }}>{body}</TableCell>;
}

const ProblemList = ({ question }) => {
  return (
    <Table>
      <TableHead sx={{ backgroundColor: THEME_COLOR }}>
        <TableRow>
          <TableCellColumnHead /> 
          <TableCellColumnHead /> 
          <TableCellColumnHead body="제목" /> 
          <TableCellColumnHead body="분류" />
        </TableRow>
      </TableHead>
      <TableBody>
        {question.map(test => {
          return <Problem key={test.id} problem={test} />;
        })}
      </TableBody>
    </Table>
  );
};

export default ProblemList;
