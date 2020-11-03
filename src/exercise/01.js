// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import React from 'react'
import PropTypes from 'prop-types';

function Greeting({initialName}) {
  const [name, setName] = React.useState(initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

Greeting.defaultProps = {
  initialName: '',
}

Greeting.propTypes = {
  initialName: PropTypes.string
}

function App() {
  return <Greeting />
}

export default App
