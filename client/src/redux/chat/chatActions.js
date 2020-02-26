import chatService from './chatService';
import chatConstants from './chatConstants';
import alertActions from '../alert/alertActions';

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

function saveMessage(sender, receiver, message, date) {
  return (dispatch) => {
    dispatch(request(chatConstants.MESSAGE_SAVE_REQUEST, null));
    chatService
      .saveMessage(sender, receiver, message, date)
      .then((data) => {
        dispatch(success(chatConstants.MESSAGE_SAVE_SUCCESS, data));
      })
      .catch((error) => {
        dispatch(failure(chatConstants.MESSAGE_SAVE_FAILURE, error));
        dispatch(alertActions.error(error.message));
      });
  };
}

function getMessages(sender, receiver) {
  return (dispatch) => {
    dispatch(request(chatConstants.GET_MESSAGE_REQUEST, null));
    chatService
      .getMessages(sender, receiver)
      .then((data) => {
        dispatch(success(chatConstants.GET_MESSAGE_SUCCESS, data));
      })
      .catch((error) => {
        dispatch(failure(chatConstants.GET_MESSAGE_FAILURE, error));
        dispatch(alertActions.error(error.message));
      });
  };
}

const chatActions = {
  saveMessage,
  getMessages
};
export default chatActions;
