import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExportConfig from 'aws-exports';
import * as mutations from 'graphql/mutations';

Amplify.configure(awsExportConfig);

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
