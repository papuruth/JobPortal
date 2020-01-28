import userConstants from './userConstants';


export function authentication(state = {}, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {};
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        currentUser: action.payload,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
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
        registering: true,
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
        users: action.payload,
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
        logoutUser: action.payload,
      };
    case userConstants.USERS_LOGOUT_FAILURE:
      return {};
    default:
      return state;
  }
}


