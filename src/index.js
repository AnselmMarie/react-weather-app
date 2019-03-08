/* Node Modules */
import React from 'react';
import ReactDOM from 'react-dom';
/* Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import './screens/app.screen/app.css';
/* Screens */
import App from './screens/app.screen/app';
/* Other */
import * as serviceWorker from './modules/service.worker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
