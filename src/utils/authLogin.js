import md5 from 'blueimp-md5';
import moment from 'moment';

const authLogin = (s) => md5(moment(new Date()).format('YYYY-MM-DD HH')).slice(0, 6) === s;

export {
  authLogin
}