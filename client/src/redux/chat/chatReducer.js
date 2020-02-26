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
