import React, { Component, Fragment } from 'react'
import './Players.scss'
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
      .catch(() => this.props.alert('Whoops! Something went wrong, please try again later.', 'danger'))
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

  getTrophy = (index) => {
    let trophy = ''
    if (index === 1) {
      trophy = 'fas fa-trophy gold'
    } else if (index === 2) {
      trophy = 'fas fa-trophy silver'
    } else if (index === 3) {
      trophy = 'fas fa-trophy bronze'
    } else { trophy = 'fas fa-award' }
    return trophy
  }

  renderPlayers = () => (
    <Fragment>
      <h2>Leader Board</h2>
      {this.sortedPlayers().map((player, index) => {
        index++
        return (
          <div key={player.id} className="players-div">
            <h2><i className={this.getTrophy(index)}></i></h2><h2>{Ordinal(index)}</h2><h3>{player.name}</h3>
            <div className="win-loss-div">
              <p>Wins: <span>{player.wins}</span> Loses: <span>{player.loses}</span></p>
            </div>
            <Link to={'/players/' + player.id}><h5><i className="fas fa-search"></i></h5></Link>
          </div>
        )
      }) }
    </Fragment>
  )

  renderLoading = () => (
    <p>If you have not added players, please add players, else please wait while your page loads.</p>
  )

  render () {
    return (
      <Fragment>
        {this.state.players.length === 0 ? this.renderLoading() : this.renderPlayers()}
      </Fragment>
    )
  }
}

export default Players
