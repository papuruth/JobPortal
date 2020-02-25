import jobService from './jobService';
import jobConstants from './jobConstants';
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

function failure(type, payload) {
  return {
    type,
    payload
  };
}

function addJob(company, profile, designation, salary, city, data) {
  return (dispatch) => {
    dispatch(request(jobConstants.ADD_JOB_REQUEST, company));
    jobService
      .addJob(company, profile, designation, salary, city, data)
      .then((job) => {
        if (job === true) {
          dispatch(alertActions.error('Job Exists'));
        } else {
          dispatch(success(jobConstants.ADD_JOB_SUCCESS, job));
          history.push('/');
        }
      })
      .catch((error) => {
        dispatch(failure(jobConstants.ADD_JOB_FAILURE, error));
        dispatch(alertActions.error(error.message));
      });
  };
}

function editJob(id) {
  return (dispatch) => {
    dispatch(request(jobConstants.EDIT_JOB_REQUEST, id));
    jobService
      .editJob(id)
      .then(async (job) => {
        await dispatch(success(jobConstants.EDIT_JOB_SUCCESS, job));
        history.push('/updatejob');
      })
      .catch((error) => {
        dispatch(failure(jobConstants.EDIT_JOB_FAILURE, error));
        dispatch(alertActions.error(error.message));
      });
  };
}

function updateJob(id, company, profileType, designation, annualSalary, city, status) {
  return (dispatch) => {
    dispatch(request(jobConstants.UPDATE_JOB_REQUEST, id));
    jobService
      .updateJob(id, company, profileType, designation, annualSalary, city, status)
      .then((job) => {
        if (job !== null) {
          dispatch(alertActions.success('Job successfully updated'));
          dispatch(success(jobConstants.UPDATE_JOB_SUCCESS, job));
          history.push('/');
        }
      })
      .catch((error) => {
        dispatch(failure(jobConstants.UPDATE_JOB_FAILURE, error));
        dispatch(alertActions.error(error.message));
      });
  };
}

function applyJob(id, name, gender) {
  return (dispatch) => {
    dispatch(request(jobConstants.APPLY_JOB_REQUEST, true));
    jobService
      .applyJob(id, name, gender)
      .then((res) => {
        if (res === 'Successful') {
          dispatch(alertActions.success('Job successfully applied'));
          setTimeout(() => {
            dispatch(success(jobConstants.APPLY_JOB_SUCCESS, res));
          }, 500);
        } else {
          dispatch(alertActions.error(res));
        }
      })
      .catch((error) => {
        dispatch(failure(jobConstants.APPLY_JOB_FAILURE, error));
        dispatch(alertActions.error(error.message));
      });
  };
}

function getAppliedJob(name) {
  return (dispatch) => {
    dispatch(request(jobConstants.GET_APPLIED_JOB_REQUEST, name));
    jobService
      .getAppliedJob(name)
      .then((res) => {
        dispatch(success(jobConstants.APPLY_JOB_SUCCESS, false));
        dispatch(success(jobConstants.GET_APPLIED_JOB_SUCCESS, res));
      })
      .catch((error) => {
        dispatch(failure(jobConstants.GET_APPLIED_JOB_FAILURE, error));
        dispatch(alertActions.error(error.message));
      });
  };
}

function removeJob(id) {
  return (dispatch) => {
    dispatch(request(jobConstants.REMOVE_JOB_REQUEST, id));
    jobService
      .removeJob(id)
      .then((res) => {
        dispatch(success(jobConstants.REMOVE_JOB_SUCCESS, res));
        history.push('/');
      })
      .catch((error) => {
        dispatch(failure(jobConstants.REMOVE_JOB_FAILURE, error));
        dispatch(alertActions.error(error.message));
      });
  };
}

function updateStatus(id, status) {
  return (dispatch) => {
    dispatch(request(jobConstants.UPDATE_APPLIED_STATUS_REQUEST, id));
    jobService
      .updateStatus(id, status)
      .then((data) => {
        dispatch(success(jobConstants.UPDATE_APPLIED_STATUS_SUCCESS, data));
        history.push('/');
      })
      .catch((error) => {
        dispatch(failure(jobConstants.UPDATE_APPLIED_STATUS_FAILURE, error));
        dispatch(alertActions.error(error.message));
      });
  };
}

const jobAction = {
  addJob,
  editJob,
  updateJob,
  applyJob,
  getAppliedJob,
  removeJob,
  updateStatus
};
export default jobAction;
