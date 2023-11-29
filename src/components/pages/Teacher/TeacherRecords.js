import api from '../../../utils/api'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from '../Student/MyStudents.module.css'

function TeacherRecords() {
  const [records, setRecords] = useState([])
  const [filter, setfilter] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api
      .get('/teacher/all', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setRecords(response.data.records)
      })
  }, [token])

  function getWithFilter() {
    api
    .post('/teacher/filter', filter, {
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

  return (
    <section>
      <div className={styles.students_header}>
        <h1>Atendimentos Com Professores</h1>
        <Link to="/teacher/create">Cadastrar Acompanhamento</Link>
      </div>
      <div className={styles.students_filter}>
          <input
            text="Pesquise pelo nome do professor"
            type="text"
            name="filterNome"
            placeholder="Digite o nome do professor"
            onChange={handleChangeFilter}
          />
          <input type="submit" onClick={getWithFilter} class="btn" value="Buscar" />
      </div>
      <div className={styles.students_container}>
        {records.length > 0 &&
          records.map((record) => (
            <Link key={record.id} to={`/teacher/${record.id}`} className={styles.row} >
              <div className={styles.article_wrapper}>
                <article className={styles.card_content}>
                  <div>
                    <h1>{record.teacher}</h1>
                    <small>{dataAtualFormatada(record.createdAt)}</small>
                  </div>
                  <p>Multidisciplinar: {record.multidisciplinary == true ? "Sim" : "Não"}</p>
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

export default TeacherRecords
