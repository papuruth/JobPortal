import { connect } from 'react-redux';
import Signup from '../components/signup.components';

function mapStateToProps(state) {
  const { isSignup } = state.registration;
  return {
    isSignup
  };
}

const connectedLoginPage = connect(mapStateToProps)(Signup);
export default connectedLoginPage;
