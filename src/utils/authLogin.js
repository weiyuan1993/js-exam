const authLogin = (s) => `${new Date().getFullYear() * new Date().getMonth() * new Date().getDate() * new Date().getHours()}`.slice(0, 4) === s;

export {
  authLogin
}