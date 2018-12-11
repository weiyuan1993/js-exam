import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExportConfig from 'aws-exports';
import * as mutations from '../../graphql/mutations.js';
import * as subscriptions from '../../graphql/subscriptions.js';

Amplify.configure(awsExportConfig);

const createRecord = async (subjectId) => {
  const params = {
    input: {
      subjectId,
      timeBegin: parseInt(new Date().getTime() / 1000, 10) // must to be Int
    }
  };
  const { data } = await API.graphql(
    graphqlOperation(mutations.createRecord, params)
  );
  return data.createRecord;
};
const updateRecord = async (id, newCode) => {
  const params = {
    input: {
      id,
      syncCode: newCode,
      timeEnd: parseInt(new Date().getTime() / 1000, 10) // must to be Int
    }
  };
  const result = await API.graphql(
    graphqlOperation(mutations.updateRecord, params)
  );
  return result;
};

const subscribeOnCreateRecord = callback => {
  API.graphql(graphqlOperation(subscriptions.onCreateRecord)).subscribe({
    next: ({ value }) => {
      callback(value.data.onCreateRecord);
    },
    error: error => {
      console.error(error);
    }
  });
};

const subscribeOnUpdateRecord = callback => {
  API.graphql(graphqlOperation(subscriptions.onUpdateRecord)).subscribe({
    next: ({ value }) => {
      callback(value.data.onUpdateRecord);
    },
    error: error => {
      console.error(error);
    }
  });
};
export {
  createRecord,
  updateRecord,
  subscribeOnCreateRecord,
  subscribeOnUpdateRecord
};
