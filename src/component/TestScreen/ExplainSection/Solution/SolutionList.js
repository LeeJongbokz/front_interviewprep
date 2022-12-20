import { useEffect, useState } from 'react';

import useHttpRequest from '../../../../hook/use-http';

import LoadingSpinner from '../../../UI/LoadingSpinner';
import SolutionItem from './SolutionItem';
import { getAnswerList, setAnswerList } from '../../TestScreenVariables';

const SolutionList = ({ questionId }) => {
  const storedAnswerList = getAnswerList();
  const [answerArray, setAnswerArray] = useState(storedAnswerList);

  const { isLoading, sendGetRequest } = useHttpRequest();
  useEffect(() => {
    const answerArrayHandler = data => {
      console.log(data.data.content);
      setAnswerArray(data.data.content);
      setAnswerList(data.data.content);
    };
    if (answerArray.length < 1) {
      sendGetRequest(`/answer/solution/${questionId}/my`, answerArrayHandler);
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
            heartCnt={item.heartCnt}
            date={item.createdDate}
          />
      ))}
    </>
  );
};

export default SolutionList;
