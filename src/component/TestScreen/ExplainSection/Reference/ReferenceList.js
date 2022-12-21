import { useState, useEffect } from 'react';

import ReferenceItem from './ReferenceItem';
import ReferenceForm from './ReferenceForm';

import useHttpRequest from '../../../../hook/use-http';
import LoadingSpinner from '../../../UI/LoadingSpinner';

import { getStaticReference, setStaticReference } from '../../TestScreenVariables';

const ReferenceList = ({ questionId }) => {
  const [reference, setReference] = useState(getStaticReference());
  const { isLoading, sendGetRequest } = useHttpRequest();

  useEffect(() => {
    const referenceListHandler = data => {
      if (data.success) {
        setReference(data.data.content);
        setStaticReference(data.data.content);
      }
    };
    if(reference.length < 1 ){
      sendGetRequest(`/question/ref/${questionId}`, referenceListHandler);
    }
  }, [questionId, sendGetRequest, reference.length]);

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
