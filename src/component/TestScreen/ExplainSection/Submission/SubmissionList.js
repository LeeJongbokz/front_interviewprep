import { useState, useEffect } from 'react';
import LoadingSpinner from '../../../UI/LoadingSpinner';

import SubmissionItem from './SubmissionItem';
import useHttpRequest from '../../../../hook/use-http';
import { getStaticSubmission, setStaticSubmission } from '../../TestScreenVariables';

const SubmissionList = ({ questionId }) => {
  const { isLoading, sendGetRequest } = useHttpRequest();
  const [submissionList, setSubmissionList] = useState(getStaticSubmission());

  useEffect(() => {
    const submissionHandler = data => {
      setSubmissionList(data.data.content);
      setStaticSubmission(data.data.content);
    };
    if(submissionList.length < 1) {
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
