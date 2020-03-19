import { connect } from 'react-redux';
import Body from '../components/body.component';

function mapStateToProps(state) {
  const { jobs, pager } = state.jobs;
  const { logoutUser } = state.Logout;
  const { user, authenticated } = state.session;
  return {
    jobs,
    pager,
    logoutUser,
    user,
    authenticated
  };
}

const connectedBody = connect(mapStateToProps)(Body);

export default connectedBody;
