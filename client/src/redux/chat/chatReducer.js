import chatConstants from './chatConstants';

export function saveMessage(state = {}, action) {
  switch (action.type) {
    case chatConstants.MESSAGE_SAVE_REQUEST:
      return {};
    case chatConstants.MESSAGE_SAVE_SUCCESS:
      return {
        message: action.payload
      };
    case chatConstants.MESSAGE_SAVE_FAILURE:
      return {};
    default:
      return state;
  }
}

export function getMessage(state = {}, action) {
  switch (action.type) {
    case chatConstants.GET_MESSAGE_REQUEST:
      return {};
    case chatConstants.GET_MESSAGE_SUCCESS:
      return {
        chats: action.payload
      };
    case chatConstants.GET_MESSAGE_FAILURE:
      return {};
    default:
      return state;
  }
}

export function getOnlineUser(state={
  onlineUser: []
}, action) {
  switch (action.type) {
    case chatConstants.GET_ONLINE_USER_REQUEST:
      return {...state};
    case chatConstants.GET_ONLINE_USER_SUCCESS:
      return {
        ...state,
        onlineUser: action.payload
      };
    case chatConstants.GET_ONLINE_USER_FAILURE:
      return {...state};
    default:
      return state;
  }
}
