const API_URL: string = 'http://localhost:7200/api';
const AUTH_REFRESH: string = '/auth/refresh';
const AUTH_LOGIN: string = '/auth/authorization';
const AUTH_REG: string = '/auth/registration';
const AUTH_SEND_CODE: string = '/auth/send-code';
const AUTH_LOGOUT: string = '/auth/logout';

const BILL_SEND: string = '/receipt';
const BILL_CONFIRM: string = '/receipt/position';

const HISTORY_GET: string = '/receipt/history';

export {
  API_URL,
  AUTH_REFRESH,
  AUTH_REG,
  AUTH_LOGOUT,
  AUTH_LOGIN,
  AUTH_SEND_CODE,
  BILL_SEND,
  BILL_CONFIRM,
  HISTORY_GET,
};
