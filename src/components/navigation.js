import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'
import { ReactTypeformEmbed } from 'react-typeform-embed';
import { FaBars } from 'react-icons/fa';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.openForm = this.openForm.bind(this);
  }

  openForm() {
    this.typeformEmbed.typeform.open();
  }

  openNavbar() {
    var mainNav = document.getElementById("mainNav");
    var logo = document.getElementById("logo");

    if (mainNav.className === styles.navbar) {
      mainNav.className += ` ${styles.responsive}`;
      logo.className += ` ${styles.hideLogo}`
    } else {
      mainNav.className = styles.navbar;
      logo.className = styles.logo;
    }
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
        <nav role="navigation" className={styles.navbar} id="mainNav">
          <Link className={styles.logo} to="/" id="logo">
            <img src="/images/notexture_logo.png" style={{ maxWidth: 150, marginTop: '-20px' }}/>
          </Link>
          <div className={styles.navList}>
              <Link className={styles.navItem} to="/blog/">Blog</Link>
              <a className={styles.navItem} href="https://www.youtube.com/channel/UC41zd0suaVa-UD0C6iK285Q" target="_blank" rel="noopener">YouTube</a>
              <a className={styles.navItem} href="javascript:void(0);" onClick={this.openForm}>Contact</a>
              <a className={`${styles.navItem} ${styles.navToggle}` } href="javascript:void(0);" onClick={this.openNavbar}>
                <FaBars size="25" />
              </a>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navigation