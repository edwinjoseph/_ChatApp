import { useState } from 'react'
import io from 'socket.io-client'
import '../styles/globals.css'

const chatUrl = 'http://localhost:8080'

const socket = io(chatUrl)

const App = ({ Component, pageProps }) => {
  const [ error, setError ] = useState(null)

  socket.on("connect_error", (err) => {
    if (err.data) {
      setError(err.data.message)
    }
  })

  return (
    <>
      {error && (<div>{error}</div>)}
      <Component {...pageProps} socket={socket} />
    </>
  )
}

export default App
