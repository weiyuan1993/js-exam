import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExportConfig from 'aws-exports';
import * as mutations from '../../graphql/mutations.js';

Amplify.configure(awsExportConfig);

const createRecord = async () => {
  const params = {
    input: {
      subjectId: 'interviewee01',
      history: [],
      timeBegin: parseInt(new Date().getTime() / 1000, 10) // must to be Int
    }
  };
  const { data } = await API.graphql(
    graphqlOperation(mutations.createRecord, params)
  );
  return data.createRecord;
};
const updateRecord = async (newHistory) => {
  const params = {
    input: {
      history: newHistory
    }
  };
  const result = await API.graphql(
    graphqlOperation(mutations.updateRecord, params)
  );
  return result;
};

export { createRecord, updateRecord };
