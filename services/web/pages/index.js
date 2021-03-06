import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSessionStorage } from 'react-use'

import InputField from '../components/shared/atoms/InputField'
import Button from '../components/shared/atoms/Button'
import styles from './index.module.scss'

const Home = ({ socket }) => {
  const router = useRouter()
  const methods = useForm({
    defaultValues: {
      room: router.query.room,
    }
  })

  const [, setUsername ] = useSessionStorage('username')

  const onFormSubmit = ({ username, room }) => {
    setUsername(username)
    socket.emit("join", { username, room })
    router.push(`/chat/${room}`)
  }
  
  useEffect(() => {
    if (router.query.room) {
      methods.setValue('room', router.query.room, { shouldDirty: true })
    }
  }, [ router.query ]) 

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
                <Button type="submit">Join room</Button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home
