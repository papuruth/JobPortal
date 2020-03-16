import alertConstants from './alertConstants';

export default function alert(state = { type: null, message: null }, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case alertConstants.CLEAR:
      return {
        type: null,
        message: null
      };
    default:
      return state;
  }
}
