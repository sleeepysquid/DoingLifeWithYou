import React from 'react'
import { Link } from 'gatsby'
import base from './base.css'
import Container from './container'
import Navigation from './navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-solid-svg-icons'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <Container>
        <Navigation />
        {children}
        <div style={{ height: '150px', background: '#100e17', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div><FontAwesomeIcon icon={faCoffee} /></div>
          <div><FontAwesomeIcon icon={['fab', 'apple']} /></div>
          {/* <div><FontAwesomeIcon icon={faTwitter} /></div>
          <div><FontAwesomeIcon icon={faYoutube} /></div> */}
          <div>© 2019 Doing Life With You</div>
        </div>
      </Container>
    )
  }
}

export default Template
