import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap'

class MenuOptions extends Component {
  constructor () {
    super()

    this.state = {
      leaderBoardButton: false,
      createPlayerButton: false,
      scoreKeeperButton: false
    }
  }

  handleChange = () => {
    event.preventDefault()

    if (event.target.name === 'leaderBoardButton') {
      this.setState({
        leaderBoardButton: true,
        createPlayerButton: false,
        scoreKeeperButton: false
      })
    } else if (event.target.name === 'createPlayerButton') {
      this.setState({
        leaderBoardButton: false,
        createPlayerButton: true,
        scoreKeeperButton: false
      })
    } else if (event.target.name === 'scoreKeeperButton') {
      this.setState({
        leaderBoardButton: false,
        createPlayerButton: false,
        scoreKeeperButton: true
      })
    }
  }

  render () {
    return (
      <Fragment>
        <Link to="/players">
          <Button name="leaderBoardButton" variant="secondary" className="m-1" onClick={this.handleChange} disabled={this.state.leaderBoardButton}>Leader Board</Button>
        </Link>

        <Link to="/player-create">
          <Button name="createPlayerButton" variant="secondary" className="m-1" onClick={this.handleChange} disabled={this.state.createPlayerButton}>Create New Players </Button>
        </Link>

        <Link to="/score-keeper">
          <Button name="scoreKeeperButton" variant="secondary" className="m-1" onClick={this.handleChange} disabled={this.state.scoreKeeperButton}>Score Keeper</Button>
        </Link>
      </Fragment>
    )
  }
}

export default withRouter(MenuOptions)
