import { jobConstants } from './jobConstants';

function addjob(state = {}, action) {
  switch (action.type) {
    case jobConstants.ADD_JOB_REQUEST:
      return {};
    case jobConstants.ADD_JOB_SUCCESS:
      return {
        jobs: action.jobs
      };
    case jobConstants.ADD_JOB_FAILURE:
      return {};
    default:
      return state
  }
}

function editJob(state = {}, action) {
  switch (action.type) {
    case jobConstants.EDIT_JOB_REQUEST:
      return {};
    case jobConstants.EDIT_JOB_SUCCESS:
      return {
        editjobs: action.job
      };
    case jobConstants.EDIT_JOB_FAILURE:
      return {};
    default:
      return state
  }
}

function updateJob(state = {}, action) {
  switch (action.type) {
    case jobConstants.UPDATE_JOB_REQUEST:
      return {};
    case jobConstants.UPDATE_JOB_SUCCESS:
      return {
        editjobs: action.job
      };
    case jobConstants.UPDATE_JOB_FAILURE:
      return {};
    default:
      return state
  }
}

function applyJob(state = {}, action) {
  switch (action.type) {
    case jobConstants.APPLY_JOB_REQUEST:
      return {
        apply: action.res
      };
    case jobConstants.APPLY_JOB_SUCCESS:
      return {
        apply: action.res
      };
    case jobConstants.APPLY_JOB_FAILURE:
      return {};
    default:
      return state
  }
}

function getAppliedJobs(state = {}, action) {
  switch (action.type) {
    case jobConstants.GET_APPLIED_JOB_REQUEST:
      return {};
    case jobConstants.GET_APPLIED_JOB_SUCCESS:
      return {
        appliedjobs: action.res
      };
    case jobConstants.GET_APPLIED_JOB_FAILURE:
      return {};
    default:
      return state
  }
}

function removeJob(state = {}, action) {
  switch (action.type) {
    case jobConstants.REMOVE_JOB_REQUEST:
      return {};
    case jobConstants.REMOVE_JOB_SUCCESS:
      return {
        removedjobs: action.res
      };
    case jobConstants.REMOVE_JOB_FAILURE:
      return {};
    default:
      return state
  }
}

function updateStatus(state = {}, action) {
  switch (action.type) {
    case jobConstants.UPDATE_APPLIED_JOB_STATUS_REQUEST:
      return {
        mails: action.data
      };
    case jobConstants.UPDATE_APPLIED_STATUS_SUCCESS:
      return {
        mails: action.data
      };
    case jobConstants.UPDATE_APPLIED_JOB_STATUS_FAILURE:
      return {};
    default:
      return state
  }
}

export {
  addjob,
  editJob,
  updateJob,
  applyJob,
  getAppliedJobs,
  removeJob,
  updateStatus
}