/* Node Modules */
import React from 'react';
import ReactDOM from 'react-dom';
/* Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import './screens/app.screen/app.styles.css';
/* Screens */
import AppContainer from './screens/app.screen';
/* Other */
import * as serviceWorker from './modules/service.worker/service.worker.module';

function mainRender() {
    ReactDOM.render(<AppContainer />, document.getElementById('root'));
}

if (process.env.NODE_ENV !== "production") {
    // Workaround for https://github.com/facebook/create-react-app/issues/6399
    // until it gets fixed upstream
    setTimeout(() => {
        mainRender();
    }, 1000);
} else {
    mainRender();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
