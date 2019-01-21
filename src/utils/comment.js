import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from 'graphql/mutations';

const createComment = async commentData => {
  const { author, content, commentRecordId } = commentData;
  const params = {
    input: {
      author,
      content,
      commentRecordId,
      time: new Date(),
    },
  };
  const { data } = await API.graphql(
    graphqlOperation(mutations.createComment, params),
  );
  return data.createComment;
};

export default createComment;
