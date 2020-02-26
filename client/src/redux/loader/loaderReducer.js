import loaderConstant from './loaderConstant';

const initialState = {
  loaderStatus: false
};

export default function loaderReducer(state = initialState, action) {
  switch (action.type) {
    case loaderConstant.LOADER_REQUEST:
      return {
        ...state,
        loaderStatus: action.payload
      };
    case loaderConstant.LOADER_SUCCESS:
      return {
        ...state,
        loaderStatus: action.payload
      };
    default:
      return state;
  }
}
