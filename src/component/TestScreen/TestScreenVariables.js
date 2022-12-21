let testQuestion = '';
export const getTestQuestion = () => testQuestion;
export const setTestQuestion = (newTestQuestion) => testQuestion = newTestQuestion;

let staticReference = [];
export const getStaticReference = () => staticReference;
export const setStaticReference = (newStaticReference) => staticReference = newStaticReference;

let answerList = [];
export const getAnswerList = () => answerList;
export const setAnswerList = (newAnswerList) => answerList = newAnswerList;

let staticSubmission = [];
export const getStaticSubmission = () => staticSubmission;
export const setStaticSubmission = (newStaticSubmission) => staticSubmission = newStaticSubmission;

let testSolved = false;
export const getTestSolved = () => testSolved;
export const setTestSolved = (newTestSolved) => testSolved = newTestSolved;