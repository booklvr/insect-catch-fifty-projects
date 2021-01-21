import React from 'react'
import { Link } from 'react-router-dom'

const StartGameScreen = () => {
  return (
    <div className='screen'>
      <h1>Catch The Insect</h1>

      <Link to='/choose-insect' className='btn' id='start-btn'>
        Play Game
      </Link>
    </div>
  )
}

export default StartGameScreen
