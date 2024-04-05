import React from 'react';

const InputField = ({ label, id, type, value, name, onChange, placeholder }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default InputField;
