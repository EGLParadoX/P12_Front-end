// SelectField.js
import React from 'react';

const SelectField = ({ label, id, options, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <select
      id={id}
      value={value} // Maintenez cette prop pour un élément contrôlé
      onChange={onChange}
    >
      {/* Option de placeholder rendue non sélectionnable */}
      <option value="" disabled>{placeholder}</option>

      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
