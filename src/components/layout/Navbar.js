import { Link } from 'react-router-dom'
import React, { useContext } from 'react'

import styles from './Navbar.module.css'

import Logo from '../../assets/img/logo.png'

/* contexts */
import { Context } from '../../context/UserContext'

/* hooks */

function Navbar() {
  const { authenticated, logout } = useContext(Context)

  return (
    <nav>
      {authenticated ? (
        <>
          <div className={styles.navbar_authenticated}>
            <div className={styles.navbar_logo}>
              <img src={Logo} alt="Happy Mind" />
              <h2>Happy Mind</h2>
            </div>
            <ul>
              <li>
                <Link to="/student/all">Meus Estudantes</Link>
              </li>
              <li>
                <Link to="/teacher/all">Atend. Professores</Link>
              </li>
              <li>
                <Link to="/group/all">Atend. Grupos</Link>
              </li>
              <li>
                <Link to="/user/profile">Meu Perfil</Link>
              </li>
              <li onClick={logout}>Sair</li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className={styles.navbar}>
            <div className={styles.navbar_logo}>
              <img src={Logo} alt="Happy Mind" />
              <h2>Happy Mind</h2>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}

export default Navbar
