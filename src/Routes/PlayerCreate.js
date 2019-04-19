import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Redirect } from 'react-router'
import Sentencer from 'sentencer'
import { Form, Button } from 'react-bootstrap'

class PlayerCreate extends Component {
  constructor () {
    super()

    this.state = {
      player: {
        name: '',
        score: 0,
        wins: 0,
        loses: 0,
        playing: false
      },
      created: false
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
      .then(() => this.props.alert(`${this.state.player.name} has been created!`, 'success'))
      .catch(() => { this.props.alert('Whoops! Failed to create player, please try again later.', 'danger') })
      .then(() => this.setState({ player: { ...player, name: '', score: 0, wins: 0, loses: 0, playing: false } }))
  }

  handleChange = event => {
    const inputName = event.target.name
    const updatedInputValue = event.target.value

    const updatedPlayer = { ...this.state.player, [inputName]: updatedInputValue }

    this.setState({ player: updatedPlayer })
  }

  handleKnighted = event => {
    let name = this.state.player.name
    let words = name.split(' ')
    if (words.includes('the')) {
      const indexOfThe = words.indexOf('the')
      words = words.splice(0, indexOfThe)
      name = words.join(' ')
    }

    const knightedName = name + ' the ' + Sentencer.make('{{adjective}}')
    const knightedPlayer = { ...this.state.player, name: knightedName }

    this.setState({
      player: knightedPlayer
    })
  }

  render () {
    const { player, created } = this.state

    if (created) {
      return <Redirect to={`/players/${player.id}`} />
    }

    return (
      <Fragment>
        <h2>Create Player</h2>
        <Form onSubmit={this.handleSubmit}>
          <h4>Player Name: </h4>
          <Form.Group controlId="CreateEditForm">
            <Form.Control type="text" value={player.name} name="name" required onChange={this.handleChange}/>
          </Form.Group>
          <Button variant="primary" className="m-1" onClick={this.handleKnighted}>Knight Player</Button>
          <Button variant="primary" type="submit" className="m-1"> Submit </Button>
        </Form>
      </Fragment>
    )
  }
}

export default PlayerCreate
