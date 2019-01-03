export const ACTION_STATE = {
  STARTED: 'STARTED',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

export default function graphqlActionHelper({
  method,
  dataName,
  actionState,
  result,
  ...rest
}) {
  switch (actionState) {
    case ACTION_STATE.SUCCESS:
      return {
        type: `${method}_${dataName}_${ACTION_STATE.SUCCESS}`,
        payload: {
          result,
          ...rest,
        },
      };
    case ACTION_STATE.FAILURE:
      return {
        type: `${method}_${dataName}_${ACTION_STATE.FAILURE}`,
        payload: {
          error: result,
        },
      };
    default:
      return {
        type: `${method}_${dataName}_${ACTION_STATE.STARTED}`,
      };
  }
}
