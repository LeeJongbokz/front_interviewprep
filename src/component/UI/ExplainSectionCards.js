import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Linkify from 'react-linkify';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ExplainSectionCardMoreButton from './ExplainSectionCardMoreButton';

const ExplainSectionCards = ({
  namae,
  content,
  heartCnt,
  availFav = false,
  myown = false,
  date = "XXXX-XX-XX",
  favorite,
  favHandler = () => {},
  unFavHandler = () => {},
  availComment = false,
  CommentIconHandler = () => {},
  visibleChildren = false,
  children,
}) => {
  const favButton = () => {
    if (availFav) {
      if (favorite) {
        return <FavoriteIcon sx={{ cursor: 'pointer' }} onClick={unFavHandler} />;
      } else {
        return <FavoriteBorderIcon sx={{ cursor: 'pointer' }} onClick={favHandler} />;
      }
    } else {
      return <Typography>추천 수 :</Typography>;
    }
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
          <Typography sx={{ lineBreak:"anywhere"}}><Linkify properties={{target: '_blank'}}>{content}</Linkify></Typography>
        </Box>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ marginLeft: 1, color: 'text.secondary', display: 'flex', gap: '5px' }}
      >
        {favButton()}
        <Typography>{heartCnt}</Typography>
        {availComment && (
          <>
            <CommentIcon sx={{ cursor: 'pointer' }} onClick={CommentIconHandler} />
            <Typography>0</Typography>
          </>
        )}
        {myown && <ExplainSectionCardMoreButton />}
      </CardActions>
      {visibleChildren && children}
    </Card>
  );
};

export default ExplainSectionCards;
