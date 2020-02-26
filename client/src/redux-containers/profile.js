import { connect } from 'react-redux';
import Profile from '../components/profile.component';

function mapStateToProps(state) {
  const { profile } = state.profileUpdate;
  return {
    profile,
    user: JSON.parse(localStorage.getItem('currentUser'))
  };
}

const connectedProfile = connect(mapStateToProps)(Profile);
export default connectedProfile;
