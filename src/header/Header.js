import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MenuOptions from '../Routes/MenuOptions.js'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link to="/">Home</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <Fragment>
    <header className="main-header">
      <h1>Game Knight <img src="https://i.imgur.com/aYignP0.png" alt="cartoon knight" height='50px' width='40px'/></h1>
      <nav>
        { user && <span>Welcome, {user.email}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
        { alwaysOptions }
      </nav>
    </header>
    <nav className="game-knight-menu">{ user ? <MenuOptions/> : '' }</nav>
  </Fragment>
)

export default Header
