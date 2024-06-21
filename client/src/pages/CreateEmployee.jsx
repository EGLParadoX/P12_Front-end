import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { employeeValidationSchema } from '../form/validations/validationSchemas';
import inputFields from '../utils/formFieldsConfig';
import InputField from '../components/InputFields';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import { Modal } from 'react-cozyp-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-cozyp-modal/dist/modal.css';
import { addEmployee, setEmployees } from '../redux/action';

const CreateEmployee = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();

  const stateOptions = ["State 1", "State 2", "State 3"];
  const departmentOptions = ["Sales", "Marketing", "Engineering", "Human Resources", "Legal"];

  const saveEmployeeToLocalStorage = (employee) => {
    const storedEmployees = localStorage.getItem('employees');
    const parsedEmployees = storedEmployees ? JSON.parse(storedEmployees) : [];
    const updatedEmployees = [...parsedEmployees, employee];
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    return updatedEmployees;
  };

  return (
    <div className="container create-employee-form">
      <h1>HRnet</h1>
      <h2>Create Employee</h2>
      <Formik
        initialValues={{
          firstName: '', lastName: '', dateOfBirth: null, startDate: '',
          street: '', city: '', state: '', zipCode: '', department: ''
        }}
        validationSchema={employeeValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const updatedEmployees = saveEmployeeToLocalStorage(values);
          dispatch(setEmployees(updatedEmployees));
          dispatch(addEmployee(values));
          resetForm();
          setSubmitting(false);
          setIsOpen(true);
        }}
      >
        {formik => (
          <Form>
            {inputFields.map(field => (
              <div key={field.id}>
                {field.type === 'date' ? (
                  <div className="datePickerWrapper">
                    <label htmlFor={field.id}>{field.label}</label>
                    <div className="datePickerContainer">
                      <DatePicker
                        id={field.id}
                        selected={formik.values[field.name]}
                        onChange={date => formik.setFieldValue(field.name, date)}
                        dateFormat="MM/dd/yyyy"
                        placeholderText={`Select ${field.label}`}
                        className="datePickerInput" 
                      />
                      <span className="calendarIcon">&#x1F4C5;</span>
                    </div>
                  </div>
                ) : (
                  <InputField
                    key={field.id}
                    label={field.label}
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    placeholder={`Enter your ${field.label}`}
                  />
                )}
              </div>
            ))}

            <SelectField
              label="State"
              name="state"
              options={stateOptions}
              placeholder="Select State"
              id="state"
            />

            <SelectField
              label="Department"
              name="department"
              options={departmentOptions}
              placeholder="Select Department"
              id="department"
            />

            <Button type="submit">Save</Button>
          </Form>
        )}
      </Formik>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>New Employee created!</p>
      </Modal>
      
      <Link to="/current-employees">
        <Button>View Employees</Button>
      </Link>
    </div>
  );
};

export default CreateEmployee;
