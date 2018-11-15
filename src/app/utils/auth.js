import Amplify, { Auth } from 'aws-amplify';
import aws_exports from 'aws-exports';

Amplify.configure(aws_exports);

const login = async ({ username, password }) => {
  result = await Auth.signIn(username, password);
  return result;
}

export {
  login
}
