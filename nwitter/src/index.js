import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import {BrowserRouter} from 'react-router-dom';
import { authService } from "fbase";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
