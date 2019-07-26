import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'

export default () => (
  <nav role="navigation">
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
      <Link to="/">
        <img src="/images/notexture_logo.png" style={{ maxWidth: 150 }}/>
      </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/blog/">Blog</Link>
      </li>
      <li className={styles.navigationItem}>
        <a target="_blank" href="https://www.youtube.com/channel/UC41zd0suaVa-UD0C6iK285Q">YouTube</a>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/contact">Contact</Link>
      </li>
    </ul>
  </nav>
)
