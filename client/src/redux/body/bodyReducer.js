import bodyConstants from './bodyConstants';

const initialState = {
  pager: {},
  jobs: [],
};

export default function jobs(state = initialState, action) {
  switch (action.type) {
    case bodyConstants.JOBS_REQUEST:
      return {
        ...state,
        pager: {
          currentPage: 0,
        },
      };
    case bodyConstants.JOBS_SUCCESS:
      return action.payload.pager.currentPage === 0
        ? {
          ...state,
          jobs: action.payload.jobs,
          pager: action.payload.pager,
        }
        : {
          ...state,
          jobs: [...state.jobs, ...action.payload.jobs],
          pager: action.payload.pager,
        };
    case bodyConstants.JOBS_FAILURE:
      return {
        ...state,
        jobs: [],
      };
    default:
      return state;
  }
}
