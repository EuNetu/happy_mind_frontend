import api from '../../../utils/api'

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Input from '../../tags/Input'
import Select from '../../tags/Select'
import CheckBox from '../../tags/CheckBox'
import styles from './RegisterStudents.module.css'


import useFlashMessage from '../../../hooks/useFlashMessage'

function EditStudents() {
  const [student, setStudent] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    api.get(`/student/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      }
    }).then((response) => {
      setStudent(response.data.student)
    })
  }, [id])

  function handleChange(e) {
    setStudent({ ...student, [e.target.name]: e.target.value })
  }

  function handleCheck(e) {
    const { name, checked } = e.target;
    setStudent({
      ...student,
      [name]: checked,
    });
  }

  async function update(e) {
    let msgType = 'success'

    e.preventDefault()
    const data = await api
      .patch(`/student/${student.id}`, student, {
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
      navigate(`/student/treatment/${student.id}`)
    }
  }

  return (
    <section className={styles.form_container}>
      <h1>Cadastrar um estudante</h1>
      <form onSubmit={update}>
        <h3>Informações do estudante</h3>
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite do aluno"
          value={student.name || ""}
          handleOnChange={handleChange}
        />
        <Select
          text="Gênero"
          name="gender"
          options={["Masculino", "Feminino"]}
          value={student.gender || ""}
          handleOnChange={handleChange}
        />
        <Input
          text="Data de nascimento"
          type="date"
          name="birth"
          value={student.birth || ""}
          handleOnChange={handleChange}
        />
        <Input
          text="Localidade"
          type="text"
          name="locality"
          placeholder="Digite a localidade do aluno"
          value={student.locality || ""}
          handleOnChange={handleChange}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          value={student.phone || ""}
          valueDDD={student.code_area}
          handleOnChange={handleChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o e-mail do aluno"
          value={student.email || ""}
          handleOnChange={handleChange}
        />
        <hr></hr>
        <Input
          text="Matrícula"
          type="text"
          name="matriculation"
          placeholder="Digite a matrícula do aluno"
          value={student.matriculation || ""}
          handleOnChange={handleChange}
        />
        <Input
          text="Curso"
          type="text"
          name="course"
          placeholder="Digite o curso do aluno"
          value={student.course || ""}
          handleOnChange={handleChange}
        />
        <Input
          text="Situação Acadêmica"
          type="text"
          name="academicStatus"
          placeholder="Digite a situação acadêmica do aluno"
          value={student.academicStatus || ""}
          handleOnChange={handleChange}
        />
        <Select
          text="Nível de escolaridade"
          name="levelEducation"
          options={["Técnico Integrado", "Técnico Subsequente", "Graduação", "Pós-Graduação"]}
          value={student.levelEducation || ""}
          handleOnChange={handleChange}
        />
        <div className={styles.checkbox_container}>
          <CheckBox
            text="Aluno Residente"
            type="checkbox"
            name="residentStudent"
            checked={student.residentStudent || false}
            handleOnChange={handleCheck}
          />
          <CheckBox
            text="Recebe Auxílio"
            type="checkbox"
            name="isColleger"
            checked={student.isColleger || false}
            handleOnChange={handleCheck}
          />
        </div>
        <hr></hr>
        <Select
          text="Principal motivo de procura do atendimento pscicológico"
          name="reasonForDemand"
          options={["Dificuldades acadêmicas", "Orientação", "Sofrimento Psíquico/Emocional", "Dificuldades Familiares", "Dificuldades de Relacionamento", "Outros"]}
          value={student.reasonForDemand || ""}
          handleOnChange={handleChange}
        />
        <Select
          text="Tipo de encaminhamento"
          name="typeTreatment"
          options={["Plantão Psicológico", "Encaminhamento", "Livre Demanda", "Acompanhamento de Rendimento"]}
          value={student.typeTreatment || ""}
          handleOnChange={handleChange}
         />
         <input type="submit" value="Editar" />
      </form>
    </section>
  )
}

export default EditStudents
