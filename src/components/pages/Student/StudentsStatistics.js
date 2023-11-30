import api from '../../../utils/api'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './StudentsStatistics.module.css'

function StudentsStatistics() {
  const [resultStatistics, setResultStatistics] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api
      .get('/student/statistics', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setResultStatistics(response.data.resultStatistics)
        console.log(resultStatistics)
      })
  }, [token])

  // function idade(data_aniversario) {
  //   var d = new Date(),
  //     ano_atual = d.getFullYear(),
  //     mes_atual = d.getMonth() + 1,
  //     dia_atual = d.getDate(),

  //     partes = data_aniversario.split("-"),
  //     ano_aniversario = +partes[0],
  //     mes_aniversario = +partes[1],
  //     dia_aniversario = +partes[2],

  //     quantos_anos = ano_atual - ano_aniversario;

  //   if (mes_atual < mes_aniversario || (mes_atual === mes_aniversario && dia_atual < dia_aniversario)) {
  //     quantos_anos--;
  //   }

  //   return quantos_anos < 0 ? 0 : quantos_anos;
  // }

  return (
    <section>
      <div className={styles.students_header}>
        <h1>Estatísticas</h1>
        <div>
          <Link to="/student/all">Voltar</Link>
          <Link to="/student/statistics">Estatísticas</Link>
        </div>
      </div>
      <div className={styles.statistic_container}>
        <h2>Gênero</h2>
        {resultStatistics.gender &&(
          resultStatistics.gender.map((gender) => (
              <div className={styles.article_wrapper}>
                <h3>{gender.gender}: {gender.count}</h3>
              </div>
          ))
        )}
      </div>
        <hr></hr>
      <div className={styles.statistic_container}>
        <h2>Curso</h2>
        {resultStatistics.course &&(
          resultStatistics.course.map((course) => (
              <div className={styles.article_wrapper}>
                <h3>{course.course}: {course.count}</h3>
              </div>
          ))
        )}
      </div>
      <hr></hr>
      <div className={styles.statistic_container}>
        <h2>Ano</h2>
        {resultStatistics.created &&(
          resultStatistics.created.map((created) => (
              <div className={styles.article_wrapper}>
                <h3>{created.year}: {created.count}</h3>
              </div>
          ))
        )}
      </div>
      <hr></hr>
      <div className={styles.statistic_container}>
        <h2>Residente</h2>
        {resultStatistics.residentStudent &&(
          resultStatistics.residentStudent.map((residentStudent) => (
              <div className={styles.article_wrapper}>
                <h3>Residentes: {residentStudent.resident}</h3>
                <h3>Não Residentes: {residentStudent.no_resident}</h3>
              </div>
          ))
        )}
      </div>
      <hr></hr>
      <div className={styles.statistic_container}>
        <h2>Demanda</h2>
        {resultStatistics.reasonForDemand &&(
          resultStatistics.reasonForDemand.map((reasonForDemand) => (
              <div className={styles.article_wrapper}>
                <h3>{reasonForDemand.reasonForDemand}: {reasonForDemand.count}</h3>
              </div>
          ))
        )}
      </div>
      <hr></hr>
      <div className={styles.statistic_container}>
        <h2>Multidisciplinar</h2>
        {resultStatistics.multidisciplinary &&(
          resultStatistics.multidisciplinary.map((multidisciplinary) => (
              <div className={styles.article_wrapper}>
                <h3>Multidisciplinar: {multidisciplinary.multidisciplinary}</h3>
                <h3>Individual: {multidisciplinary.individual}</h3>
              </div>
          ))
        )}
      </div>
    </section>
  )
}

export default StudentsStatistics
