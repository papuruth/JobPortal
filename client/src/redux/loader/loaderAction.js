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
    if(!param) {
      setTimeout(() => {
        dispatch(success(loaderConstant.LOADER_SUCCESS, param));
      }, 1000);
    } else {
      dispatch(success(loaderConstant.LOADER_SUCCESS, param));
    }
  };
}

export default loader;