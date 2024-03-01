// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from 'react-chartjs-2';
import api from '../../../utils/api';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './StudentsStatistics.module.css';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const data = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

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


  return (
    <section>
      <div className={styles.students_header}>
        <h1>Estatísticas</h1>
        <div>
          <Link to="/student/all">Voltar</Link>
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
        {/* <Pie data={data} />; */}
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
