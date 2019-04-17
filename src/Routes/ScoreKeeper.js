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
    console.log('player mounted')
    axios.get(apiUrl + '/players')
      .then((response) => this.setState({
        players: response.data.players
      }))
      .then(() => this.setState({
        selectedPlayer: this.state.players[0].id
      }))
      .catch(console.log)
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

  renderInPlay = () => {
    const { inPlay } = this.state
    return (
      <Fragment>
        <ul>
          {inPlay.map(player => (
            <li key={player.id}>
              <div className="player-score-div">
                <p>{player.score} {player.name}</p>
                <Button name={player.id} value="Sub" variant="primary" onClick={this.handleSub} className="m-1">-</Button>
                <Button name={player.id} value="Add" variant="primary" onClick={this.handleAdd} className="m-1">+</Button>
              </div>
            </li>
          ))}
        </ul>
      </Fragment>
    )
  }

  handleAddPlayer = () => {
    event.preventDefault()
    const selectedPlayerId = this.state.selectedPlayer

    if (!this.state.inPlay.find(player => player.id === selectedPlayerId)) {
      const addedPlayer = this.state.players.find(
        player => { return player.id === selectedPlayerId }
      )
      this.setState({ inPlay: [...this.state.inPlay, addedPlayer] })
    } else {
      console.log('duplicate ============================')
    }
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

  render () {
    return (
      <Fragment>
        <h2>Score Keeper</h2>
        <Form onSubmit= {this.handleAddPlayer}>
          <Form.Group controlId="nonsense">
            <Form.Control as="select" name="selected" onChange={this.handleSelect}>
              {this.getPlayersList()}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="m-1"> Add Player </Button>
        </Form>

        {this.state.inPlay.length !== 0 && this.renderInPlay()}
      </Fragment>
    )
  }
}

export default ScoreKeeper
