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
  const [pokemon, setPokemon] = useState(null)
  useEffect(() => {
    if (pokemonName !== '') {
      fetchPokemon(pokemonName).then(pokemonData => {
        setPokemon(pokemonData)
      })
    }
  }, [pokemonName])

  return !pokemonName ? (
    'Submit a pokemon'
  ) : pokemonName && pokemon === null ? (
    <PokemonInfoFallback name={pokemonName} />
  ) : pokemon != null ? (
    <PokemonDataView pokemon={pokemon} />
  ) : (
    ''
  )
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
