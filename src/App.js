import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import StartGameScreen from './screens/StartGameScreen'
import ChooseInsectScreen from './screens/chooseInsectScreen'
import GameScreen from './screens/GameScreen'

const App = () => {
  return (
    <Router>
      <Route path='/choose-insect' component={ChooseInsectScreen} />
      <Route path='/' component={StartGameScreen} exact />
      <Route path='/game/:insect' component={GameScreen} />
    </Router>
  )
}

export default App
