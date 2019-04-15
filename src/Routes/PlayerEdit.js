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
      updated: false,
      message: null
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    axios.get(`${apiUrl}/players/${id}`)
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
      .catch(() => this.setState({
        player: { ...player, name: '', score: '', wins: '', loses: '' },
        message: 'Update failed. Please fill out forms and try again.'
      }))
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

    const { name, score, wins, loses } = player

    return (
      <Fragment>
        <PlayerForm
          name = {name}
          score = {score}
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
