import { useState, useEffect } from 'react';

import ReferenceItem from './ReferenceItem';
import ReferenceForm from './ReferenceForm';

import useHttpRequest from '../../../../hook/use-http';
import LoadingSpinner from '../../../UI/LoadingSpinner';

// const REFERENCE_LIST = [
//   {
//     id: 1,
//     namae: 'alpha',
//     content: 'Reference #1',
//     date: '2022-12-08',
//     heartCnt: 1,
//   },
//   {
//     id: 2,
//     namae: 'beta',
//     content: 'Reference #2',
//     date: '2022-12-09',
//     heartCnt: 3,
//   },
// ];

const ReferenceList = ({ questionId }) => {
  const [reference, setReference] = useState([]);
  const { isLoading, sendGetRequest } = useHttpRequest();

  useEffect(() => {
    const referenceListHandler = data => {
      if (data.success) {
        setReference(data.data.content);
      }
    };
    sendGetRequest(`/question/ref/${questionId}`, referenceListHandler);
  }, [questionId, sendGetRequest]);

  return (
    <>
      <ReferenceForm questionId={questionId} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <>
          {reference.length === 0 && '등록된 레퍼런스가 없습니다.'}
          {reference.map(item => (
            <ReferenceItem
              key={item.id}
              namae={'NAME'}
              content={item.link}
              date={item.createdDate}
              heartCnt={item.heartCnt}
            />
          ))}
        </>
      )}
    </>
  );
};

export default ReferenceList;
