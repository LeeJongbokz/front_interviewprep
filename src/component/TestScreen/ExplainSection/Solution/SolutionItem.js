import { useState } from 'react';
import ExplainSectionCards from '../../../UI/ExplainSectionCards';
import useHttpRequest from '../../../../hook/use-http';

import SolCommentList from './SolCommentList';

const SolutionItem = ({ answerId, namae, answer, heartCnt: initHeartCnt, heart, date }) => {
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
    console.log('Tog Comm');
    setCommentVisible(prevState => !prevState);
  };

  return (
    <ExplainSectionCards
      namae={namae}
      content={answer}
      heartCnt={heartCnt}
      availFav={true}
      availComment={true}
      favorite={favorite}
      favHandler={favoriteHandler}
      unFavHandler={unFavoriteHandler}
      visibleChildren={commentVisible}
      CommentIconHandler={toggleComment}
      date={date}
    >
      <SolCommentList answerId={answerId} />
    </ExplainSectionCards>
  );
};

export default SolutionItem;
