import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Form from './form';
import reportWebVitals from './reportWebVitals';
import Home from './home';
import Grid from './grid';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

var blogs = [
  { id: 1, title: 'Welcome Page', content: 'Welcome to to react hands on program' },
  { id: 2, title: 'React Vs Angular', content: 'Angualr is a framework and react is a library' }
]

ReactDOM.render(
  <React.StrictMode>
    <Home ></Home>
    <br />
    <Form></Form>
    <br />
    <Grid> </Grid>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
