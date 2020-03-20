import { connect } from 'react-redux';
import PrivateRoute from '../components/generalComponents/privateRoute';

const mapStateToProps = (state) => {
  const { authenticated, user } = state.session;
  return {
    authenticated,
    user
  };
};

const connectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);
export default connectedPrivateRoute;
