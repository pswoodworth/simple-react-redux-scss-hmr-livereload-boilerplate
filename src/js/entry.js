import 'babel-polyfill';
import 'react-fastclick';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import getRouter from './views';



export const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

const router = getRouter(history);

export const entry = <Provider store={store}>{router}</Provider>;

render(entry, document.getElementById('root'));
