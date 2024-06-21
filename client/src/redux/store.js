import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import employeesReducer from './reducer';

const rootReducer = combineReducers({
  employees: employeesReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
