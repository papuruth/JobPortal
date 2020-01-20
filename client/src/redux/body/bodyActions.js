import bodyService from './bodyService';
import bodyConstants from './bodyConstants';
import history from '../../_helpers/history';
import alertActions from '../alert/alertActions';

function getJobs(page) {
  function request() { return { type: bodyConstants.JOBS_REQUEST }; }
  function success(jobs) { return { type: bodyConstants.JOBS_SUCCESS, jobs }; }
  function failure(error) { return { type: bodyConstants.JOBS_FAILURE, error }; }
  return (dispatch) => {
    dispatch(request(page));
    bodyService.getJobs(page)
      .then((jobs) => {
        console.log(jobs);
        dispatch(success(jobs));
        history.push('/');
      })
      .catch((error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error.message));
      });
  };
}

const bodyActions = {
  getJobs,
};

export default bodyActions;
