import { useForm } from 'react-hook-form'
import Messages from '../../components/Messages'
import InputField from '../../components/shared/atoms/InputField'
import styles from './room.module.scss'

const Chat = ({ socket }) => {
  const methods = useForm()

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
        <Messages socket={socket} />
        <form 
          className={styles.Form}
          onSubmit={methods.handleSubmit(handleFormSubmit)}>
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
