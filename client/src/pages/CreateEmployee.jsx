import React from 'react';
import useForm from '../hooks/useForm';
import inputFields from '../utils/formFieldsConfig';
import InputField from '../components/InputFields';
import SelectField from '../components/SelectField';
import Button from '../components/Button';  

const CreateEmployee = () => {
  const initialState = {
    firstName: '', lastName: '', dateOfBirth: '', startDate: '', street: '', city: '', state: '', zipCode: '', department: ''
  };

  const [formData, handleChange, resetForm] = useForm(initialState);

  const statesList = ["State 1", "State 2", "State 3"];
  const departmentsList = ["Sales", "Marketing", "Engineering", "Human Resources", "Legal"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];

    const updatedEmployees = [...storedEmployees, formData];

    localStorage.setItem('employees', JSON.stringify(updatedEmployees));

    console.log('Employee saved:', formData);

    resetForm();
  };

  return (
    <div className="container">
      <h1>HRnet</h1>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        {inputFields.map(field => (
          <InputField
            key={field.id}
            label={field.label}
            id={field.id}
            type={field.type}
            value={formData[field.name]}
            name={field.name}
            onChange={handleChange}
            placeholder={`Enter your ${field.label}`}
          />
        ))}
        <SelectField
          label="State"
          id="state"
          value={formData.state}
          name="state"
          onChange={handleChange}
          options={statesList}
          placeholder="Select State"
        />
        <SelectField
          label="Department"
          id="department"
          value={formData.department}
          name="department"
          onChange={handleChange}
          options={departmentsList}
          placeholder="Select Department"
        />
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

export default CreateEmployee;
