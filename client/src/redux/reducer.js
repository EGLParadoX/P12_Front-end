import { ADD_EMPLOYEE, SET_EMPLOYEES, SET_SEARCH_TERM } from '../redux/action';

const initialState = {
  employees: [],
  searchTerm: '',
};

const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      console.log('Adding employee:', action.payload);
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    case SET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
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
