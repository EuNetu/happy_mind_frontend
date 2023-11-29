import styles from './Input.module.css'

function Input({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  valueDDD,
}) {
  return (
    <div>
      {name == "phone" ? (
        <>
          <div className={styles.form_phone}>
            <div className={`${styles.form_control_phone} ${styles.first_input}`}>
              <label htmlFor="code_area">DDD:</label>
              <input
                type={type}
                name="code_area"
                id="code_area"
                placeholder='DDD'
                onChange={handleOnChange}
                value={valueDDD}
              />
            </div>
            <div className={styles.form_control_phone}>
              <label htmlFor={name}>{text}:</label>
              <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input
              type={type}
              name={name}
              id={name}
              placeholder={placeholder}
              onChange={handleOnChange}
              value={value}
            />
          </div>
        </>
      )
      }

    </div>

  )
}

export default Input
