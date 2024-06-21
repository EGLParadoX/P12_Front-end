import React from 'react';
import { useField } from 'formik';

const SelectField = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);
  const id = props.id || props.name;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select {...field} {...props} id={id}>
        <option value="">{props.placeholder}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="error-message">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default SelectField;
