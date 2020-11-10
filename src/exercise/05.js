// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import React from 'react'
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  // 🐨 create a ref here with React.useRef()
  const refTilt = React.useRef('')

  React.useEffect(() => {
    const tiltNode = refTilt.current

    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    })

    return () => tiltNode.vanillaTilt.destroy()
  }, [])

  return (
    <div className="tilt-root" ref={refTilt}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
