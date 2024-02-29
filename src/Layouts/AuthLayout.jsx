import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from '../assets/images/freshcart-logo.svg'
import { NavLink} from 'react-router-dom'
export default function AuthLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid mx-5 px-1">
          <NavLink className="navbar-brand" to="/signin">
            <img src={logo} alt="Logo" width='100px' />
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 pt-3">
              <li className="nav-item ps-4 ">
                <NavLink className="nav-link" to="/signin">Signin</NavLink>
              </li>
              <li className="nav-item ps-4 ">
                <NavLink className="nav-link" to="/signup">Signup</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet/>
    </>
  )
}
