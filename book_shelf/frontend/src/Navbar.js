import React from 'react'

const Navbar = () =>
  <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <a className="navbar-brand" href="/">Book shelf</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="/">Home<span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/profile">Profile<span className="sr-only">(current)</span></a>
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
