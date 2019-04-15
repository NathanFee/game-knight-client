import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Redirect } from 'react-router'
import PlayerForm from './PlayerForm.js'

class PlayerCreate extends Component {
  constructor () {
    super()

    this.state = {
      player: {
        name: '',
        score: 0,
        wins: 0,
        loses: 0
      },
      created: false,
      message: null
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { player } = this.state

    axios({
      url: `${apiUrl}/players`,
      method: 'post',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { player }
    })
      .then(response => this.setState({
        created: true,
        player: response.data.player
      }))
      .catch(() => this.setState({
        player: { ...player, name: '', score: 0, wins: 0, loses: 0 },
        message: 'Create failed. Please fill out forms and try again.'
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
    const { player, created, message } = this.state

    if (created) {
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
          handleChange = {this.handleChange}
          handleSubmit = {this.handleSubmit}
        />
      </Fragment>
    )
  }
}

export default PlayerCreate
