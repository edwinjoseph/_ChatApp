import { forwardRef } from "react"
import styles from './styles.module.scss'

const InputField = forwardRef(({ type, name, label, placeholder }, ref) => (
  <div className={styles.InputField}>
    {label && (
      <label htmlFor={name}>{label}</label>
    )}
    <input 
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      ref={ref}
    />
  </div>
));

export default InputField
