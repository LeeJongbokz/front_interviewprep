import { useState, useEffect } from 'react';

import useHttpRequest from '../../../hook/use-http';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LockSharpIcon from '@mui/icons-material/LockSharp';

const QuestionSectionHeader = ({ questionId, headerVal, setHeaderVal }) => {
  const [solved, setsolved] = useState(false);
  const { isLoading, sendGetRequest } = useHttpRequest();

  const changeHanlder = (e, value) => {
    setHeaderVal(value);
  };

  useEffect(() => {
    const solvedHandler = data => {
      setsolved(data.success);
    };
    sendGetRequest(`/answer/solution/check/${questionId}`, solvedHandler);
  }, [sendGetRequest, questionId]);

  return (
    <>
      {isLoading ? (
        <Tabs />
      ) : (
        <Tabs variant="fullWidth" centered value={headerVal} onChange={changeHanlder}>
          <Tab disableRipple={true} label="문제" />
          <Tab disableRipple={true} label="참고 자료" />
          {solved ? (
            <Tab disableRipple={true} label="다른답변" />
          ) : (
            <Tab
              label="다른 답변"
              wrapped={true}
              sx={{ minHeight: 48 }}
              icon={<LockSharpIcon margin={0} sx={{ fontSize: 15 }} />}
              iconPosition="end"
              disabled
            />
          )}
          <Tab disableRipple={true} label="나의 답변" />
        </Tabs>
      )}
    </>
  );
};
export default QuestionSectionHeader;
