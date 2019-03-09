/* Node Modules */
import React from 'react';
import ReactDOM from 'react-dom';
/* Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import './screens/app.screen/app.css';
/* Screens */
import AppScreen from './screens/app.screen/app.screen';
/* Other */
import * as serviceWorker from './modules/service.worker.module';

ReactDOM.render(<AppScreen />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
