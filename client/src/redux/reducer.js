import { ADD_EMPLOYEE, SET_EMPLOYEES, FILTER_EMPLOYEES, SET_SEARCH_TERM } from '../redux/action';

export const initialState = {
  employees: [],
  filteredEmployees: [],
  searchTerm: '',
};

const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      const updatedEmployees = [...state.employees, action.payload];
      return {
        ...state,
        employees: updatedEmployees,
        filteredEmployees: updatedEmployees,
      };
    case SET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
        filteredEmployees: action.payload,
      };
    case FILTER_EMPLOYEES:
      const searchTerm = action.payload.toLowerCase();
      const filteredEmployees = state.employees.filter(employee =>
        Object.values(employee).some(value =>
          String(value).toLowerCase().includes(searchTerm)
        )
      );
      return {
        ...state,
        filteredEmployees,
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
};

export default employeesReducer;
