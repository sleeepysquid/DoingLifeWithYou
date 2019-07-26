import React from 'react'
import Layout from '../components/layout'

class AboutIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div className="wrapper">
          <h2 className="section-headline">ALLOW US TO INTRODUCE OURSELVES…</h2>
          <p>We are Dyonna and Lawrence, an engaged couple taking life step by step. We thought we wanted the “American Dream” so we did everything society tells us to do. We went to college, got jobs, bought new cars, got engaged, and we even bought a house.</p>
          <p>But then something happened...</p>
          <p>We realized that life is extremely short, especially since you only get one try. So we decided we would start taking chances, stepping out of our comfort zones, and enjoying whatever rollercoaster God throws our way. We know that there are always a few scary drops along the way, but in the end the ride is always worth it.</p>
          <p><b>The biggest realization of all…</b></p>
          <p>Doing this thing called life is much better when we're with each other.</p>
          <p>And thus, <b>Doing Life With You</b> was born.</p>
          <p>We are currently working towards our goal to travel full-time for a minimum of a year. And even though that sounds crazy to most people, we are stepping out on faith and following our hearts desires. Because again, <b>YOU ONLY GET ONE CHANCE TO LIVE YOUR LIFE</b>. We aren’t where we want to be, but by December 2020, we are out of here!</p>
          <p>So if you are looking for a place dedicated to inspiring young black couples to create, step outside of their comfort zone, and see the world (or you just want to watch us do it), you’ve come to the right place. As often times we’ve noticed that even in this era, people who look like us are left out or looked over.</p>
          <p>And of course, we appreciate <b>YOU</b> for doing life with <b>US</b>.</p>
          <p>With Love and Appreciation,</p>
          <p>Dyonna and Lawrence</p>
        </div>
      </Layout>
    )
  }
}

export default AboutIndex;