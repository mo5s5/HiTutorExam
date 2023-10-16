import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import {initalizeApp} from 'firebase/app'

import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

// const firebaseApp=initalizeApp({

// })

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

