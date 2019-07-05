import { jobService } from './jobService'
import { jobConstants } from './jobConstants'
import { history } from '../../_helpers/history'
import { alertActions } from '../alert/alertActions'
import { paginationActions } from '../pagination/paginationActions';

export const jobAction = {
  addJob,
  editJob,
  updateJob,
  applyJob,
  getAppliedJob,
  removeJob,
  updateStatus
};

function addJob(company, profile, designation, salary, city, data) {
  return dispatch => {
    dispatch(request(company));
    jobService.addJob(company, profile, designation, salary, city, data)
      .then((job) => {
        if (job === true) {
          dispatch(alertActions.error('Job Exists'))
        } else {
          dispatch(success(job))
          history.push('/')
        }
      })
      .catch((error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error.message));
      })
  };
  function request(job) { return { type: jobConstants.ADD_JOB_REQUEST, job } }
  function success(job) { return { type: jobConstants.ADD_JOB_SUCCESS, job } }
  function failure(error) { return { type: jobConstants.ADD_JOB_FAILURE, error } }

}

function editJob(id) {
  return dispatch => {
    console.log(id)
    dispatch(request(id));
    jobService.editJob(id)
      .then(async (job) => {
        await dispatch(success(job))
        history.push('/updatejob')
      })
      .catch((error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error.message));
      })
  };
  function request(job) { return { type: jobConstants.EDIT_JOB_REQUEST, job } }
  function success(job) { return { type: jobConstants.EDIT_JOB_SUCCESS, job } }
  function failure(error) { return { type: jobConstants.EDIT_JOB_FAILURE, error } }

}

function updateJob(id, company, profileType, designation, annualSalary, city) {
  return dispatch => {
    dispatch(request(id));
    jobService.updateJob(id, company, profileType, designation, annualSalary, city)
      .then((job) => {
        if (job !== null) {
          dispatch(alertActions.success('Job successfully updated'))
          dispatch(success(job))
          history.push('/')
        }
      })
      .catch((error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error.message));
      })
  };
  function request(job) { return { type: jobConstants.UPDATE_JOB_REQUEST, job } }
  function success(job) { return { type: jobConstants.UPDATE_JOB_SUCCESS, job } }
  function failure(error) { return { type: jobConstants.UPDATE_JOB_FAILURE, error } }

}

function applyJob(id, name, gender) {
  return dispatch => {
    dispatch(request(true));
    jobService.applyJob(id, name, gender)
      .then((res) => {
        console.log(res)
        if (res === 'Successful') {
          dispatch(alertActions.success('Job successfully applied'))
          setTimeout(() => {
            dispatch(success(res))
            history.push('/')
          }, 500)
        } else {
          dispatch(alertActions.error(res))
        }
      })
      .catch((error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error.message));
      })
  };
  function request(res) { return { type: jobConstants.APPLY_JOB_REQUEST, res } }
  function success(res) { return { type: jobConstants.APPLY_JOB_SUCCESS, res } }
  function failure(error) { return { type: jobConstants.APPLY_JOB_FAILURE, error } }
}

function getAppliedJob(name) {
  return dispatch => {
    dispatch(request(name));
    jobService.getAppliedJob(name)
      .then((res) => {
        dispatch(success(res));
      })
      .catch((error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error.message));
      })
  };

  function request() { return { type: jobConstants.GET_APPLIED_JOB_REQUEST } }
  function success(res) { return { type: jobConstants.GET_APPLIED_JOB_SUCCESS, res } }
  function failure(error) { return { type: jobConstants.GET_APPLIED_JOB_FAILURE, error } }
}

function removeJob(id) {
  return dispatch => {
    dispatch(request(id));
    jobService.removeJob(id)
      .then((res) => {
        console.log(res)
        dispatch(paginationActions.getPageData());
        dispatch(success(res))
        history.push('/')
      })
      .catch((error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error.message));
      })
  };

  function request(id) { return { type: jobConstants.REMOVE_JOB_REQUEST, id } }
  function success(res) { return { type: jobConstants.REMOVE_JOB_SUCCESS, res } }
  function failure(error) { return { type: jobConstants.REMOVE_JOB_FAILURE, error } }
}

function updateStatus(id, status) {
  return dispatch => {
    dispatch(request(id));
    jobService.updateStatus(id, status)
      .then((data) => {
        jobService.getMails()
          .then((data) => {
            dispatch(success(data))
            history.push('/')
          })
          .catch((error) => {
            dispatch(failure(error));
            dispatch(alertActions.error(error.message));
          })
      })
      .catch((error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error.message));
      })
  };

  function request(id) { return { type: jobConstants.UPDATE_APPLIED_STATUS_REQUEST, id } }
  function success(data) { return { type: jobConstants.UPDATE_APPLIED_STATUS_SUCCESS, data } }
  function failure(error) { return { type: jobConstants.UPDATE_APPLIED_STATUS_FAILURE, error } }
}