import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NotFoundComponent from './NotFoundComponent';
import registerServiceWorker from './registerServiceWorker';

import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom'

ReactDOM.render(
  <HashRouter>
    <div className="main">
      <Switch>
        <Route exact path="/" component={App} />
        <Route component={NotFoundComponent} />
      </Switch>
    </div>
  </HashRouter>,
  document.getElementById('root'));
registerServiceWorker();
