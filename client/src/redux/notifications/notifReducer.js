import notifConstants from './notifConstants';

const initialState = {
  notifications: []
};

function getNotifications(state = initialState, action) {
  switch (action.type) {
    case notifConstants.GET_NOTIFICATION_REQUEST:
      return {
        ...state,
        notifications: [],
      };
    case notifConstants.GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
      };
    case notifConstants.GET_NOTIFICATION_FAILURE:
      return {
        ...state,
        notifications: [],
      };
    default:
      return state;
  }
}

export {
  getNotifications,
};
