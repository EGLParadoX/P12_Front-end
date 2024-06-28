import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import dayjs from "dayjs";
import employeesReducer, { initialState } from "./reducer";


const persistState = store => next => action => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('employees', JSON.stringify(state.employees.employees));
  return result;
};

function getPreloadedState() {
  const formatDateString = (dateString) => dateString ? dayjs(dateString).format("MM/DD/YYYY") : "";
  const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
  const employees = storedEmployees.length
    ? storedEmployees.map((employee) => ({
        ...employee,
        startDate: formatDateString(employee.startDate),
        dateOfBirth: formatDateString(employee.dateOfBirth),
      }))
    : [];

  return {
    employees: {
      ...initialState,
      employees,
      filteredEmployees: employees,
    },
  };
}

const rootReducer = combineReducers({ employees: employeesReducer });

const store = createStore(
  rootReducer,
  getPreloadedState(),
  composeWithDevTools(
    applyMiddleware(persistState) 
  )
);

export default store;
