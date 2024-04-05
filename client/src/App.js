import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEmployee from './pages/CreateEmployee';
import CurrentEmployees from './pages/CurrentEmployees';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateEmployee />} />
        <Route path="/current-employees" element={<CurrentEmployees />} />
      </Routes>
    </Router>
  );
}

export default App;
