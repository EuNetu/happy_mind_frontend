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
      <div className={styles.full_cotainer}>
        {records.length > 0 &&
          records.map((record) => (
              <div className={styles.full_controle}>
                  <div>
                    <h3></h3>
                    <h2>Data de registro: {dataAtualFormatada(record.createdAt)}</h2>
                    <h2>Multidisciplinar: {record.multidisciplinary == true ? "Sim" : "Não"}</h2>
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
