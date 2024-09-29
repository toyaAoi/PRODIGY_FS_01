import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
  
      <AuthProvider>
        <App/>
      </AuthProvider>
  
  </React.StrictMode>,
)
