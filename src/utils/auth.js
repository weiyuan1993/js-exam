import { Auth } from 'aws-amplify';

const login = async ({ username, password }) => {
  const result = await Auth.signIn(username, password);
  return result;
};

export { login };
