// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/Login'; 
import UsersView from './components/Usuarios';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/usuarios" element={<UsersView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
