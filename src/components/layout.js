import React from 'react'
import { Link } from 'gatsby'
import base from './base.css'
import Helmet from 'react-helmet'
import Container from './container'
import Navigation from './navigation'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header
    let socialSize = 25

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <Container>
        <Navigation />
        {children}
        <div style={{ height: '150px', background: '#0a2f63', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <div>© 2019 Doing Life With You</div>
          <div style={{display: 'flex', justifyContent: 'space-around', padding: '20px', width: '200px'}}>
            <a href="https://www.instagram.com/doinglifewithyou/" target="_blank">
              <FaInstagram size={socialSize}/>
            </a>
            <a href="https://www.youtube.com/channel/UC41zd0suaVa-UD0C6iK285Q" target="_blank">
              <FaYoutube size={socialSize} fill="#ff0000"/>
            </a>
            <a href="https://twitter.com/doinglifewithu" target="_blank">
              <FaTwitter size={socialSize} fill="#1ea0f1"/>
            </a>
          </div>
        </div>
      </Container>
    )
  }
}

export default Template
