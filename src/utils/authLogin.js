const authLogin = (s) => `${(new Date().getFullYear() + 1) * (new Date().getMonth() + 1) * (new Date().getDate() + 1) * (new Date().getHours() + 1)}`.slice(0, 4) === s;

export {
  authLogin
}