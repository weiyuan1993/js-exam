import md5 from 'blueimp-md5';
import moment from 'moment';

const authLogin = (s) => `${parseInt(md5(moment().utc().format('YYYY-MM-DD HH')).slice(0, 10))}`.slice(0, 4) === s;

export {
  authLogin
}