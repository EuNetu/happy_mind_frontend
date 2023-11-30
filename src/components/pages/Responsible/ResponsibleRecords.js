import api from '../../../utils/api'

import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from '../Student/MyStudents.module.css'

function ResponsibleRecords() {
  const [student, setStudent] = useState({})
  const [records, setRecords] = useState([])
  const [filter, setfilter] = useState({})
  const { id } = useParams()
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api.get(`/responsible/${id}/all`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      }
    }).then((response) => {
      setStudent(response.data.student)
      setRecords(response.data.records)
    })
  }, [id])

  function getWithFilter() {
    api
    .post('/responsible/filter', filter, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    })
    .then((response) => {
      setRecords(response.data.records)
    })
  }

  function handleChangeFilter(e) {
    setfilter({ ...filter, [e.target.name]: e.target.value })
    

  }

  function dataAtualFormatada(data){
    var data = new Date(data),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
}

const primeiroNome = (nome) => nome ? nome.split(' ')[0] : ""

  return (
    <section>
      <div className={styles.students_header}>
        <h1>Atendimentos com os resposáveis do(a) <h3>{primeiroNome(student.name)}</h3></h1>
        <Link to={`/responsible/create/${id}`}>Cadastrar Acompanhamento Com o Responsável</Link>
      </div>
      {/* <div className={styles.students_filter}>
          <input
            text="Pesquise pelo nome do responsável"
            type="text"
            name="filterNome"
            placeholder="Digite o nome do responsável"
            onChange={handleChangeFilter}
          />
          <input type="submit" onClick={getWithFilter} class="btn" value="Buscar" />
      </div> */}
      <div className={styles.students_container}>
        {records.length > 0 &&
          records.map((record) => (
            <Link key={record.id} to={`/responsible/${record.id}`} className={styles.row} >
              <div className={styles.article_wrapper}>
                <article className={styles.card_content}>
                  <div>
                    <h1>{record.responsible}</h1>
                    <small>{dataAtualFormatada(record.createdAt)}</small>
                  </div>
                  <p>{record.multidisciplinary == true ? "Multidisciplinar" : "Individual"}</p>
                  <p>Encaminhamento(s): {record.forwarding ? record.forwarding: "Nenhum"}</p>
                </article>
              </div>
            </Link>
          ))}
        {records.length == 0 && <p>Ainda não há acompanhamentos cadastrados!</p>}
      </div>
    </section>
  )
}

export default ResponsibleRecords
