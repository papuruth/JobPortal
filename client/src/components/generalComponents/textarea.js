import React from 'react';
import PropTypes from 'prop-types';

const Textarea = (props) => {
  const { className, rows, id, onChange, name, value } = props;
  return (
    <textarea
      className={className}
      rows={rows}
      id={id}
      onChange={onChange}
      name={name}
      value={value}
    />
  );
};

Textarea.propTypes = {
  className: PropTypes.string.isRequired,
  rows: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default Textarea;
