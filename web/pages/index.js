import Head from 'next/head'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useSessionStorage } from 'react-use'

const Home = ({ socket }) => {
  const methods = useForm({
    defaultValues: {
      username: 'user',
      room: 'room',
    }
  })
  const router = useRouter()

  const [, setUsername ] = useSessionStorage('username')

  const onFormSubmit = ({ username, room }) => {
    setUsername(username)
    socket.emit("join", { username, room })
    router.push(`/chat/${room}`)
  }

  return (
    <>
      <Head>
        <title>Login - ChatApp</title>
      </Head>
      <main>
        <section id="login">
          <div className="container container--narrow">
            <form onSubmit={methods.handleSubmit(onFormSubmit)}>
              <div className="field">
                <label htmlFor="username">Enter your username</label>
                <input 
                  type="text"
                  name="username"
                  id="username"
                  ref={methods.register()}
                />
              </div>
              <div className="field">
                <label htmlFor="room">Enter the room name</label>
                <input 
                  type="text"
                  name="room"
                  id="room"
                  ref={methods.register()}
                />
              </div>
              <button type="submit">Join room</button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home
