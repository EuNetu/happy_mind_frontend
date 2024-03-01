import api from '../../../utils/api'

import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import Input from '../../tags/Input'
import CheckBox from '../../tags/CheckBox'
import styles from '../Record/RegisterRecords.module.css'

import useFlashMessage from '../../../hooks/useFlashMessage'

function DetailsGroupRecords() {
  const [record, setRecord] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    api.get(`/group/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      }
    }).then((response) => {
      setRecord(response.data.record)
    })
  }, [id])

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

  async function update(e) {
    let msgType = 'success'

    e.preventDefault()
    const data = await api
      .patch(`/group/${id}`, record, {
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

    if (msgType == 'success') {
      navigate(`/group/all`)
    }
  }

  return (
    <section className={styles.form_container}>

      <form onSubmit={update}>
        <div className={styles.form_header}>
          <h1>Atendimento</h1>
          <div>
            <input type="submit" value="Atualizar" />
            <Link to={`/group/all`}>Sair sem salvar</Link>
          </div>
        </div>
        <Input
          text="Razão:"
          type="text"
          name="reason"
          placeholder="Digite a razão do acolhimento"
          value={record.reason || ""}
          handleOnChange={handleChange}
        />
        <CheckBox
            text="Multidisciplinar"
            type="checkbox"
            name="multidisciplinary"
            checked={record.multidisciplinary}
            handleOnChange={handleCheck}
          />
        <label>Relato do atendimento:</label>
        <textarea value={record.note || ""} onChange={handleChange} id="note" name="note" rows="8" />
        <Input
          text="Encaminhamento(s)"
          type="text"
          name="forwarding"
          placeholder="Digite o encaminhamento"
          value={record.forwarding || ""}
          handleOnChange={handleChange}
        />
      </form>
    </section>
  )
}

export default DetailsGroupRecords
