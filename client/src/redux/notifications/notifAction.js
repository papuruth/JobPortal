import notifService from './notifService';
import notifConstants from './notifConstants';
import alertActions from '../alert/alertActions';

function request(type, payload) {
  return {
    type,
    payload,
  };
}

function success(type, payload) {
  return {
    type,
    payload,
  };
}

function failure(type, payload) {
  return {
    type,
    payload,
  };
}

function getNotifications() {
  return (dispatch) => {
    dispatch(request(notifConstants.GET_NOTIFICATION_REQUEST, null));
    notifService.getNotifications()
      .then((data) => {
        dispatch(success(notifConstants.GET_NOTIFICATION_SUCCESS, data));
      })
      .catch((error) => {
        dispatch(failure(notifConstants.GET_NOTIFICATION_FAILURE, error));
        dispatch(alertActions.error(error.message));
      });
  };
}

const notifAction = {
  getNotifications
};

export default notifAction;
