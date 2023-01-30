import { useState } from 'react';

import useHttpRequest from '../../../../hook/use-http';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExplainSectionCardMoreButton from './ExplainSectionCardMoreButton';
import Linkify from 'react-linkify';

const ReferenceItem = ({ refId, namae, content, date = "0000-00-00", heartCnt: initHeartCnt, myown = false, queryKey }) => {
  const [favorite, setFavorite] = useState(false);
  const [heartCnt, setHeartCnt] = useState(initHeartCnt);

  const { sendPostRequest, sendDelRequest } = useHttpRequest();

  const favoriteHandler = () => {
    setFavorite(true);
    setHeartCnt(prevState => prevState + 1);
    sendPostRequest({
      endpoint: `/ref-heart/${refId}`
    });
  };

  const unFavoriteHandler = () => {
    setFavorite(false);
    setHeartCnt(prevState => prevState - 1);
    sendDelRequest({
      endpoint: `/ref-heart/${refId}`
    });
  };

  return (
    <Card eveluation={0} variant="outlined" sx={{ marginY: 2 }}>
      <CardContent>
        <Box padding={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component="div" sx={{ fontWeight: 'bold' }}>
            {namae}
          </Typography>
          <Typography>{date.slice(0,10)}</Typography>
        </Box>
        <Box padding={1}>
          <Typography sx={{ lineBreak: 'anywhere' }}>
            <Linkify
              componentDecorator={(decoratedHref, decoratedText) => (
                <a target="blank" href={decoratedHref}>
                  {decoratedText}
                </a>
              )}
            >
              {content}
            </Linkify>
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
        {myown && <ExplainSectionCardMoreButton refId={refId} queryKey={queryKey} />}
      </CardActions>
    </Card>
  );
};

export default ReferenceItem;
