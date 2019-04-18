import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig.js'
import { Redirect, Link, withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap'

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
    axios({
      url: `${apiUrl}/players/${id}`,
      method: 'get',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
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
      .then(() => this.props.alert('Player deleted.', 'success'))
      .then(() => this.setState({ shouldRedirect: true }))
      .catch(() => this.props.alert('Player failed deleted.', 'danger'))
  }

  render () {
    if (!this.state.player) {
      return <p>If you have not added players, please add players, else please wait while your page loads.</p>
    }
    if (this.state.shouldRedirect) {
      return <Redirect to={{
        pathname: '/players'
      }}/>
    }
    const { name, wins, loses } = this.state.player

    return (
      <Fragment>
        <h3>{name}</h3>
        <p>Wins: {wins}</p>
        <p>Loses: {loses}</p>
        <Button variant="danger" className="m-1" onClick={this.handleDelete}>Delete</Button>
        <Link to={this.props.match.url + '/edit'}><Button variant="info" className="m-1">Edit</Button></Link>

      </Fragment>
    )
  }
}

export default withRouter(Player)
