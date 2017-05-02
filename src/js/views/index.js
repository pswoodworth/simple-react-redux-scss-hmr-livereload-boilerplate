import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Layout from './Layout';
import Hey from './Hey';


export default function(history){
  return(
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Hey}/>
      </Route>
    </Router>
  );
}



