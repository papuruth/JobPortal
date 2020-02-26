import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import isLoggedIn from '../../isLoggedIn';

export default function PrivateRoute(Component) {
  class AuthenticatedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.checkAuth();
    }

    checkAuth() {
      const { history } = this.props;
      if (!isLoggedIn()) {
        history.push('/login');
      }
    }

    render() {
      return isLoggedIn() ? <Component {...this.props} /> : null;
    }
  }
  AuthenticatedComponent.propTypes = {
    history: PropTypes.oneOfType([PropTypes.any]).isRequired
  };
  return withRouter(AuthenticatedComponent);
}
