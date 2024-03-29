import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const NumberPad = ({ answerList, questionIdx, changeIdxHandler, length }) => {
  return (
    <Box textAlign="center"  paddingY={3} overflow="auto">
      <ButtonGroup sx={{textAlign:"center"}} variant="text">
        {Array(length).fill(0).map((value, i) => {
            const buttonText = i+1
            let btn;
            if(answerList[i].content.length > 0){
              btn = <Button key={i} variant="contained" onClick={() => {changeIdxHandler(i)}}>{buttonText}</Button>;
            } else if (i === questionIdx) {
              btn = <Button key={i} variant="outlined" onClick={() => {changeIdxHandler(i)}}>{buttonText}</Button>;
            } else {
              btn = <Button key={i} variant="text" onClick={() => { changeIdxHandler(i)}}>{buttonText}</Button>;
            }
            return btn;
          })}
      </ButtonGroup>
    </Box>
  );
};

export default NumberPad;
