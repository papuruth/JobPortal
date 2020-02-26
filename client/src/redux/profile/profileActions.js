import profileService from './profileService';
import profileConstants from './profileConstants';
import history from '../../_helpers/history';
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

function updateProfile(id, data, emailId) {
  return (dispatch) => {
    dispatch(request(profileConstants.PROFILE_UPDATE_REQUEST, id));
    profileService
      .updateProfile(id, data, emailId)
      .then((response) => {
        dispatch(success(profileConstants.PROFILE_UPDATE_SUCCESS, response));
        history.push('/profile');
      })
      .catch((error) => {
        dispatch(failure(profileConstants.PROFILE_UPDATE_FAILURE, error));
        dispatch(alertActions.error(error.message));
      });
  };
}

function sendMail(fullname, email, subject, message) {
  return (dispatch) => {
    dispatch(request(profileConstants.SEND_MAIL_REQUEST, null));
    profileService
      .sendMail(fullname, email, subject, message)
      .then((status) => {
        if (status === 'success') {
          dispatch(alertActions.success('Message Sent.'));
          dispatch(success(profileConstants.SEND_MAIL_SUCCESS, status));
        } else {
          dispatch(alertActions.error('Message failed to send.'));
        }
      })
      .catch((error) => {
        dispatch(failure(profileConstants.SEND_MAIL_FAILURE, error));
        dispatch(alertActions.error(error.message));
      });
  };
}

const profileActions = {
  updateProfile,
  sendMail
};

export default profileActions;
