import { useState } from 'react';

// import useHttpRequest from '../../../../hook/use-http';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExplainSectionCardMoreButton from '../../../UI/ExplainSectionCardMoreButton';
import Linkify from 'react-linkify';

const ReferenceItem = ({ refId, namae, content, date, heartCnt: initHeartCnt, myown = false, setReference }) => {
  const [favorite, setFavorite] = useState(false);
  const [heartCnt, setHeartCnt] = useState(initHeartCnt);

  // const { sendPostRequest } = useHttpRequest();

  const favoriteHandler = () => {
    setFavorite(true);
    setHeartCnt(prevState => prevState + 1);
  };

  const unFavoriteHandler = () => {
    setFavorite(false);
    setHeartCnt(prevState => prevState - 1);
  };

  return (
    <Card eveluation={0} variant="outlined" sx={{ marginY: 2 }}>
      <CardContent>
        <Box padding={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component="div" sx={{ fontWeight: 'bold' }}>
            {namae}
          </Typography>
          <Typography>{date}</Typography>
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
        {myown && <ExplainSectionCardMoreButton refId={refId} setReference={setReference} />}
      </CardActions>
    </Card>
  );
};

export default ReferenceItem;
