import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import CreateEmployee from './pages/CreateEmployee';
import CurrentEmployees from './pages/CurrentEmployees';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<CreateEmployee />} />
          <Route path="/current-employees" element={<CurrentEmployees />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
