import api from '../../utils/api'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Home.module.css'

function Home() {
  return (
    <section>
      <div className={styles.home_container}>
        <div className={styles.button_container}>
            <Link to="/login" className={styles.home_button}>Login</Link>
            <Link to="/register" className={styles.home_button}>Registro</Link>
        </div>
      </div>
    </section>
  )
}

export default Home
