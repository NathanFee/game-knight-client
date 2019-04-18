import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig.js'
import { Link } from 'react-router-dom'
import Ordinal from 'ordinal'

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
    const sortedPlayers = playersCopy.sort((a, b) => {
      // sort by wins, if equal sort by loses
      if (a.wins > b.wins) return -1
      if (a.wins < b.wins) return 1
      // wins must be equal sort by loses
      if (a.loses > b.loses) return 1
      if (a.loses < b.loses) return -1
    })
    return sortedPlayers
  }

  renderPlayers = () => (
    <Fragment>
      <h2>Leader Board</h2>
      {this.sortedPlayers().map((player, index) => {
        index++
        return (
          <div key={player.id} className="player-div">
            <h2>{Ordinal(index)}</h2><h3>{player.name}</h3> <p>Wins: {player.wins} Loses: {player.loses}</p>
            <Link to={'/players/' + player.id}><i className="fas fa-search"></i></Link>
          </div>
        )
      }) }
    </Fragment>
  )

  renderLoading = () => (
    <p>If you have not added players, please add players, else please wait while your page loads.</p>
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
