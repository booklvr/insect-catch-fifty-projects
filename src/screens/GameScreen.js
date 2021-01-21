import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import insects from '../data/insects'
import PropTypes from 'prop-types'

const GameScreen = ({ match }) => {
  const SCORE_LIMIT = 20

  const [insect] = useState(
    insects.find((insect) => insect.name === match.params.insect)
  )
  const [seconds, setSeconds] = useState(0)
  const [score, setScore] = useState(0)
  const [insectsOnScreen, setInsectsOnScreen] = useState([])

  const formatTime = () => {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s

    return `Time: ${m}:${s}`
  }

  const getRandomLocation = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
  }

  const createInsect = () => {
    const { x, y } = getRandomLocation()
    const newInsect = {
      ...insect,
      position: { x, y },
      rotate: Math.random() * 360,
      id: uuidv4(),
    }
    return newInsect
  }

  const deleteInsect = (id) => {
    setInsectsOnScreen(() =>
      insectsOnScreen.filter((insect) => insect.id !== id)
    )
  }

  const onClickHandler = (id) => {
    if (score < SCORE_LIMIT) {
      setInsectsOnScreen(() =>
        [...insectsOnScreen, createInsect(), createInsect()].filter(
          (insect) => insect.id !== id
        )
      )
      setScore(() => score + 1)
    }
  }

  useEffect(() => {
    setInsectsOnScreen(() => {
      return [...insectsOnScreen, createInsect()]
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds + 1)
    }, 1000)

    if (score >= SCORE_LIMIT) {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [seconds])

  return (
    <div className='screen game-container' id='game-container'>
      <h3 className='time'>{formatTime()}</h3>
      <h3 id='score' className='score'>
        Score: {score}
      </h3>
      {insectsOnScreen.map((insect, index) => (
        <div
          key={index}
          className='insect'
          style={{
            top: `${insect.position.y}px`,
            left: `${insect.position.x}px`,
          }}
          onClick={() => {
            onClickHandler(insect.id)
          }}
        >
          <img
            src={insect.url}
            alt={insect.name}
            style={{ transform: `rotate(${insect.rotate}deg)` }}
          />
        </div>
      ))}
      <h5
        id='message'
        className={score < SCORE_LIMIT ? 'message' : 'message visible'}
      >
        Are you annnoyed yet? <br />
        You are playing an impossible game!!
      </h5>
    </div>
  )
}

GameScreen.propTypes = {
  match: PropTypes.object.isRequired,
}

export default GameScreen
