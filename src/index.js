import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

    
    // output.playNote("C3", 1, { duration: 2000, velocity: 0.5 });

    // setTimeout(() => {
    //     output.playNote("D3", 1, { duration: 2000, velocity: 0.5 });
    // }, 2000);

    // setTimeout(() => {
    //     output.playNote("E3", 1, { duration: 2000, velocity: 0.5 });
    // }, 4000);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
