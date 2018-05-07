import React from 'react'

import { Link } from 'react-router-dom'

const Navbar = () =>
  <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <Link to="/">
      <div className="navbar-brand">Book shelf</div>
    </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link to="/">
            <div className="nav-link">Home</div>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile">
            <div className="nav-link">Profile</div>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/add_book">
            <div className="nav-link">Add book</div>
          </Link>
        </li>
      </ul>
    </div>

    <div className = "navbar-collapse collapse w-100 order-3 dual-collapse2">
      <ul className="navbar-nav ml-auto">
           <li className="nav-item">
             <a className="nav-link" href="accounts/logout">
               <button type="button" className="btn btn-success">Logout</button>
             </a>
            </li>
       </ul>
    </div>
  </nav>

export default Navbar;
