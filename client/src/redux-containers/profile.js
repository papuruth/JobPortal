import { connect } from 'react-redux';
import Profile from '../components/profile.component';

function mapStateToProps(state) {
  const { profile } = state.profileUpdate;
  const { user } = state.session;
  return {
    profile,
    user
  };
}

const connectedProfile = connect(mapStateToProps)(Profile);
export default connectedProfile;
