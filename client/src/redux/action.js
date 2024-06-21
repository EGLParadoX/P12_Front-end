export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const FILTER_EMPLOYEES = 'FILTER_EMPLOYEES';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';

export const addEmployee = (employee) => ({
  type: ADD_EMPLOYEE,
  payload: employee,
});

export const setEmployees = (employees) => ({
  type: SET_EMPLOYEES,
  payload: employees,
});

export const filterEmployees = (searchTerm) => ({
  type: FILTER_EMPLOYEES,
  payload: searchTerm,
});

export const setSearchTerm = (searchTerm) => ({
  type: SET_SEARCH_TERM,
  payload: searchTerm,
});
