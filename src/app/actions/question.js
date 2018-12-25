import { listQuestions, getQuestion } from 'app/utils/question';

import graphqlActionHelper, {
  ACTION_STATE
} from 'app/utils/graphqlActionHelper';

function fetchQuestionList(type) {
  return async dispatch => {
    dispatch(
      graphqlActionHelper({
        method: 'FETCH',
        dataName: 'QUESTION',
        actionState: ACTION_STATE.STARTED
      })
    );
    try {
      const result = await listQuestions(type);
      dispatch(
        graphqlActionHelper({
          method: 'FETCH',
          dataName: 'QUESTION_LIST',
          actionState: ACTION_STATE.SUCCESS,
          result: result.items
        })
      );
    } catch (error) {
      dispatch(
        graphqlActionHelper({
          method: 'FETCH',
          dataName: 'QUESTION',
          actionState: ACTION_STATE.FAILURE,
          result: error
        })
      );
    }
  };
}

function fetchQuestion(id) {
  return async dispatch => {
    dispatch(
      graphqlActionHelper({
        method: 'FETCH',
        dataName: 'QUESTION',
        actionState: ACTION_STATE.STARTED
      })
    );
    try {
      const result = await getQuestion(id);
      dispatch(
        graphqlActionHelper({
          method: 'FETCH',
          dataName: 'QUESTION',
          actionState: ACTION_STATE.SUCCESS,
          result
        })
      );
    } catch (error) {
      dispatch(
        graphqlActionHelper({
          method: 'FETCH',
          dataName: 'QUESTION',
          actionState: ACTION_STATE.FAILURE,
          result: error
        })
      );
    }
  };
}

export { fetchQuestionList, fetchQuestion };
