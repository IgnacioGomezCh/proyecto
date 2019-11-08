import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import * as contentful from 'contentful'

/*
var client = contentful.createClient({
    space: '2hnq8godjkak',
    accessToken: 'ts8s9TA9Xsz1lEzKwJ9U46Yl2QaVRrFG81rAmhbr0Z8'
})
client.getEntries().then(entries => {
    entries.items.forEach(entry => {
        if (entry.fields) {
            console.log(entry.fields)
        }
    })
})*/

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter >,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
