import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'
import styles from './index.module.css'
import ourImg from '../images/lawrence_dyonna.jpg'
import nycImg from '../images/nyc_trip.jpg'
import favicon from "../images/favicon.ico";
import favicon16 from "../images/favicon16.png";
import favicon32 from "../images/favicon32.png";

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    // const heroImg = get(this, 'props.data.file.childImageSharp')
    const videos = get(this, 'props.data.allYoutubeVideo.edges')

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet 
            title={siteTitle} 
            link={[
              { rel: "icon", type: "image/png", sizes: "16x16", href: `${favicon16}` },
              { rel: "icon", type: "image/png", sizes: "32x32", href: `${favicon32}` },
              { rel: 'shortcut icon', type: 'image/x-icon', href: `${favicon}` }
            ]}
          />
          <div className={styles.hero}>
            <div className="gradient-layer"></div>
          </div>
          <div className="wrapper">
            <h2 className="section-headline">Allow us to introduce ourselves...</h2>
            <div className={styles.container}>
                <img src={ourImg} style={{ borderRadius: '10px', boxShadow: '0 4px 6px hsla(0, 0%, 0%, 0.2)'}}/>
              <div className={styles.aboutSection}>
                <p>We are Lawrence and Dyonna, an engaged couple taking life step by step. We thought we wanted the “American Dream” so we did everything society tells us to do. We went to college, got jobs, bought new cars, got engaged, and we even bought a house.</p>
                <p>But then something happened.</p>
                <Link to='/about' className={styles.readMore}>
                  Read More About Us
                </Link>
              </div>
            </div>
            <h2 className="section-headline">Latest Posts</h2>
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
            <h2 className="section-headline">Latest Videos</h2>
            <ul className="article-list">
              {videos.map(({ node }) => {
                return (
                  <li key={node.id}>
                    <a href={`https://youtu.be/${node.videoId}`} target='_blank'>
                      <div style={{ width: '100%', height: '200px', background: `url(${node.thumbnail.url}) no-repeat center center`, backgroundSize: 'cover', borderRadius: '10px', boxShadow: '0 4px 6px hsla(0, 0%, 0%, 0.2)'}}></div>
                      <h4>{node.title}</h4>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }, limit: 3) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
        }
      }
    }
    allYoutubeVideo(limit: 3) {
      totalCount
      edges {
        node {
          id
          videoId
          title
          thumbnail {
            url
          }
        }
      }
    }
  }
`

// heroImage {
//   fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
//    ...GatsbyContentfulFluid_tracedSVG
//   }
// }
// file(relativePath: { eq: "nyc_trip.jpeg" }) {
//   childImageSharp {
//     fluid(maxWidth: 350, maxHeight: 196) {
//       ...GatsbyImageSharpFluid
//     }
//   }
// }
