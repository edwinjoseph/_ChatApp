import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useSessionStorage } from 'react-use'
import cx from 'classnames';
import styles from './styles.module.scss'

const Chat = ({ socket }) => {
  const { query } = useRouter()
  const [ messages, setMessages ] = useState([])
  const [ username ] = useSessionStorage('username')

  const methods = useForm()

  const updateMessages = useCallback((message) => {
    setMessages((state) => {
      return [ ...state, message ];
    })
  }, [ messages ]);

  useEffect(() => {
    socket.on('message', (data) => {
      const decrypted = data.text

      updateMessages({
        userId: data.id,
        user: data.user,
        text: decrypted,
      })
    })
  }, [socket])

  const handleFormSubmit = ({ text }) => {
    if (!text) {
      return;
    }
    socket.emit('chat', text);
    methods.reset()
  }

  return (
    <main>
      <section id="chat">
        <div className="container">
          <div className={styles.Messages}>
            {messages.map((message, key) => {
              const isUser = message.user === username;
              const isAlert = message.user === query.room;
              return (
                <div key={key} className={cx(styles.Message, {
                  [styles['Message--right']]: isUser,
                  [styles['Message--alert']]: isAlert
                })}>
                  {(!isUser && !isAlert)&& (<span>{message.user}</span>)}
                  <p>{message.text}</p>
                </div>
              )
            })}
          </div>
          <form 
            className={styles.Form}
            onSubmit={methods.handleSubmit(handleFormSubmit)}>
            <div className="field">
              <input 
                type="text"
                name="text"
                id="text"
                placeholder="Type a message"
                ref={methods.register()}
              />
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Chat
