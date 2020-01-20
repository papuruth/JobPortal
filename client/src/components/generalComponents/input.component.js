import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.PureComponent {
  render() {
    const {
      className,
      id,
      name,
      inputType,
      value,
      onChange,
      placeholder,
    } = this.props;
    return (
      <input
        className={className}
        id={id}
        name={name}
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
      />
    );
  }
}

Input.propTypes = {
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
