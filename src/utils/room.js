import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from 'graphql/mutations';
import * as subscriptions from 'graphql/subscriptions';

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

export { subscribeOnUpdateRoom, getRoom, deleteRoom, updateRoom };
