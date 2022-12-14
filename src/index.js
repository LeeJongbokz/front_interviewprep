import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const { worker } = require("./mocks/browser");
worker.start();

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
);
