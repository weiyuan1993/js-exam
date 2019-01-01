import Amplify, { Auth } from 'aws-amplify';
import awsExports from 'aws-exports';

Amplify.configure(awsExports);

const login = async ({ username, password }) => {
  const result = await Auth.signIn(username, password);
  return result;
};

export { login };
