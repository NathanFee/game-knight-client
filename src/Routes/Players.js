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
    axios.get(apiUrl + '/players')
      .then((response) => this.setState({
        players: response.data.players
      }))
      .catch(console.log)
  }

  renderplayers = () => (
    <ul>
      {this.state.players.map(player => (
        <li key={player.id}>
          <Link to={'/players/' + player.id}>{player.name}</Link>
          {console.log(player)}
        </li>
      ))}
    </ul>
  )

  renderLoading = () => (
    <Fragment>
      <h4>Loading...</h4>
    </Fragment>
  )

  render () {
    console.log('players rendered')
    return (
      <Fragment>
        <h1>Players</h1>
        {this.state.players.length === 0 ? this.renderLoading() : this.renderplayers()}
      </Fragment>
    )
  }
}

export default Players
