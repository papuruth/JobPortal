import fetchJobByCompanyConstant from './fetchJobByCompanyConstant';

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

function fetchJobByCompany(param) {
  return (dispatch) => {
    dispatch(success(fetchJobByCompanyConstant.FETCH_JOB_BY_COMPANY_SUCCESS, param));
  };
}

export default fetchJobByCompany;