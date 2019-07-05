import { bodyConstants } from './bodyConstants';

export function jobs(state = {}, action) {
  switch (action.type) {
    case bodyConstants.JOBS_REQUEST:
      return {};
    case bodyConstants.JOBS_SUCCESS:
      return {
        jobs: action.jobs
      };
    case bodyConstants.JOBS_FAILURE:
      return {};
    default:
      return state
  }
}
