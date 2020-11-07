// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React from 'react'
import {useLocalStorageState} from '../utils'

function Board({squares, selectSquare, restart}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  const [squares, setSquares] = useLocalStorageState(
    'squares',
    Array(9).fill(null),
  )
  const [logs, setLogs] = useLocalStorageState('logs', [])

  React.useEffect(() => {
    window.localStorage.setItem('squares', JSON.stringify(squares))
    if (!logs.some(x => x?.toString() === squares?.toString())) {
      const lengthSquares = squares.filter(x => x !== null).length
      const logsCopy = [
        ...logs.filter(
          log => log.filter(x => x !== null).length < lengthSquares,
        ),
        squares,
      ]
      setLogs(logsCopy)
    }
  }, [squares])

  React.useEffect(() => {
    window.localStorage.setItem('logs', JSON.stringify(logs))
  }, [logs])

  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  function selectSquare(square) {
    if (squares[square] !== null) return
    if (winner !== null) return

    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue
    setSquares(squaresCopy)
  }

  function restart() {
    setSquares(Array(9).fill(null))
    setLogs([])
  }

  function goHistory(history) {
    setSquares(history)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          restart={restart}
          selectSquare={selectSquare}
          squares={squares}
        />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <div className="log">
          logs:
          {console.log({logs})}
          {logs.map((log, key) => (
            <div key={log.toString()}>
              {key + 1}
              {'. '}
              <button
                onClick={() => goHistory(log)}
                disabled={squares?.toString() === log?.toString()}
              >
                {key === 0 ? 'Go to game start' : `Go to move #${key}`}
                {squares?.toString() === log?.toString() ? ' (current)' : null}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
