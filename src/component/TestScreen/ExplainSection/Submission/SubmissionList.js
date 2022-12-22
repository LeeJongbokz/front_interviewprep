import { useState, useEffect } from 'react';
import LoadingSpinner from '../../../UI/LoadingSpinner';

import SubmissionItem from './SubmissionItem';
import useHttpRequest from '../../../../hook/use-http';


let lastQuestionId;
let savedSubmission = [];

const SubmissionList = ({ questionId }) => {
  const [submissionList, setSubmissionList] = useState([]);
  const { isLoading, sendGetRequest } = useHttpRequest();

  useEffect(() => {
    const submissionHandler = data => {
      setSubmissionList(data.data.content);
      lastQuestionId = questionId;
      savedSubmission = data?.data?.content || [];  
    };

    if( lastQuestionId === questionId && savedSubmission.length > 0 ){
      setSubmissionList(savedSubmission);
    } else if (savedSubmission.length === 0 || lastQuestionId !== questionId) {
      sendGetRequest(`/answer/solution/${questionId}/my`, submissionHandler);
    }
  }, [sendGetRequest, questionId, submissionList.length ]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && submissionList.length < 1 && "답변 내역이 없습니다." }
      {submissionList.map((item, index) => (
        <SubmissionItem
          key={item.answerId}
          idx={+index + 1}
          date={item.createdDate}
          answerId={item.answerId}
          answer={item.answer}
          heartCnt={item.heartCnt}
        />
      ))}
    </>
  );
};

export default SubmissionList;
