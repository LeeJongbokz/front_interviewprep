import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useFetchForQuery } from '../fetchForQuery';

const QuestionField = ({ questionId }) => {
  const url = `/question/single/${questionId}`;
  const queryKey = `question_${questionId}`
  const { data: questionData } = useFetchForQuery(url, queryKey, 60000);

  return (
    <Box marginTop={2}>
      {questionData?.success && (
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            border: 1,
            borderColor: 'lightgray',
            borderRadius: 4,
            padding: 2,
          }}
        >
          {questionData.data.title}
        </Typography>
      )}
    </Box>
  );
};

export default QuestionField;
