import Head from 'next/head'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useSessionStorage } from 'react-use'

import InputField from '../components/shared/atoms/InputField'
import styles from './index.module.scss'

const Home = ({ socket }) => {
  const methods = useForm()
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
        <section id="login" className={styles.Login}>
          <div className="container container--narrow">
            <form onSubmit={methods.handleSubmit(onFormSubmit)}>
              <div className={styles.Avatar}></div>
              <div className={styles.FormContent}>
                <InputField 
                  type="text"
                  name="username"
                  label="Username"
                  placeholder="Enter your username"
                  ref={methods.register()}
                />
                <InputField 
                  type="text"
                  name="room"
                  label="Room name"
                  placeholder="Enter the room name"
                  ref={methods.register()}
                />
                <button type="submit">Join room</button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home
