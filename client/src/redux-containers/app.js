import { connect } from 'react-redux';
import App from '../App';

function mapStateToProps(state) {
  const { alert } = state;
  const { authUser } = state.authUser;
  return {
    alert,
    authUser
  };
}

const connectedApp = connect(mapStateToProps)(App);
export default connectedApp;
