import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Players from './Routes/Players.js'
import Player from './Routes/Player.js'
import PlayerCreate from './Routes/PlayerCreate.js'
import PlayerEdit from './Routes/PlayerEdit.js'
import Home from './Home.js'
import ScoreKeeper from './Routes/ScoreKeeper.js'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    const { alerts } = this.state

    this.setState({ alerts: [...alerts, { message, type }] })

    // clears alerts after 2 seconds
    setTimeout(() => {
      this.setState({ alerts: [] })
    }, 3500)
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type} style={ { zIndex: '100' } }>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <Home/>
          )} />
          <AuthenticatedRoute user={user} exact path='/score-keeper' render={(props) => (
            <ScoreKeeper alert={this.alert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/players' render={(props) => (
            <Players alert={this.alert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/players/:id' render={(props) => (
            <Player alert={this.alert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/player-create' render={(props) => (
            <PlayerCreate alert={this.alert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/players/:id/edit' render={(props) => (
            <PlayerEdit alert={this.alert} user={user}/>
          )} />

          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
