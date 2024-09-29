import React from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Layout from './components/Role/layout';
import Admin from './components/Role/admin';
import User from './components/Role/user';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611746869696-d09bce200020?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center filter blur-lg"></div>
        <div className="relative z-10">
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Login />} />
              <Route path='signup' element={<Signup />} />
              <Route path='user' element={<User />} />
              <Route path='admin' element={<Admin />} />
            </Route>
          </Routes>
        </div>
        </div>
        
    </Router>
  );
}

export default App;
