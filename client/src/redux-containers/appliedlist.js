import { connect } from 'react-redux';
import AppliedList from '../components/appliedList';

function mapStateToProps(state) {
  const appliedjobs = JSON.parse(localStorage.getItem('appliedjobs'));
  const { mails } = state.updateStatus;
  const { authenticated, user } = state.session;
  return {
    appliedjobs,
    mails,
    authenticated,
    user
  };
}

const connectedApplied = connect(mapStateToProps)(AppliedList);
export default connectedApplied;
