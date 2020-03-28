import { sessionService } from 'redux-react-session';
import userConstants from './userConstants';
import userService from './userServices';
import alertActions from '../alert/alertActions';
import history from '../../_helpers/history';

function request(type, payload) {
  return {
    type,
    payload
  };
}
function success(type, payload) {
  return {
    type,
    payload
  };
}
function failure(type, error) {
  return {
    type,
    error
  };
}

function authUser() {
  return (dispatch) => {
    dispatch(request(userConstants.GET_AUTH_USER_REQUEST, 'requesting'));
    userService
      .authUser()
      .then((response) => {
        if (response.data.user) {
          sessionService
            .saveUser(response.data.user)
            .then(() => {
              sessionService.saveSession(response.data.user);
              dispatch(success(userConstants.GET_AUTH_USER_SUCCESS, true));
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => {
        dispatch(failure(userConstants.GET_AUTH_USER_FAILURE, err));
      });
  };
}

function login(username, password) {
  return (dispatch) => {
    dispatch(request(userConstants.LOGIN_REQUEST, username));
    userService
      .login(username, password)
      .then((response) => {
        if (response.status) {
          // store user details in redux-session to keep user logged in between page refreshes
          sessionService
            .saveSession(response.data.data)
            .then(() => {
              sessionService.saveUser(response.data.data).then(() => {
                dispatch(alertActions.success('Login Successful'));
                dispatch(
                  success(userConstants.LOGIN_SUCCESS, response.data.data)
                );
              });
            })
            .catch((err) => console.error(err));
        } else if (user.message) {
          dispatch(alertActions.error(user.message));
        } else if (user === 'ban') {
          dispatch(
            alertActions.error(
              'You are banned! Please contact admin@jobportal.com'
            )
          );
        }
      })
      .catch((error) => {
        dispatch(failure(userConstants.LOGIN_FAILURE, error));
        dispatch(alertActions.error(error.message));
      });
  };
}

function logout() {
  return (dispatch) => {
    // dispatch(request(userConstants.USERS_LOGOUT_REQUEST, null));
    userService
      .logout()
      .then((res) => {
        if (res) {
          sessionService.deleteUser().then(() => {
            dispatch(success(userConstants.USERS_LOGOUT_SUCCESS, res));
            sessionService
              .deleteSession()
              .then(() => {
                history.push('/');
              })
              .catch((err) => {
                dispatch(
                  alertActions.error(userConstants.USERS_LOGOUT_FAILURE, err)
                );
              });
          });
        }
      })
      .catch((error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(userConstants.USERS_LOGOUT_FAILURE, error));
      });
  };
}

function register(fullname, email, password, phone, gender) {
  return (dispatch) => {
    dispatch(request(userConstants.REGISTER_REQUEST, null));
    userService
      .register(fullname, email, password, phone, gender)
      .then((user) => {
        if (user === 'User exists') {
          dispatch(alertActions.error(user));
        } else {
          dispatch(alertActions.success('Registration successful'));
          dispatch(success(userConstants.REGISTER_SUCCESS, user));
          history.push('/login');
        }
      })
      .catch((error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(userConstants.REGISTER_FAILURE, error));
      });
  };
}

function getAllUsers(param) {
  return (dispatch) => {
    dispatch(request(userConstants.GET_ALL_USERS_REQUEST, null));
    userService
      .getAllUsers(param)
      .then((users) => {
        dispatch(success(userConstants.GET_ALL_USERS_SUCCESS, users));
      })
      .catch((error) => {
        dispatch(failure(error));
        dispatch(
          alertActions.error(userConstants.GET_ALL_USERS_FAILURE, error)
        );
      });
  };
}

function editUser(name, emailId, password, phone, _id) {
  return (dispatch) => {
    dispatch(request(userConstants.EDIT_USER_REQUEST, null));
    userService
      .editUser(name, emailId, password, phone, _id)
      .then((response) => {
        if (response === true) {
          dispatch(success(userConstants.EDIT_USER_SUCCESS, response));
          dispatch(alertActions.success('User edited successfully!!!'));
        } else {
          dispatch(alertActions.error('Unable to edit user!'));
        }
      })
      .catch((error) => {
        dispatch(failure(userConstants.EDIT_USER_FAILURE, error));
        dispatch(alertActions.error(error));
      });
  };
}

function deleteUser(_id) {
  return (dispatch) => {
    dispatch(request(userConstants.DELETE_USER_REQUEST, null));
    userService
      .deleteUser(_id)
      .then((response) => {
        if (response === true) {
          dispatch(success(userConstants.DELETE_USER_SUCCESS, response));
          dispatch(alertActions.success('User deleted successfully!!!'));
        } else {
          dispatch(alertActions.error('Unable to delete user!'));
        }
      })
      .catch((error) => {
        dispatch(failure(userConstants.DELETE_USER_FAILURE, error));
        dispatch(alertActions.error(error));
      });
  };
}

function banUser(_id, userStatus) {
  return (dispatch) => {
    dispatch(request(userConstants.BAN_USER_REQUEST, null));
    userService
      .banUser(_id, userStatus)
      .then((response) => {
        if (response === 'ban') {
          dispatch(success(response));
          dispatch(alertActions.success('User banned successfully!!!'));
        } else if (response === 'unban') {
          dispatch(success(userConstants.BAN_USER_SUCCESS, response));
          dispatch(alertActions.success('User unbanned successfully!!!'));
        } else {
          dispatch(alertActions.error('Unable to ban user!'));
        }
      })
      .catch((error) => {
        dispatch(failure(userConstants.BAN_USER_FAILURE, error));
        dispatch(alertActions.error(error));
      });
  };
}

const userActions = {
  login,
  logout,
  register,
  getAllUsers,
  editUser,
  deleteUser,
  banUser,
  authUser
};

export default userActions;
