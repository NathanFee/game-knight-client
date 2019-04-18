import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig.js'
import { Link } from 'react-router-dom'

class Players extends Component {
  constructor () {
    super()

    this.state = {
      players: []
    }
  }
  componentDidMount () {
    console.log('player mounted')
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
      .catch(console.log)
  }

  sortedPlayers = () => {
    const playersCopy = this.state.players.slice(0)
    const sortedPlayers = playersCopy.sort((a, b) => b.wins - a.wins)
    return sortedPlayers
  }

  renderPlayers = () => (
    <Fragment>
      <h2>Leader Board</h2>
      {this.sortedPlayers().map(player => (
        <div key={player.id} className="player-div">
          <h3>{player.name}</h3> <p>Wins: {player.wins} Loses: {player.loses}</p>
          <Link to={'/players/' + player.id}>View</Link>
        </div>
      ))}
    </Fragment>
  )

  renderLoading = () => (
    <option>Loading...</option>
  )

  render () {
    console.log('players rendered')
    return (
      <Fragment>
        {this.state.players.length === 0 ? this.renderLoading() : this.renderPlayers()}
      </Fragment>
    )
  }
}

export default Players
