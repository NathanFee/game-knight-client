import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Menu = () => (
  <Fragment>
    <Link to="/players">
      <Button variant="secondary" className="m-1">Players</Button>
    </Link>

    <Link to="/player-create">
      <Button variant="secondary" className="m-1">Create New Players </Button>
    </Link>

  </Fragment>
)

export default Menu
