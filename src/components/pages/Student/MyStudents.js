import api from '../../../utils/api'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './MyStudents.module.css'

function MyStudents() {
  const [students, setStudents] = useState([])
  const [filter, setfilter] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api
      .get('/student/all', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setStudents(response.data.students)
      })
  }, [token])

  function idade(data_aniversario) {
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
  }

  function getWithFilter() {
    api
    .post('/student/filter', filter, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    })
    .then((response) => {
      setStudents(response.data.students)
    })
  }

  function handleChangeFilter(e) {
    setfilter({ ...filter, [e.target.name]: e.target.value })
    

  }

  return (
    <section>
      <div className={styles.students_header}>
        <h1>Estudantes</h1>
        <Link to="/student/create">Cadastrar Estudante</Link>
      </div>
      <div className={styles.students_filter}>
          <input
            text="Pesquise por um aluno"
            type="text"
            name="filterNome"
            placeholder="Digite o nome do aluno"
            onChange={handleChangeFilter}
          />
          <input type="submit" onClick={getWithFilter} class="btn" value="Buscar" />
      </div>
      <div className={styles.students_container}>
        {students.length > 0 &&
          students.map((student) => (
            <Link key={student.id} to={`/student/treatment/${student.id}`} className={styles.row} >
              <div className={styles.article_wrapper}>
                <article className={styles.card_content}>
                  <div>
                    <h1>{student.name}</h1>
                    <small>{idade(student.birth)} anos</small>
                  </div>
                  <p>{student.course} ({student.levelEducation})</p>
                </article>
              </div>
            </Link>
          ))}
        {students.length == 0 && <p>Ainda não há estudantes cadastrados!</p>}
      </div>
    </section>
  )
}

export default MyStudents