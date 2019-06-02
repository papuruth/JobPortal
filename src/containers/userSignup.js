import { connect } from 'react-redux';
import Signup from '../components/signup.components'
function mapStateToProps(state) {
    const { registered } = state.registration;
    return {
        registered
    };
  }
  
  const connectedLoginPage = connect(mapStateToProps)(Signup);
  export { connectedLoginPage as Signup }; 