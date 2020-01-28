import { connect } from 'react-redux';
import Body from '../components/body.component';

function mapStateToProps(state) {
  const { jobs, pager } = state.jobs;
  const { logoutUser } = state.Logout;
  return {
    jobs,
    pager,
    logoutUser
  };
}

const connectedBody = connect(mapStateToProps)(Body);

export default connectedBody;
