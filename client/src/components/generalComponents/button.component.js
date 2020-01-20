import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { className, disabled, title } = props;
  return (
    <button
      className={className}
      type="submit"
      disabled={!disabled}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Button;
