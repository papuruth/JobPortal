import { connect } from 'react-redux';
import Login from '../components/login.component'
function mapStateToProps(state) {
    const { loggingIn, loggedIn } = state.authentication;
    return {
        loggingIn,
        loggedIn
    };
  }
  
  const connectedLoginPage = connect(mapStateToProps)(Login);
  export { connectedLoginPage as Login }; 