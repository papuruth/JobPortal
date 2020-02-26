import React from 'react';
import PropTypes from 'prop-types';

const FormErrors = ({ formErrors }) => (
  <div className="formErrors">
    {Object.keys(formErrors).map((fieldName) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <p key={Math.floor(Math.random() * 10)}>
            {fieldName} {formErrors[fieldName]}
          </p>
        );
      }
      return '';
    })}
  </div>
);

FormErrors.propTypes = {
  formErrors: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.any)).isRequired
};

export default FormErrors;
