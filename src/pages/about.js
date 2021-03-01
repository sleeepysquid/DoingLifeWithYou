import React from 'react'
import Layout from '../components/layout'
import styles from './about.module.css'
import SignUpForm from '../components/signup-form'

class AboutIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div className={styles.hero}>
            <div className="gradient-layer"></div>
        </div>
        <div className="wrapper">
          <h2 className="section-headline">ALLOW US TO INTRODUCE OURSELVES…</h2>
          <p>We are Dyonna and Lawrence, a married couple taking life step by step. We thought we wanted the “American Dream” so we did everything society tells us to do. We went to college, got jobs, bought new cars, got married, and we even bought a house.</p>
          <p>But then something happened...</p>
          <p>We realized that life is extremely short, especially since you only get one try. So we decided we would start taking chances, stepping out of our comfort zones, and enjoying whatever rollercoaster God throws our way. We know that there are always a few scary drops along the way, but in the end the ride is always worth it.</p>
          <p><b>The biggest realization of all…</b></p>
          <p>Doing this thing called life is much better when we're together.</p>
          <p>And thus, <b>Doing Life With You</b> was born.</p>
          <p>We’ve decided to stop being spectators of our own lives, and we’re finally taking control. We’ve sold most of our possessions, saved and budgeted, and on March 30th we will officially embark on our journey! We’re so grateful that you’ve decided to join us for the ride!</p>
          <p>If you’re looking for a platform that was created to inspire people of ALL backgrounds to create, take control of their lives, and see the world (or you just want to watch us do it), you’ve come to the right place.</p>
          <p>And of course, we appreciate <b>YOU</b> for doing life with <b>US</b>.</p>
          <p>With Love and Appreciation,</p>
          <p>Dyonna and Lawrence</p>
        </div>
        <SignUpForm />
      </Layout>
    )
  }
}

export default AboutIndex;