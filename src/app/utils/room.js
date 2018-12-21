import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExportConfig from 'aws-exports';
import * as mutations from '../../graphql/mutations.js';
import * as subscriptions from '../../graphql/subscriptions.js';

Amplify.configure(awsExportConfig);

const createRoom = async (description, subjectId) => {
  const params = {
    input: {
      description,
      subjectId,
    }
  };
  const { data } = await API.graphql(
    graphqlOperation(mutations.createRoom, params)
  );
  return data.createRoom;
};

const createTest = async (subjectId) => {
  const params = {
    input: {
      subjectId,
    }
  };
  const { data } = await API.graphql(
    graphqlOperation(mutations.createTest, params)
  );
  return data.createTest;
};


export {
  createRoom,
  createTest,
};
