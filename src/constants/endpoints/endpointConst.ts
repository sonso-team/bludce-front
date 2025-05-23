const API_URL: string = 'https://bank.uwu-devcrew.ru';
const WS_URL: string = 'wss://bank.uwu-devcrew.ru';
const AUTH_REFRESH: string = '/api/auth/refresh';
const AUTH_LOGIN: string = '/api/auth/authorization';
const AUTH_REG: string = '/api/auth/registration';
const AUTH_SEND_CODE: string = '/api/auth/send-code';
const AUTH_LOGOUT: string = '/api/auth/logout';
const AUTH_WHO_AM_I: string = '/api/auth/who-am-i';

const BILL_SEND: string = '/api/receipt';
const BILL_CONFIRM: string = '/api/receipt/position';

const HISTORY_GET: string = '/api/receipt/history';

export {
  WS_URL,
  API_URL,
  AUTH_REFRESH,
  AUTH_REG,
  AUTH_LOGOUT,
  AUTH_LOGIN,
  AUTH_SEND_CODE,
  AUTH_WHO_AM_I,
  BILL_SEND,
  BILL_CONFIRM,
  HISTORY_GET,
};
