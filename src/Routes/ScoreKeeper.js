import React, { Fragment, Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import apiUrl from '../apiConfig.js'

class ScoreKeeper extends Component {
  constructor () {
    super()

    this.state = {
      players: [],
      inPlay: [],
      selectedPlayer: null
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/players`,
      method: 'get',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then((response) => this.setState({
        players: response.data.players
      }))
      .then(() => this.setState({
        selectedPlayer: this.state.players[0].id
      }))
      .catch(() => this.props.alert('Whoops! Either you need to add players or something went wrong.', 'danger'))
  }

  handleAdd = (event) => {
    event.preventDefault()
    const playerId = parseInt(event.target.name)
    const { inPlay } = this.state

    const updatePlayer = inPlay.map(player => {
      if (player.id === playerId) {
        player.score += 1
        return player
      } else {
        return player
      }
    })
    this.setState({ inPlay: updatePlayer })
  }

  handleSub = (event) => {
    event.preventDefault()
    const playerId = parseInt(event.target.name)
    const { inPlay } = this.state

    const updatePlayer = inPlay.map(player => {
      if (player.id === playerId) {
        player.score -= 1
        return player
      } else {
        return player
      }
    })
    this.setState({ inPlay: updatePlayer })
  }

  handleReset = () => {
    event.preventDefault()
    const { inPlay } = this.state

    const updatePlayer = inPlay.map(player => {
      player.score = 0
      return player
    })
    this.setState({ inPlay: updatePlayer })
  }

  handleAddPlayer = () => {
    event.preventDefault()
    const selectedPlayerId = this.state.selectedPlayer

    if (!selectedPlayerId) {
      this.props.alert('Please create a player.', 'danger')
    } else {
      if (!this.state.inPlay.find(player => player.id === selectedPlayerId)) {
        const addedPlayer = this.state.players.find(
          player => { return player.id === selectedPlayerId }
        )
        this.setState({ inPlay: [...this.state.inPlay, addedPlayer] })
      } else {
        this.props.alert('This player has already been added to the game.', 'danger')
      }
    }
  }

  handleRemovePlayer = (event) => {
    event.preventDefault()
    const playerId = parseInt(event.target.name)
    const { inPlay } = this.state

    const leftInPlay = inPlay.filter(player => player.id !== playerId)
    this.setState({ inPlay: leftInPlay })
  }

  handleSelect = (event) => {
    event.preventDefault()
    const playerId = parseInt(event.target.value)
    this.setState({ selectedPlayer: playerId })
  }

  getPlayersList = () => (
    this.state.players.map(player => (
      <option key={player.id} value={player.id}>
        {player.name}
      </option>
    ))
  )

  scoresZero = () => {
    const zero = this.state.inPlay.every(player => player.score === 0)
    return zero
  }

  handleWinner = (event) => {
    event.preventDefault()
    const winner = this.state.inPlay.reduce(
      (player, winner) => player.score > winner.score ? player : winner, this.state.inPlay[0]
    )

    const tie = this.state.inPlay.filter(player => player.score === winner.score)

    if (tie.length > 1) {
      this.props.alert('There are no ties in Game Kight, Fight to the Death!!', 'danger')
    } else {
      this.props.alert(`${winner.name} Wins!`, 'success')

      const updatedPlayers = this.state.inPlay.map(player => {
        if (player.id === winner.id) {
          player.wins += 1
          player.score = 0
          return player
        } else {
          player.loses += 1
          player.score = 0
          return player
        }
      })
      updatedPlayers.forEach(player => {
        axios({
          url: `${apiUrl}/players/${player.id}`,
          method: 'patch',
          headers: {
            'Authorization': `Token token=${this.props.user.token}`
          },
          data: { player }
        })
      })
        .catch(() => this.props.alert('Whoops! Players failed to update, please try again later.', 'danger'))
    }
  }

  renderInPlay = () => {
    const { inPlay } = this.state
    return (
      <Fragment>
        {inPlay.map(player => (
          <div key={player.id} className="player-score-div">
            <Button name={player.id} variant="danger" onClick={this.handleRemovePlayer} className="m-1">x</Button>
            <h4>{player.name}</h4>
            <div className="end-container">
              <div className="score-container">
                <h4>{player.score}</h4>
              </div>
              <Button name={player.id} value="Sub" variant="primary" onClick={this.handleSub} className="m-1">-</Button>
              <Button name={player.id} value="Add" variant="primary" onClick={this.handleAdd} className="m-1">+</Button>
            </div>
          </div>
        ))}
      </Fragment>
    )
  }

  render () {
    return (
      <Fragment>
        <h2>Score Keeper</h2>
        {this.state.players.length !== 0 && <Form onSubmit= {this.handleAddPlayer}>
          <Form.Group controlId="add-player-form" className="add-player-form">
            <Form.Control as="select" name="selected" onChange={this.handleSelect}>
              {this.getPlayersList()}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="m-1"> Add Player <i className="fas fa-user-plus"></i></Button>
        </Form>
        }
        {this.state.inPlay.length !== 0 && this.renderInPlay()}
        <div className="score-button-container">
          {!this.scoresZero() && this.state.inPlay.length > 1 && <Button variant="success" onClick={this.handleWinner} className="m-1">Declare Winner <i className="fas fa-trophy"></i></Button>}
          {!this.scoresZero() && this.state.inPlay.length !== 0 && <Button variant="secondary" onClick={this.handleReset} className="m-1">Reset Scores <i className="fas fa-redo"></i></Button>}
        </div>
      </Fragment>
    )
  }
}

export default ScoreKeeper
