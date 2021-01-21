import React from 'react'
import insects from '../data/insects'
import PropTypes from 'prop-types'

const ChooseInsectScreen = ({ history }) => {
  const handleClick = (insect) => {
    console.log(insect)
    history.push(`/game/${insect}`)
  }

  return (
    <div className='screen'>
      <h1>What is your "favorite" insect?</h1>
      <ul className='insects-list'>
        {insects.map(({ name, url }, index) => (
          <li key={index}>
            <button
              className='choose-insect-btn'
              onClick={() => handleClick(name)}
            >
              <p>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
              <img src={url} alt={name} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

ChooseInsectScreen.propTypes = {
  history: PropTypes.object.isRequired,
}

export default ChooseInsectScreen
