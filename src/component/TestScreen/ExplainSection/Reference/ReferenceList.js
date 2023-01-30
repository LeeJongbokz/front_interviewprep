import ReferenceItem from './ReferenceItem';
import ReferenceForm from './ReferenceForm';

import LoadingSpinner from '../../../UI/LoadingSpinner';
import { useFetchForQuery } from '../fetchForQuery';

const ReferenceList = ({ questionId }) => {
  const url = `/question/ref/${questionId}`;
  const queryKey = `reference_${questionId}`
  const { data: reference, isLoading } = useFetchForQuery(url, queryKey, 10000);
  
  return (
    <>
      <ReferenceForm questionId={questionId} queryKey={queryKey} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && reference.success && 
        <>
          {reference.data.content.length === 0 && '등록된 레퍼런스가 없습니다.'}
          {reference.data.content.map(item => (
            <ReferenceItem
              key={item.id}
              refId={item.id}
              namae={item.name}
              content={item.link}
              date={item.createdDate}
              heartCnt={item.heartCnt}
              myown={item.myRef}
              queryKey={queryKey}
            />
          ))}
        </>
      }
    </>
  );
};

export default ReferenceList;
