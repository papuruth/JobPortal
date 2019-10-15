import { bodyService } from './bodyService'
import { bodyConstants } from './bodyConstants'
import history from '../../_helpers/history'
import { alertActions } from '../alert/alertActions'
import { jobService } from '../addJob/jobService'

export const bodyActions = {
    getJobs
};

function getJobs(page, last) {
    return dispatch => {
        dispatch(request(page));
        bodyService.getJobs(page, last)
            .then((jobs) => {
                jobService.getMails()
                if (jobs === false) {
                    dispatch(alertActions.error(jobs))
                } else {
                    dispatch(success(jobs));
                    history.push('/');
                }
            })
            .catch((error) => {
                dispatch(failure(error));
                dispatch(alertActions.error(error.message));
            })
    };

    function request() { return { type: bodyConstants.JOBS_REQUEST } }
    function success(jobs) { return { type: bodyConstants.JOBS_SUCCESS, jobs } }
    function failure(error) { return { type: bodyConstants.JOBS_FAILURE, error } }
}