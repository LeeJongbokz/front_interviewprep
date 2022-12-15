import { useState } from 'react';
import ExplainSectionCards from '../../../UI/ExplainSectionCards';
import useHttpRequest from '../../../../hook/use-http';

import SolCommentList from './SolCommentList';

const SolutionItem = ({ answerId, namae, answer, heartCnt: initHeartCnt, heart }) => {
  const [favorite, setFavorite] = useState(heart);
  const [heartCnt, setHeartCnt] = useState(initHeartCnt);
  const [commentVisible, setCommentVisible] = useState(false);

  const { sendPostRequest } = useHttpRequest();

  const favoriteHandler = () => {
    console.log('FAV');
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
    console.log('UN_FAV');
    setFavorite(false);
    setHeartCnt(prevState => prevState - 1);
  };

  const toggleComment = () => {
    console.log('Tog Comm');
    setCommentVisible(prevState => !prevState);
  };

  return (
    <ExplainSectionCards
      namae={namae}
      answer={answer}
      heartCnt={heartCnt}
      availFav={true}
      availComment={true}
      favorite={favorite}
      favHandler={favoriteHandler}
      unFavHandler={unFavoriteHandler}
      visibleChildren={commentVisible}
      CommentIconHandler={toggleComment}
    >
      <SolCommentList answerId={answerId} />
    </ExplainSectionCards>
  );
};

export default SolutionItem;
