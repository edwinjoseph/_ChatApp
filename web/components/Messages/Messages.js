import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSessionStorage } from 'react-use'
import cx from 'classnames'
import styles from './styles.module.scss'

const Messages = ({ socket }) => {
  const { query } = useRouter()
  const [ messages, setMessages ] = useState([])
  const [ username ] = useSessionStorage('username')

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

  return (
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
  )
}

export default Messages
