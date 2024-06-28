import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EmployeeTable from '../components/EmployeeTable';



const CurrentEmployees = () => {
  const filteredEmployees = useSelector(state => state.employees.filteredEmployees);


  return (
    <div className="container">
      <h1>HRnet</h1>
      <h2>Current Employees</h2>
        <EmployeeTable employees={filteredEmployees} />
      <Link to="/">Home</Link>
    </div>
  );
};

export default CurrentEmployees;
