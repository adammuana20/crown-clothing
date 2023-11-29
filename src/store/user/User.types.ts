export enum USER_ACTION_TYPES {
  SET_CURRENT_USER = 'user/SET_CURRENT_USER',
  CHECK_USER_SESSION = 'user/CHECK_USER_SESSION',
  GOOGLE_SIGN_IN_START = 'user/GOOGLE_SIGN_IN_START',
  EMAIL_SIGN_IN_START = 'user/EMAIL_SIGN_IN_START',
  SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS',
  SIGN_IN_FAILED = 'user/SIGN_IN_FAILED',
  SIGN_UP_START = 'user/SIGN_UP_START',
  SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS',
  SIGN_UP_FAILED = 'user/SIGN_UP_FAILED',
  SIGN_OUT_START = 'user/SIGN_OUT_START',
  SIGN_OUT_SUCCESS = 'user/SIGN_OUT_SUCCESS',
  SIGN_OUT_FAILED = 'user/SIGN_OUT_FAILED',
  CLEAR_ERROR_MESSAGE = 'user/CLEAR_ERROR_MESSAGE',
  SET_PROVIDER_ID_START = 'user/SET_PROVIDER_ID_START',
  SET_PROVIDER_ID_SUCCESS = 'user/SET_PROVIDER_ID_SUCCESS',
  SET_PROVIDER_ID_FAILED = 'user/SET_PROVIDER_ID_FAILED',
  UPDATE_USER_INFO_START = 'user/UPDATE_USER_INFO_START',
  UPDATE_USER_INFO_SUCCESS = 'user/UPDATE_USER_INFO_SUCCESS',
  UPDATE_USER_INFO_FAILED = 'user/UPDATE_USER_INFO_FAILED',
  UPDATE_USER_PASSWORD_START = 'user/UPDATE_USER_PASSWORD_START',
  UPDATE_USER_PASSWORD_SUCCESS = 'user/UPDATE_USER_PASSWORD_SUCCESS',
  UPDATE_USER_PASSWORD_FAILED = 'user/UPDATE_USER_PASSWORD_FAILED',
  FETCH_UPDATED_USER_INFO_START = 'user/FETCH_UPDATED_USER_INFO_START',
  FETCH_UPDATED_USER_INFO_SUCCESS = 'user/FETCH_UPDATED_USER_INFO_SUCCESS',
  FETCH_UPDATED_USER_INFO_FAILED = 'user/FETCH_UPDATED_USER_INFO_FAILED',
};