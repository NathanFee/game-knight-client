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

  renderPlayers = () => (
    <ul>
      {this.state.players.map(player => (
        <li key={player.id}>
          <div>
            <Link to={'/players/' + player.id}>{player.name}</Link>
            {console.log(player)}
          </div>
        </li>
      ))}
    </ul>
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
