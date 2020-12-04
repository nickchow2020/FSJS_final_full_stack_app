import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "./Context";
import './index.css';
import App from './App';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
