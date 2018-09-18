import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Timer from './App';

ReactDOM.render(<App />, document.getElementById('data'));

registerServiceWorker();
