import { connect } from 'react-redux';
import App from '../App';

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export default connectedApp;
