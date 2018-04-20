import React from 'react';
import ReactDOM from 'react-dom';

import BookListApp from './books_list/BookListApp';
import ProfilePageApp from './profile_page/ProfilePageApp';
import BookPageApp from './book_page/BookPageApp';
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
        <Route exact path="/" component={BookListApp} />
        <Route exact path="/profile" component={ProfilePageApp} />
        <Route exact path="/books/:id" component={BookPageApp} />
        <Route component={NotFoundComponent} />
      </Switch>
    </div>
  </HashRouter>,
  document.getElementById('root'));
registerServiceWorker();
