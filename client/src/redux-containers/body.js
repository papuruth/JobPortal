import { connect } from 'react-redux';
import Body from '../components/body.component';

function mapStateToProps(state) {
  const { jobs, pager } = state.jobs;
  const { logoutUser } = state.Logout;
  const { user, authenticated } = state.session;
  const { loaderStatus } = state.loaderReducer;
  const {fetchJobByCompany} = state.fetchJobByCompanyReducer;
  return {
    jobs,
    pager,
    logoutUser,
    user,
    authenticated,
    loaderStatus,
    fetchJobByCompany
  };
}

const connectedBody = connect(mapStateToProps)(Body);

export default connectedBody;
