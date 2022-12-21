import { useEffect, useRef, useState } from 'react';
import useHttpRequest from '../../../../hook/use-http';

import FormControl from '@mui/material/FormControl';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const AnswerCommentList = ({ answerId }) => {
  const [comments, setComments] = useState([]);
  const { sendGetRequest, sendPostRequest } = useHttpRequest();

  // useEffect(() => {
  //   const getRequestHandler = data => {
  //     setComments()
  //   }
  // });
  useEffect(() => {
    const getCommentAPI = async () => {
      const response = await fetch(
        `https://react-post-de8f7-default-rtdb.firebaseio.com/interviewPrep/answerComment/${answerId}.json`
      );
      if (!response.ok) {
        console.log('ERR');
        return;
      }
      const commentData = await response.json();

      const loadedComments = [];

      for (const key in commentData) {
        loadedComments.push(commentData[key].comment);
      }
      setComments(loadedComments);
    };
    getCommentAPI();
  }, [answerId]);

  const commentRef = useRef();
  const submitHandler = async () => {
    sendPostRequest({ endpoint: `/answer/comment/`, bodyData: {
      "answerId" : answerId,
      "comment" : commentRef.current.value
    } });
    commentRef.current.value = "";
  };

  return (
    <>
      <Divider />
      <Typography textAlign="center" variant="h5" m={1}>
        Comments
      </Typography>
      {comments.map((val, index) => {
        return (
          <ListItem sx={{ ml: 2 }} key={index}>
            {val}
          </ListItem>
        );
      })}
      <FormControl
        variant="standard"
        margin="dense"
        sx={{ display: 'flex', flexDirection: 'row' }}
        fullWidth
      >
        <TextField
          multiline
          rows={2}
          // onChange={changeHandler}
          placeholder=""
          inputProps={{
            maxLength: 50,
          }}
          sx={{ flex: 1 }}
          inputRef={commentRef}
          helperText={`??`}
        />
        <Button onClick={submitHandler} variant="outlined">
          등록
        </Button>
      </FormControl>
    </>
  );
};

export default AnswerCommentList;
