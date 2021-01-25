import styles from './styles.module.scss'

const Button = ({ type, onClick, children }) => (
  <button
    className={styles.Button}
    type={type}
    onClick={onClick}>
    {children}
  </button>
)

export default Button
