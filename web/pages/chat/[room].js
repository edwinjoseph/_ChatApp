import { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Messages from '../../components/Messages'
import InputField from '../../components/shared/atoms/InputField'
import styles from './room.module.scss'

const Chat = ({ socket }) => {
  const messageFormRef = useRef()
  const [ formHeight, setFormHeight ] = useState(0)
  const methods = useForm()

  const handleFormSubmit = ({ text }) => {
    if (!text) {
      return;
    }
    socket.emit('chat', text);
    methods.reset()
  }

  const getFormHeight = () => {
    const { current } = messageFormRef;

    if (!current) {
      return 0;
    }

    return current.getBoundingClientRect().height
  }

  useEffect(() => {
    setFormHeight(getFormHeight())
  }, [ messageFormRef ])

  return (
    <main>
      <section id="chat">
        <Messages socket={socket} formHeight={formHeight} />
        <form 
          className={styles.Form}
          onSubmit={methods.handleSubmit(handleFormSubmit)}
          ref={messageFormRef}>
          <InputField 
            type="text"
            name="text"
            placeholder="Type a message"
            ref={methods.register()}
          />
        </form>
      </section>
    </main>
  )
}

export default Chat
