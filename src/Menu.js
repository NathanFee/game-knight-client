import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Menu = () => (
  <Fragment>
    <Link to="/players">
      <Button variant="secondary" className="m-1">Leader Board</Button>
    </Link>

    <Link to="/player-create">
      <Button variant="secondary" className="m-1">Create New Players </Button>
    </Link>

    <Link to="/score-keeper">
      <Button variant="secondary" className="m-1">Score Keeper</Button>
    </Link>

  </Fragment>
)

export default Menu
