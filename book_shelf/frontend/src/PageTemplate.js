import React from 'react';

import Navbar from './Navbar';
import './css/App.css';

const PageTemplate = ({children}) =>
  <div className="app">
    <Navbar />
    {children}
  </div>

export default PageTemplate;
