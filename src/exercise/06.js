// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useEffect, useState} from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = useState({
    status: 'idle',
  })

  useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState(prevState => ({
      ...prevState,
      status: 'pending',
    }))
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setState(prevState => ({
          ...prevState,
          pokemon: pokemonData,
          status: 'resolved',
        }))
      })
      .catch(e => {
        setState(prevState => ({
          ...prevState,
          error: `Unsupported pokemon: ${pokemonName}`,
          status: 'rejected',
        }))
      })
  }, [pokemonName])

  if (state?.status === 'idle') {
    return 'Submit a pokemon'
  } else if (state?.status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (state?.status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{state?.error}</pre>
      </div>
    )
  } else if (state?.status === 'resolved') {
    return <PokemonDataView pokemon={state?.pokemon} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
