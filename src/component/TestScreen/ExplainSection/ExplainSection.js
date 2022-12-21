import { useState } from 'react';
import ExplainSectionHeader from './ExplainSectionHeader';
import QuestionField from './Question/QuestionField';
import ReferenceList from './Reference/ReferenceList';
import SolutionList from './Solution/SolutionList';

import Box from '@mui/material/Box';
import SubmissionList from './Submission/SubmissionList';

const ExplainSection = ({ questionId }) => {
  const [headerVal, setHeaderVal] = useState(0);

  return (
    <>
      <ExplainSectionHeader
        questionId={questionId}
        headerVal={headerVal}
        setHeaderVal={setHeaderVal}
      />
      <Box
        padding={2}
        sx={{
          height: { md: '75vh' },
          overflow: { md: 'auto' },
        }}
      >
        {headerVal === 0 && <QuestionField questionId={questionId} />}
        {headerVal === 1 && <ReferenceList questionId={questionId} />}
        {headerVal === 2 && <SolutionList questionId={questionId} />}
        {headerVal === 3 && <SubmissionList questionId={questionId} />}
      </Box>
    </>
  );
};
export default ExplainSection;
