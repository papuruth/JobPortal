import userConstants from './userConstants';

export function authUser(state = { authUser: false }, action) {
  switch (action.type) {
    case userConstants.GET_AUTH_USER_REQUEST:
      return state;
    case userConstants.GET_AUTH_USER_SUCCESS:
      return {
        authUser: true
      };
    case userConstants.GET_AUTH_USER_FAILURE:
      return state;
    default:
      return state;
  }
}

export function authentication(
  state = {
    loggedIn: false,
    currentUser: null
  },
  action
) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return { ...state };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        currentUser: action.payload
      };
    case userConstants.LOGIN_FAILURE:
      return { ...state };
    default:
      return state;
  }
}

export function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {};
    case userConstants.REGISTER_SUCCESS:
      return {
        registering: true
      };
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state;
  }
}

export function Users(state = {}, action) {
  switch (action.type) {
    case userConstants.GET_ALL_USERS_REQUEST:
      return {};
    case userConstants.GET_ALL_USERS_SUCCESS:
      return {
        users: action.payload
      };
    case userConstants.GET_ALL_USERS_FAILURE:
      return {};
    default:
      return state;
  }
}

export function Logout(state = {}, action) {
  switch (action.type) {
    case userConstants.USERS_LOGOUT_REQUEST:
      return {};
    case userConstants.USERS_LOGOUT_SUCCESS:
      return {
        logoutUser: action.payload
      };
    case userConstants.USERS_LOGOUT_FAILURE:
      return {};
    default:
      return state;
  }
}
