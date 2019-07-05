import { paginationConstants } from './paginationConstants';

export function pagination(state = {}, action) {
  switch (action.type) {
    case paginationConstants.PAGINATION_REQUEST:
      return {};
    case paginationConstants.PAGINATION_SUCCESS:
      return {
        currentPageData: action.data
      };
    case paginationConstants.PAGINATION_FAILURE:
      return {};
    default:
      return state
  }
}
