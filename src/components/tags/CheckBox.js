import styles from './CheckBox.module.css'

function CheckBox({
  text,
  name,
  handleOnChange,
  checked,
}) {
  return (
    <div>
      <div className={styles.form_control}>
        <label htmlFor={name}>{text}:</label>
        <input
          type="checkbox"
          name={name}
          id={name}
          onChange={handleOnChange}
          checked={checked}
        />
      </div>
    </div>
  )
}

export default CheckBox
