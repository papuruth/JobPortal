import fetchJobByCompanyConstant from './fetchJobByCompanyConstant';

const initialState = {
  fetchJobByCompany: false
};

export default function fetchJobByCompanyReducer(state = initialState, action) {
  switch (action.type) {
    case fetchJobByCompanyConstant.FETCH_JOB_BY_COMPANY_SUCCESS:
      return {
        ...state,
        fetchJobByCompany: action.payload,
      };
    default:
      return state;
  }
}
