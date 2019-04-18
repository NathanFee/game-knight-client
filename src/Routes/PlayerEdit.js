import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'

import PlayerForm from './PlayerForm.js'

class PlayerEdit extends Component {
  constructor () {
    super()

    this.state = {
      player: null,
      updated: false
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
      .catch(console.log)
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { player } = this.state

    axios({
      url: `${apiUrl}/players/${player.id}`,
      method: 'patch',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { player }
    })
      .then(() => this.setState({ updated: true }))
      .catch(() => {
        this.props.alert('Error on update.', 'danger')
        this.setState({ player: { ...player, name: '', score: '', wins: '', loses: '' } })
      })
  }

  handleChange = event => {
    console.log(event.target.name, event.target.value)

    const inputName = event.target.name
    const updatedInputValue = event.target.value

    const updatedplayer = { ...this.state.player, [inputName]: updatedInputValue }

    this.setState({ player: updatedplayer })
  }

  render () {
    const { player, updated, message } = this.state

    if (!player) {
      return <p>Loading...</p>
    }

    if (updated) {
      return <Redirect to={`/players/${player.id}`} />
    }

    const { name, wins, loses } = player

    return (
      <Fragment>
        <PlayerForm
          name = {name}
          wins = {wins}
          loses = {loses}
          message = {message}
          edit = {true}
          handleChange = {this.handleChange}
          handleSubmit = {this.handleSubmit}
        />
      </Fragment>
    )
  }
}

export default withRouter(PlayerEdit)
