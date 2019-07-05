import { profileService } from './profileService'
import { profileConstants } from './profileConstants'
import { history } from '../../_helpers/history'
import { alertActions } from '../alert/alertActions'

export const profileActions = {
  updateProfile,
  sendMail
};

function updateProfile(id, data, emailId) {
  return dispatch => {
    dispatch(request(id));
    profileService.updateProfile(id, data, emailId)
      .then((data) => {
        dispatch(success(data));
        history.push('/profile');
      })
      .catch((error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error.message));
      })
  };

  function request() { return { type: profileConstants.PROFILE_UPDATE_REQUEST } }
  function success(data) { return { type: profileConstants.PROFILE_UPDATE_SUCCESS, data } }
  function failure(error) { return { type: profileConstants.PROFILE_UPDATE_FAILURE, error } }
}

function sendMail(fullname, email, subject, message) {
  return dispatch => {
    dispatch(request(fullname, email, subject, message));
    profileService.sendMail(fullname, email, subject, message)
      .then((status) => {
        if (status === 'success') {
          dispatch(alertActions.success('Message Sent.'));
          dispatch(success(status));
        } else {
          dispatch(alertActions.error('Message failed to send.'))
        }
      })
      .catch((error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error.message));
      })
  };

  function request() { return { type: profileConstants.SEND_MAIL_REQUEST } }
  function success(status) { return { type: profileConstants.SEND_MAIL_SUCCESS, status } }
  function failure(error) { return { type: profileConstants.SEND_MAIL_FAILURE, error } }
}