import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExportConfig from 'aws-exports';
import * as mutations from 'graphql/mutations';
import * as subscriptions from 'graphql/subscriptions';

Amplify.configure(awsExportConfig);

const createRoom = async subjectId => {
  const roomNum = Math.floor(Math.random() * 98) + 1;
  const roomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  const params = {
    input: {
      description: roomChar + roomNum,
      subjectId,
    },
  };
  const { data } = await API.graphql(
    graphqlOperation(mutations.createRoom, params),
  );
  return data.createRoom;
};

const createTest = async subjectId => {
  const params = {
    input: {
      subjectId,
    },
  };
  const { data } = await API.graphql(
    graphqlOperation(mutations.createTest, params),
  );
  return data.createTest;
};

const getRoom = async roomId => {
  const query = `query {
    getRoom(id: "${roomId}") {
      id
      test {
        id
        subjectId
        description
        timeBegin
        timeEnd
        status
        tags
      }
      subjectId
      description
      status
      host {
        id
        name
      }
      createTime
      password
      users {
        items {
          id
          name
        }
        nextToken
      }
      currentRecord {
        id
        subjectId
        syncCode
        timeBegin
        timeEnd
        videoUrl
        ques {
          name
          type
          content
          test
        }
      }
    }
  }`;
  const { data } = await API.graphql(graphqlOperation(query));
  return data.getRoom;
};

const deleteRoom = async id => {
  const params = {
    input: {
      id,
    },
  };
  const { data } = await API.graphql(
    graphqlOperation(mutations.deleteRoom, params),
  );
  return data.deleteRoom;
};

const updateRoom = async (id, rest) => {
  const params = {
    input: {
      id,
      ...rest,
    },
  };
  const result = await API.graphql(
    graphqlOperation(mutations.updateRoom, params),
  );
  return result;
};

const subscribeOnUpdateRoom = callback => {
  API.graphql(graphqlOperation(subscriptions.onUpdateRoom)).subscribe({
    next: ({ value }) => {
      callback(value.data.onUpdateRoom);
    },
    error: error => {
      console.error(error);
    },
  });
};

export {
  subscribeOnUpdateRoom,
  createRoom,
  getRoom,
  deleteRoom,
  createTest,
  updateRoom,
};
