import { paginationService } from './paginationService'
import { paginationConstants } from './paginationConstants'
import { history } from '../../_helpers/history'
import { alertActions } from '../alert/alertActions'

export const paginationActions = {
    getPageData
};

function  getPageData() {
    return dispatch => {
        dispatch(request());
        paginationService.getPageData()
            .then((data) => {
                if (data === false) {
                    dispatch(alertActions.error(data))
                } else {
                    dispatch(success(data));
                    history.push('/');
                }
            })
            .catch((error) => {
                dispatch(failure(error));
                dispatch(alertActions.error(error.message));
            })
    };

    function request() { return { type: paginationConstants.PAGINATION_REQUEST} }
    function success(data) { return { type: paginationConstants.PAGINATION_SUCCESS, data } }
    function failure(error) { return { type: paginationConstants.PAGINATION_FAILURE, error} }
}