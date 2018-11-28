import { getQuestions, getCategories } from 'app/questions/index';

const categories = getCategories();

const getStateInformation = (state) => {
  const categoryIndex = state.category.index;
  const type = categories[categoryIndex].name;
  const questionIndex = state[type].index;
  const questions = getQuestions(type);
  const question = questions[questionIndex];
  let { index, compiledCode } = state[type];
  let code = (state[type][index] && state[type][index].code) || questions[questionIndex].content;
  const remoteQuestion = state[type].remoteQuestion;
  if (remoteQuestion) {
    code = (remoteQuestion && remoteQuestion.code) || code;
    // compiledCode = ''; //cause component update
  }
  console.log('#getStateInformation', remoteQuestion)
  return {
    type,
    categoryIndex,
    questionIndex,
    questions,
    question,
    code,
    compiledCode,
    remoteQuestion
  };
};

export {
  getStateInformation
};
