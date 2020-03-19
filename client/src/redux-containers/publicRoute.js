import { connect } from 'react-redux';
import PublicRoute from '../components/generalComponents/publicRoute';

const mapStateToProps = (state) => {
  const { authenticated } = state.session;
  return {
    authenticated
  };
};

const connectedPublicRoute = connect(mapStateToProps)(PublicRoute);
export default connectedPublicRoute;
