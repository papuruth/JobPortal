import { profileConstants } from './profileConstants';

export function profileUpdate(state = {}, action) {
  switch (action.type) {
    case profileConstants.PROFILE_UPDATE_REQUEST:
      return {};
    case profileConstants.PROFILE_UPDATE_SUCCESS:
      return {
        profile: action.data
      };
    case profileConstants.PROFILE_UPDATE_FAILURE:
      return {};
    default:
      return state
  }
}


export function sendMail(state = {}, action) {
  switch (action.type) {
    case profileConstants.SEND_MAIL_REQUEST:
      return {};
    case profileConstants.SEND_MAIL_SUCCESS:
      return {
        mailStatus: action.status
      };
    case profileConstants.SEND_MAIL_FAILURE:
      return {};
    default:
      return state
  }
}
