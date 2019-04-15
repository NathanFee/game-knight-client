import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig.js'
import { Redirect, Link, withRouter } from 'react-router-dom'

class Player extends Component {
  constructor () {
    super()

    this.state = {
      player: null,
      shouldRedirect: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    axios(`${apiUrl}/players/${id}`)
      .then(response => this.setState({ player: response.data.player }))
      .catch(console.error)
  }

  handleDelete = () => {
    axios({
      url: `${apiUrl}/players/${this.state.player.id}`,
      method: 'delete',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.setState({ shouldRedirect: true }))
      .catch(console.log)
  }

  render () {
    if (!this.state.player) {
      return <p>loading...</p>
    }
    if (this.state.shouldRedirect) {
      return <Redirect to={{
        pathname: '/players'
      }}/>
    }
    const { name, score, wins, loses } = this.state.player

    return (
      <Fragment>
        <h3>{name}</h3>
        <p>Score: {score}</p>
        <p>wins: {wins}</p>
        <p>loses: {loses}</p>
        <button onClick={this.handleDelete}>Delete</button>
        <Link to={this.props.match.url + '/edit'}><button>Edit</button></Link>

      </Fragment>
    )
  }
}

export default withRouter(Player)
