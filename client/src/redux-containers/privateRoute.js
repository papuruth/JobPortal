import { connect } from 'react-redux';
import PrivateRoute from '../components/generalComponents/privateRoute';

const mapStateToProps = (state) => {
  const { authenticated } = state.session;
  return {
    authenticated
  };
};

const connectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);
export default connectedPrivateRoute;
