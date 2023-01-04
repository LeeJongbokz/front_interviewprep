import { useEffect, useState } from 'react';

import useHttpRequest from '../../../../hook/use-http';

import LoadingSpinner from '../../../UI/LoadingSpinner';
import SolutionItem from './SolutionItem';

let lastQuestionId;
let savedSolution = [];

const SolutionList = ({ questionId }) => {
  const [answerArray, setAnswerArray] = useState([]);
  const { isLoading, sendGetRequest } = useHttpRequest();

  useEffect(() => {
    const answerArrayHandler = data => {
      setAnswerArray(data.data.content);
      lastQuestionId = questionId;
      savedSolution = data?.data?.content || []
    };
    if(lastQuestionId === questionId && savedSolution.length > 0 ){
      setAnswerArray(savedSolution);
    } else if (savedSolution.length === 0 || lastQuestionId !== questionId) {
      sendGetRequest(`/answer/solution/${questionId}/others`, answerArrayHandler);
    }
  }, [sendGetRequest, answerArray.length, questionId]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && answerArray.length < 1 && '등록된 솔루션이 없습니다.'}
      {answerArray.map(item => (
          <SolutionItem
            key={item.answerId}
            answerId={item.answerId}
            namae={item.name}
            answer={item.answer}
            heart={item.heart}
            heartCnt={item.heartCnt}
            commentCnt={item.commentCnt}
            date={item.createdDate}
          />
      ))}
    </>
  );
};

export default SolutionList;
