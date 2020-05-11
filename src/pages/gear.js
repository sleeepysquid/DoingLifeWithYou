import React from 'react'
import styles from './gear.module.css'
import Layout from '../components/layout'
import SignUpForm from '../components/signup-form'

class GearIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <div className={styles.hero}>
            <div className="gradient-layer"></div>
          </div>
          <div className="wrapper">
            <p>This is our current setup of gear that we use for all of our Vlogs and photographs! We receive questions all of the time about what technology and equipment we use to create our content, so we curated this list to make it easier for everyone who needs the information. As we update our gear, we will be sure to update this list!</p>
            <h2 className="section-headline">2020 Setup</h2>
            <iframe className={styles.gear} src="https://kit.co/embed?url=https%3A%2F%2Fkit.co%2Fdoinglifewithyou%2F2020-vlogging-gear">
            </iframe>
            {/* border: 0px; margin: 0 auto; width: 100%; height: 100vw; max-width: 700px; max-height: 700px; */}
          </div>
          <SignUpForm />
        </div>
      </Layout>
    )
  }
}

export default GearIndex
