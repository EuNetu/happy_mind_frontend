import api from '../../../utils/api'

import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import Input from '../../tags/Input'
import CheckBox from '../../tags/CheckBox'
import styles from '../Record/RegisterRecords.module.css'

import useFlashMessage from '../../../hooks/useFlashMessage'

function RegisterResponsibleRecords() {
  const [record, setRecord] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const { id } = useParams()
  const navigate = useNavigate()

  function handleChange(e) {
    setRecord({ ...record, [e.target.name]: e.target.value })
  }

  function handleCheck(e) {
    const { name, checked } = e.target;
    setRecord({
      ...record,
      [name]: checked,
    });
  }

  async function create(e) {
    let msgType = 'success'

    e.preventDefault()
    const data = await api
      .post(`/responsible/create/${id}`, record, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)

    if(msgType == 'success'){
      navigate(`/responsible/treatment/${id}`)
    }
  }

  return (
    <section className={styles.form_container}>

      <form onSubmit={create}>
        <div className={styles.form_header}>
          <h1>Cadastrar um atendimento</h1>
          <input type="submit" value="Cadastrar" />
        </div>
        <Input
          text="Nome do reponsável"
          type="text"
          name="responsible"
          placeholder="Digite o nome do responsável"
          handleOnChange={handleChange}
        />
        <CheckBox
            text="Multidisciplinar"
            type="checkbox"
            name="multidisciplinary"
            handleOnChange={handleCheck}
          />
        <label>Relato do atendimento:</label>
        <textarea onChange={handleChange} id="note" name="note" rows="8" />
        <Input
          text="Encaminhamento(s)"
          type="text"
          name="forwarding"
          placeholder="Digite o encaminhamento"
          handleOnChange={handleChange}
        />
      </form>
    </section>
  )
}

export default RegisterResponsibleRecords
