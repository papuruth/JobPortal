import profileConstants from './profileConstants';

export function profileUpdate(state = { profile: {} }, action) {
  switch (action.type) {
    case profileConstants.PROFILE_UPDATE_REQUEST:
      return { ...state };
    case profileConstants.PROFILE_UPDATE_SUCCESS:
      return {
        profile: action.payload
      };
    case profileConstants.PROFILE_UPDATE_FAILURE:
      return { ...state };
    default:
      return state;
  }
}

export function sendMail(state = {}, action) {
  switch (action.type) {
    case profileConstants.SEND_MAIL_REQUEST:
      return {};
    case profileConstants.SEND_MAIL_SUCCESS:
      return {
        mailStatus: action.payload
      };
    case profileConstants.SEND_MAIL_FAILURE:
      return {};
    default:
      return state;
  }
}
