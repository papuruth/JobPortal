import React from 'react';
import { isValidElementType } from 'react-is';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';

const PublicRoute = ({ component: Component, restricted, authenticated, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        restricted && authenticated ? <Redirect to="/" /> : <Component {...props} />}
    />
  );
};

PublicRoute.propTypes = {
  restricted: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  component: (props, propName) => {
    if (props[propName] && !isValidElementType(props[propName])) {
      return new Error(
        'Invalid prop \'component\' supplied to \'publicRoute\': the prop is not a valid React component'
      );
    }
  }
};

PublicRoute.defaultProps = {
  component: null
};

export default PublicRoute;
