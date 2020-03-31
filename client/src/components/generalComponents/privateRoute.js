import React from 'react';
import { isValidElementType } from 'react-is';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

const PrivateRoute = ({
  component: Component,
  authenticated,
  restricted,
  notAdmin,
  all,
  user,
  role,
  ...rest
}) => {
  console.log(
    'auth=',
    authenticated,
    'restr=',
    restricted,
    'na=',
    notAdmin,
    'all=',
    all,
    'role =',
    role
  );
  if (user.role === role && authenticated) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  if (restricted && (user.role === 1 || user.role === 0) && authenticated) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  if (notAdmin && (user.role === 1 || user.role === 2) && authenticated) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  if (all && authenticated) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return <Route {...rest} render={() => <Redirect to="/" />} />;
};

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  restricted: PropTypes.bool,
  component: (props, propName) => {
    if (props[propName] && !isValidElementType(props[propName])) {
      return new Error(
        'Invalid prop componentsu pplied to publicRoute: the prop is not a valid React component'
      );
    }
  },
  all: PropTypes.bool,
  notAdmin: PropTypes.bool,
  user: PropTypes.oneOfType([PropTypes.object]),
  role: PropTypes.number
};

PrivateRoute.defaultProps = {
  component: null,
  restricted: null,
  all: null,
  notAdmin: null,
  user: {},
  role: null
};

export default PrivateRoute;
