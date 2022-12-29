import { useState } from 'react';
import useHttpRequest from '../../../../hook/use-http';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

import SolCommentList from './SolCommentList';
import Linkify from 'react-linkify';

const SolutionItem = ({
  answerId,
  namae,
  answer,
  heartCnt: initHeartCnt,
  heart,
  date,
}) => {
  const [favorite, setFavorite] = useState(heart);
  const [heartCnt, setHeartCnt] = useState(initHeartCnt);
  const [commentVisible, setCommentVisible] = useState(false);

  const { sendPostRequest, sendDelRequest } = useHttpRequest();

  const favoriteHandler = () => {
    setFavorite(true);
    setHeartCnt(prevState => prevState + 1);
    sendPostRequest({
      endpoint: '/heart',
      bodyData: {
        answerId: answerId,
      },
    });
  };
  const unFavoriteHandler = () => {
    setFavorite(false);
    setHeartCnt(prevState => prevState - 1);
    sendDelRequest({
      endpoint: '/heart',
      bodyData: {
        answerId: answerId,
      },
    });
  };

  const toggleComment = () => {
    setCommentVisible(prevState => !prevState);
  };

  return (
    <Card eveluation={0} variant="outlined" sx={{ marginY: 2 }}>
      <CardContent>
        <Box padding={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component="div" sx={{ fontWeight: 'bold' }}>
            {namae}
          </Typography>
          <Typography>{date.slice(0, 10)}</Typography>
        </Box>
        <Box padding={1}>
          <Typography sx={{ lineBreak: 'anywhere' }}>
            <Linkify properties={{ target: '_blank' }}>{answer}</Linkify>
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ marginLeft: 1, color: 'text.secondary', display: 'flex', gap: '5px' }}
      >
        {favorite && <FavoriteIcon sx={{ cursor: 'pointer' }} onClick={unFavoriteHandler} />}
        {!favorite && <FavoriteBorderIcon sx={{ cursor: 'pointer' }} onClick={favoriteHandler} />}
        <Typography>{heartCnt}</Typography>
        <CommentIcon sx={{ cursor: 'pointer' }} onClick={toggleComment} />
        <Typography>0</Typography>
      </CardActions>
      {commentVisible && <SolCommentList answerId={answerId} />}
    </Card>
  );
};

export default SolutionItem;
