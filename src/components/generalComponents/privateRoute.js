import React from 'react';
import { withRouter } from 'react-router';
import isLoggedIn from '../../isLoggedIn';

export default function PrivateRoute(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth();
    }

    checkAuth() {
      if (!isLoggedIn()) {
        this.props.history.push('/login');
      }
    }

    render() {
      return isLoggedIn() ? <Component {...this.props} /> : null;
    }

  }
  return withRouter(AuthenticatedComponent);
}