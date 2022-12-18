import { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const AnswerForm = ({inputRef}) => {
  const [inputText, setInputText] = useState('');

  const changeHandler = e => {
    setInputText(e.target.value);
  };

  const newValue = inputRef?.current?.value || "";

  // triggering when child component is rerendered; 
  useEffect(() => {
    setInputText(newValue);
  }, [newValue]);

  return (
    <FormControl margin="dense" fullWidth variant="standard" sx={{ marginTop: '20px' }}>
      <TextField
        id="answer"
        multiline
        rows={3}
        onChange={changeHandler}
        inputRef={inputRef}
        placeholder="답을 입력해주세요"
        inputProps={{
          maxLength: 50,
        }}
        helperText={`${inputText.length}/50`}
      />
    </FormControl>
  );
};

export default AnswerForm;
