import { useState, useEffect } from 'react';

import ReferenceItem from './ReferenceItem';
import ReferenceForm from './ReferenceForm';

import useHttpRequest from '../../../../hook/use-http';
import LoadingSpinner from '../../../UI/LoadingSpinner';

let lastQuestionId;

let savedReference = [];

const ReferenceList = ({ questionId }) => {
  if( questionId !== lastQuestionId){
    savedReference = [];
  }
  const [reference, setReference] = useState(savedReference);
  const { isLoading, sendGetRequest } = useHttpRequest();

  const saveReference = (newReference) => savedReference = newReference;

  useEffect(() => {
    const referenceListHandler = data => {
      if (data.success) {
        setReference(data.data.content);
      } 
      savedReference = data?.data?.content || [];
      lastQuestionId = questionId;
    };
    if( lastQuestionId === questionId && savedReference.length > 0 ){
      // setReference(savedReference);
    } else if (savedReference.length === 0 || lastQuestionId !== questionId) {
      sendGetRequest(`/question/ref/${questionId}`, referenceListHandler);
    }
  }, [questionId, sendGetRequest, reference.length]);
  
  return (
    <>
      <ReferenceForm questionId={questionId} saveReference={saveReference} setReferenceList={setReference} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <>
          {reference.length === 0 && '등록된 레퍼런스가 없습니다.'}
          {reference.map(item => (
            <ReferenceItem
              key={item.id}
              refId={item.id}
              namae={item.name}
              content={item.link}
              date={item.createdDate}
              heartCnt={item.heartCnt}
              myown={item.myRef}
              setReference={setReference}
            />
          ))}
        </>
      )}
    </>
  );
};

export default ReferenceList;
