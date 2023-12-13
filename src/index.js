import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//authprovider 
import { AuthProvider } from './contexts/AuthProvider'; 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <html data-theme="light">
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </html>
  </AuthProvider>
);


