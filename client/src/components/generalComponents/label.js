import React from 'react';
import PropTypes from 'prop-types';

const Label = (props) => {
  const { htmlFor, className, title } = props;
  return (
    <label htmlFor={htmlFor} className={className}>{title}</label>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Label;
