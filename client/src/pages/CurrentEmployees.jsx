import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeTable from '../components/EmployeeTable';
import dayjs from 'dayjs';
import { setEmployees, filterEmployees } from '../redux/action';

const CurrentEmployees = () => {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employees.employees);
  const filteredEmployees = useSelector(state => state.employees.filteredEmployees);
  const [searchTerm, setSearchTerm] = useState('');

  const formatDateString = (dateString) => {
    return dateString ? dayjs(dateString).format('MM/DD/YYYY') : '';
  };

  useEffect(() => {
    console.log('Stored employees length:', employees.length);
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    if (storedEmployees.length !== employees.length) {
      const formattedEmployees = storedEmployees.map(employee => ({
        ...employee,
        startDate: formatDateString(employee.startDate),
        dateOfBirth: formatDateString(employee.dateOfBirth),
      }));
      dispatch(setEmployees(formattedEmployees));
    }
  }, [dispatch, employees.length]);

  useEffect(() => {
    dispatch(filterEmployees(searchTerm));
  }, [searchTerm, dispatch]);

  return (
    <div className="container">
      <h1>HRnet</h1>
      <h2>Current Employees</h2>
        <EmployeeTable employees={filteredEmployees} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Link to="/">Home</Link>
    </div>
  );
};

export default CurrentEmployees;
