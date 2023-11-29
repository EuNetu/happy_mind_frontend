import api from '../../../utils/api'

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import styles from './CareStudent.module.css'


function CareStudent() {
  const [student, setStudent] = useState({})
  const [records, setRecords] = useState([])
  const { id } = useParams()
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api.get(`/record/${id}/all`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      }
    }).then((response) => {
      setStudent(response.data.student)
      setRecords(response.data.records)
    })
  }, [id])

  function idade(data_aniversario) {
    if (data_aniversario) {
      var d = new Date(),
        ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate(),

        partes = data_aniversario.split("-"),
        ano_aniversario = +partes[0],
        mes_aniversario = +partes[1],
        dia_aniversario = +partes[2],

        quantos_anos = ano_atual - ano_aniversario;

      if (mes_atual < mes_aniversario || (mes_atual === mes_aniversario && dia_atual < dia_aniversario)) {
        quantos_anos--;
      }

      return quantos_anos < 0 ? 0 : quantos_anos;
    } else {
      return 0
    }
  }

  function dataAtualFormatada(data) {
    var data = new Date(data),
      dia = data.getDate().toString(),
      diaF = (dia.length == 1) ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(),
      mesF = (mes.length == 1) ? '0' + mes : mes,
      anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
  }

  return (
    <>
      <div className={styles.details_header}>
        <div className={styles.details_control}>
          <h1>Nome: </h1>
          <p>{student.name}</p>
        </div>
        <div className={styles.details_links}>
          <Link to={`/student/${id}`}>Editar Ficha</Link>
          <Link to={`/responsible/treatment/${id}`}>Acompanhamento com os responsáveis</Link>
        </div>
      </div>
      <div className={styles.details_cotainer}>
        <div className={styles.details_control}>
          <h1>Gênero: </h1>
          <p>{student.gender}</p>
          <h1>idade: </h1>
          <p>{idade(student.birth)} anos</p>
        </div>
        <div className={styles.details_control}>
          <h1>Telefone: </h1>
          <p>({student.code_area}){student.phone}</p>
          <h1>E-mail: </h1>
          <p>{student.email}</p>
        </div>
      </div>
      <div className={styles.details_cotainer}>
        <div className={styles.details_control}>
          <h1>Matrícula: </h1>
          <p>{student.matriculation}</p>
        </div >
        <div className={styles.details_control}>
          <h1>curso: </h1>
          <p>{student.course}</p>
        </div>
        <div className={styles.details_control}>
          <h1>Situação Acadêmica: </h1>
          <p>{student.academicStatus}</p>
        </div>                
        <div className={styles.details_control}>
          <h1>Nível de escolaridade: </h1>
          <p>{student.levelEducation}</p>
        </div>
        <div className={styles.details_control}>
          <h1>Aluno Residente: </h1>
          <p>{student.residentStudent ? "Sim" : "Não"}</p>
          <h1>Recebe Auxílio: </h1>
          <p>{student.isColleger ? "Sim" : "Não"}</p>
        </div>
      </div>
      <div className={styles.details_cotainer}>
        <div className={styles.details_control}>
          <h1>Principal motivo de procura do atendimento pscicológico: </h1>
          <p>{student.reasonForDemand}</p>
        </div>
        <div className={styles.details_control}>
          <h1>Tipo de encaminhamento: </h1>
          <p>{student.typeTreatment}</p>
        </div>
      </div>
      <div className={styles.students_container}>
        <div className={styles.records_links}>
          <Link to={`/record/create/${id}`}>Cadastrar um novo acompanhamento</Link>
          <Link to={`/student/${id}/full`}>Visualização para impressão</Link>
        </div>
        {records.length > 0 &&
          records.map((record) => (
            <Link key={record.id} to={`/edit/treatment/${record.id}`} className={styles.row} >
              <div className={styles.article_wrapper}>
                <article className={styles.card_content}>
                  <div>
                    <h3></h3>
                    <h2>Data de registro: {dataAtualFormatada(record.createdAt)}</h2>
                    <h2>Multidisciplinar: {record.multidisciplinary == true ? "Sim" : "Não"}</h2>
                    <h2>Encaminhamento(s): {record.forwarding ? record.forwarding : "Nenhum"}</h2>
                  </div>
                </article>
              </div>
            </Link>
          ))}
        {records.length == 0 && <p className={styles.without_records}>Ainda não há acolhimentos para este aluno!</p>}
      </div>



    </>

  )
}

export default CareStudent
