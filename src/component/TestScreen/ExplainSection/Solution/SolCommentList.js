import React, { useEffect, useState } from 'react';
import SolCommentInput from './SolCommentInput';

import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

import useHttpRequest from '../../../../hook/use-http';
import LoadingSpinner from '../../../UI/LoadingSpinner';

const SolCommentList = ({ answerId, count }) => {
  const [comments, setComments] = useState([]);
  const { isLoading, sendGetRequest, sendDelRequest } = useHttpRequest();

  useEffect(() => {
    const setCommentsHandler = data => {
      if (data?.success) {
        setComments(data.data.content);
      }
    };
    if(count > 0){
      sendGetRequest(`/answer/comment/${answerId}`, setCommentsHandler);
    }
  }, [sendGetRequest, answerId, count]);

  const deleteHandler = id => {
    if (window.confirm('삭제 하시겠습니까?')) {
      sendDelRequest({ endpoint: `/answer/comment/${id}` });
      setComments(prevState => {
        return prevState.filter(item => item.id !== id);
      });
    }
  };

  return (
    // <CardContent sx={{ backgroundColor: 'WhiteSmoke' }}>
    <CardContent>
      <Divider />
      {isLoading && <LoadingSpinner />}
      {/* {!isLoading && comments.length === 0 && '등록된 댓글이 없습니다.'} */}
      {!isLoading && comments.length > 0 && (
        <Table size="small">
          <TableBody>
            {!isLoading &&
              comments.map(item => (
                <TableRow key={item.id}>
                  <TableCell sx={{ border: 0 }}>{item.memberName}</TableCell>
                  <TableCell sx={{ border: 0 }}>{item.comment}</TableCell>
                  <TableCell sx={{ border: 0, color: 'red', textAlign: 'right' }}>
                    {item.myAnswer && (
                      <Link
                        underline="none"
                        component="button"
                        onClick={() => {
                          deleteHandler(item.id);
                        }}
                      >
                        삭제
                      </Link>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
      <SolCommentInput answerId={answerId} setComments={setComments} />
    </CardContent>
  );
};

export default React.memo(SolCommentList);
