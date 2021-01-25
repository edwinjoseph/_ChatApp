import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSessionStorage, useUnmount } from 'react-use'
import cx from 'classnames'
import styles from './styles.module.scss'

const Messages = ({ socket, formHeight }) => {
  const { query, ...router } = useRouter()
  const [ messages, setMessages ] = useState([])
  const [ username, setUsername ] = useSessionStorage('username')

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

  useEffect(() => {
    if (!username) {
      router.push('/')
    }

    window.onbeforeunload = () => {
      setUsername(null);
    }
  }, [])

  return (
    <div className={styles.Messages} style={{ '--form-height': `${formHeight}px` }}>
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
