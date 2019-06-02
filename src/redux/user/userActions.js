import { userConstants } from './userConstants';
import { userService } from './userServices';
import { alertActions } from '../alert/alertActions'
import { history } from '../../_helpers/history';


export const userActions = {
  login,
  logout,
  register,
  getAllUsers
};

function login(email, password) {
  return dispatch => {
    dispatch(request({ email }));
    userService.login(email, password)
      .then((user) => {
        if (user === 'Credential not valid') {
          dispatch(alertActions.error(user))
        } else {
          dispatch(alertActions.success('Login Successful'))
          dispatch(success(user));
          history.push('/');
        }
      })
      .catch((error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error.message));
      })
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
  userService.logout();
  history.push('/')
  return { type: userConstants.LOGOUT };
}

function register(fullname, email, password, phone, gender) {
  return dispatch => {
    dispatch(request(email));
    password = btoa(password)
    userService.register(fullname, email, password, phone, gender)
      .then((user) => {
        console.log(user)
        if (user === 'User exists') {
          dispatch(alertActions.error(user));
        } else {
          dispatch(alertActions.success('Registration successful'));
          dispatch(success(user));
          history.push('/login');
        }
      })
      .catch((error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      })
  };

  function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAllUsers() {
  return dispatch => {
    dispatch(request());
    userService.getAllUsers()
      .then((users) => {
          dispatch(success(users));
      })
      .catch((error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      })
  };

  function request(users) { return { type: userConstants.GET_ALL_USERS_REQUEST, users } }
  function success(users) { return { type: userConstants.GET_ALL_USERS_SUCCESS, users } }
  function failure(error) { return { type: userConstants.GET_ALL_USERS_FAILURE, error } }
}