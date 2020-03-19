import React from 'react';
import { isValidElementType } from 'react-is';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

const PrivateRoute = ({
  component: Component,
  authenticated,
  restricted,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => authenticated ? <Redirect to="/" /> : <Component {...props} />}
    />
  );
};

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  restricted: PropTypes.bool.isRequired,
  component: (props, propName) => {
    if (props[propName] && !isValidElementType(props[propName])) {
      return new Error(
        'Invalid prop componentsu pplied to publicRoute: the prop is not a valid React component'
      );
    }
  }
};

PrivateRoute.defaultProps = {
  component: null
};

export default PrivateRoute;
