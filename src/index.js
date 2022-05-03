import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals'

import { applyMiddleware, createStore } from 'redux'

import { Provider } from 'react-redux'

import rootReducer from './redux/reducers'

import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './assets/css/grid.css'
import './assets/css/theme.css'
import './assets/css/index.css'

import Layout from './layout/Layout'
import thunk from "redux-thunk" 

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

document.title = 'Ecomerce Admin App'

ReactDOM.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <Layout />
    {/* </React.StrictMode> */}
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
