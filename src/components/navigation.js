import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'
import { ReactTypeformEmbed } from 'react-typeform-embed';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.openForm = this.openForm.bind(this);
  }

  openForm() {
    this.typeformEmbed.typeform.open();
  }

  render() {
    return (
      <div>
        <ReactTypeformEmbed
          popup
          autoOpen={false}
          url="https://lawrence802956.typeform.com/to/ltqitz"
          ref={tf => {
            this.typeformEmbed = tf;
          }}
        />
        <nav role="navigation" className={styles.navbar}>
          <Link to="/">
            <img src="/images/notexture_logo.png" style={{ maxWidth: 150 }}/>
          </Link>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/blog/">Blog</Link>
            </li>
            <li className={styles.navItem}>
              <a target="_blank" href="https://www.youtube.com/channel/UC41zd0suaVa-UD0C6iK285Q">YouTube</a>
            </li>
            <li className={styles.navItem} onClick={this.openForm}>
              Contact
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Navigation