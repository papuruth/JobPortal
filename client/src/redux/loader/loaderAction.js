import loaderConstant from './loaderConstant';

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

function loader(param) {
  return (dispatch) => {
    dispatch(request(loaderConstant.LOADER_REQUEST, null));
    dispatch(success(loaderConstant.LOADER_SUCCESS, param));
  };
}

export default loader;