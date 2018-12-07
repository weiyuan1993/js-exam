import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExportConfig from 'aws-exports';
import * as mutations from '../../graphql/mutations.js';
import * as subscriptions from '../../graphql/subscriptions.js';

Amplify.configure(awsExportConfig);

const createRecord = async (subjectId) => {
  const params = {
    input: {
      subjectId,
      history: [],
      timeBegin: parseInt(new Date().getTime() / 1000, 10) // must to be Int
    }
  };
  const { data } = await API.graphql(
    graphqlOperation(mutations.createRecord, params)
  );
  console.log(data)
  return data.createRecord;
};
const updateRecord = async (id, newHistory) => {
  const params = {
    input: {
      id,
      history: [newHistory],
      timeEnd: parseInt(new Date().getTime() / 1000, 10) // must to be Int
    }
  };
  const result = await API.graphql(
    graphqlOperation(mutations.updateRecord, params)
  );
  return result;
};

const subscribeOnCreateRecord = async (callback) => {
  API.graphql(graphqlOperation(subscriptions.onCreateRecord)).subscribe({
    next: ({ value }) => {
      callback(value.data.onCreateRecord);
    }
  });
};

const subscribeOnUpdateRecord = async (callback) => {
  API.graphql(graphqlOperation(subscriptions.onUpdateRecord)).subscribe({
    next: ({ value }) => {
      callback(value.data.onUpdateRecord);
    }
  });
};
export {
  createRecord,
  updateRecord,
  subscribeOnCreateRecord,
  subscribeOnUpdateRecord
};
