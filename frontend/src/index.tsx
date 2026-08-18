import React from 'react';
import ReactDOM from 'react-dom/client';
import './App/index.css';
import reportWebVitals from './App/reportWebVitals';
import App from "./App/App";
import {BrowserRouter} from "react-router";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <App/>
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
