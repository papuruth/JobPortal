import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { className, btnDisabled, title } = props;
  return (
    <button className={className} type="submit" disabled={!btnDisabled}>
      {title}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string.isRequired,
  btnDisabled: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default Button;
