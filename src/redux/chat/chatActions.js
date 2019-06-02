import { chatService } from './chatService'
import { chatConstants } from './chatConstants'
import { alertActions } from '../alert/alertActions'

export const chatActions = {
  saveMessage,
  getMessages
};

function saveMessage(sender, receiver, message, date) {
  return dispatch => {
    dispatch(request(sender, receiver, message, date));
    chatService.saveMessage(sender, receiver, message, date)
      .then((data) => {
        dispatch(success(data));
      })
      .catch((error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error.message));
      })
  };

  function request() { return { type: chatConstants.MESSAGE_SAVE_REQUEST } }
  function success(data) { return { type: chatConstants.MESSAGE_SAVE_SUCCESS, data } }
  function failure(error) { return { type: chatConstants.MESSAGE_SAVE_FAILURE, error } }
}

function getMessages(sender, receiver) {
  return dispatch => {
    dispatch(request(sender, receiver));
    chatService.getMessages(sender, receiver)
      .then((data) => {
        dispatch(success(data))
      })
      .catch((error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error.message));
      })
  };

  function request() { return { type: chatConstants.GET_MESSAGE_REQUEST } }
  function success(data) { return { type: chatConstants.GET_MESSAGE_SUCCESS, data } }
  function failure(error) { return { type: chatConstants.GET_MESSAGE_FAILURE, error } }
}