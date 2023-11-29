import styles from './Select.module.css';
import { useState, useEffect } from 'react';

function Select({ text, name, options, handleOnChange, value, placeholder }) {
  const [showInput, setShowInput] = useState();
  const [valueOutro, setValueOutro] = useState();

  useEffect(() => {
    if (!options.includes(value) && value) {
      setValueOutro(value);
      setShowInput(true);
    }
  }, [value, options]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    handleOnChange(e);

    if (selectedValue === "Outros") {
      setShowInput(true);
      setValueOutro("");
    } else {
      setShowInput(false);
    }
  };

  const handleInputChange = (e) => {
    // Atualize o estado valueOutro no evento onChange
    setValueOutro(e.target.value);
    handleOnChange(e);
  };

  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select
        name={name}
        id={name}
        onChange={handleSelectChange}
        value={value}
      >
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      {showInput && (
        <div className={styles.container_outros}>
          <input
            className={styles.input_outros}
            type="text"
            name={name}
            placeholder="Outro Motivo"
            value={valueOutro}
            onChange={handleInputChange}
          />
        </div>
      )}
    </div>
  );
}

export default Select;
