import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import SuccessHandler from './components/SuccessHandler';
import ErrorHandler from './components/ErrorHandler';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/auth/success" element={<SuccessHandler />} />
        <Route path="/auth/failure" element={<ErrorHandler />} />
        <Route path="*" element={<div>404: Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
