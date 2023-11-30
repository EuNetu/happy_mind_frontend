import api from '../../../utils/api'

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import styles from './RecordFull.module.css'


function RecordFull() {
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


  function dataAtualFormatada(data){
    var data = new Date(data),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
}

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

  return (
    <>
    <div className={styles.full_header}>
    </div>
      <div className={styles.full_header}>
        <div className={styles.full_header_control}>
          <h1>Nome: </h1>
          <p>{student.name}</p>
        </div>
        <div className={styles.full_links}>
          <Link to={`/student/treatment/${id}`}>Sair</Link>
        </div>
      </div>
      <div className={styles.details_full_cotainer}>
        <div className={styles.details_full_control}>
          <h1>Gênero: </h1>
          <p>{student.gender}</p>
          <h1>Idade: </h1>
          <p>{idade(student.birth)} anos</p>
        </div>
        <div className={styles.details_full_control}>
          <h1>Telefone: </h1>
          <p>({student.code_area}){student.phone}</p>
          <h1>E-mail: </h1>
          <p>{student.email}</p>
        </div>
      </div>
      <div className={styles.details_full_cotainer}>
        <div className={styles.details_full_control}>
          <h1>Matrícula: </h1>
          <p>{student.matriculation}</p>
        </div >
        <div className={styles.details_full_control}>
          <h1>Curso: </h1>
          <p>{student.course}</p>
        </div>
        <div className={styles.details_full_control}>
          <h1>Situação Acadêmica: </h1>
          <p>{student.academicStatus}</p>
        </div>                
        <div className={styles.details_full_control}>
          <h1>Nível de escolaridade: </h1>
          <p>{student.levelEducation}</p>
        </div>
        <div className={styles.details_full_control}>
          <h1>Aluno Residente: </h1>
          <p>{student.residentStudent ? "Sim" : "Não"}</p>
          <h1>Recebe Auxílio: </h1>
          <p>{student.isColleger ? "Sim" : "Não"}</p>
        </div>
      </div>
      <div className={styles.details_full_cotainer}>
        <div className={styles.details_full_control}>
          <h1>Principal motivo de procura do atendimento pscicológico: </h1>
          <p>{student.reasonForDemand}</p>
        </div>
        <div className={styles.details_full_control}>
          <h1>Tipo de encaminhamento: </h1>
          <p>{student.typeTreatment}</p>
        </div>
      </div>
      <div className={styles.full_cotainer}>
        {records.length > 0 &&
          records.map((record) => (
              <div className={styles.full_controle}>
                  <div>
                    <h3></h3>
                    <h2>Data de registro: {dataAtualFormatada(record.createdAt)}</h2>
                    <h2>{record.multidisciplinary == true ? "Multidisciplinar" : "Individual"}</h2>
                    <h2>Encaminhamento(s): {record.forwarding ? record.forwarding: "Nenhum"}</h2>
                    <h4>Relato do atendimento:</h4>
                    <h4>{record.note}</h4>
                  </div>
              </div>
          ))}
        {records.length == 0 && <p className={styles.without_records}>Ainda não há acolhimentos para este aluno!</p>}
      </div>
    </>

  )
}

export default RecordFull
