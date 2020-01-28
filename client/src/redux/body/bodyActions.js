import bodyService from './bodyService';
import bodyConstants from './bodyConstants';
import alertActions from '../alert/alertActions';
import userConstants from '../user/userConstants';

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
function failure(type, error) {
  return {
    type,
    error,
  };
}


function getJobs(page, role = null, name = null) {
  return (dispatch) => {
    dispatch(request(bodyConstants.JOBS_REQUEST, page));
    dispatch(success(userConstants.USERS_LOGOUT_SUCCESS, false));
    bodyService.getJobs(page, role, name)
      .then((jobs) => {
        dispatch(success(bodyConstants.JOBS_SUCCESS, jobs));
      })
      .catch((error) => {
        dispatch(failure(bodyConstants.JOBS_FAILURE, error));
        dispatch(alertActions.error(error.message));
      });
  };
}

const bodyActions = {
  getJobs,
};

export default bodyActions;
