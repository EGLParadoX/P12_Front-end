import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmployeeTable from '../components/EmployeeTable';
import dayjs from 'dayjs';

const CurrentEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees');
    const parsedEmployees = storedEmployees ? JSON.parse(storedEmployees) : [];

    const formattedEmployees = parsedEmployees.map(employee => ({
      ...employee,
      startDate: formatDateString(employee.startDate),
      dateOfBirth: formatDateString(employee.dateOfBirth)
    }));

    setEmployees(formattedEmployees);
    setFilteredEmployees(formattedEmployees);
  }, []);

  useEffect(() => {
    const filteredData = employees.filter(employee =>
      Object.values(employee).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredEmployees(filteredData);
  }, [searchTerm, employees]);

  const formatDateString = (dateString) => {
    return dateString ? dayjs(dateString).format('MM/DD/YYYY') : '';
  };

  return (
    <div className="container">
      <h1>HRnet</h1>
      <h2>Current Employees</h2>
      <EmployeeTable
        employees={filteredEmployees}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Link to="/">Home</Link>
    </div>
  );
};

export default CurrentEmployees;