import React, { Component, createRef } from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'
import styles from './index.module.css'
import ourImg from '../images/washington_dc.jpg'
import nycImg from '../images/nyc_trip.jpg'
import favicon from '../images/favicon.ico'
import favicon16 from '../images/favicon16.png'
import favicon32 from '../images/favicon32.png'
import SignUpForm from '../components/signup-form'

class RootIndex extends Component {
  constructor(props) {
    super(props)
    this.scrollRef = createRef()
    this.openForm = this.openForm.bind(this)
  }

  openForm() {
    this.typeformEmbed.typeform.open()
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const heroImg = get(this, 'props.data.file.childImageSharp.fluid')
    const videos = get(this, 'props.data.allYoutubeVideo.edges')
    // const instaPosts = get(this, 'props.data.allInstaNode.edges')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet
            title={siteTitle}
            link={[
              {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: `${favicon16}`,
              },
              {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: `${favicon32}`,
              },
              {
                rel: 'shortcut icon',
                type: 'image/x-icon',
                href: `${favicon}`,
              },
            ]}
          />
          <div className={styles.hero}>
            {/* <Img fluid={heroImg} /> */}
            <div className="gradient-layer"></div>
          </div>
          <div className="wrapper">
            <h2 className="section-headline">
              Allow us to introduce ourselves...
            </h2>
            <div className={styles.container}>
              <img
                src={ourImg}
                style={{
                  borderRadius: '10px',
                  boxShadow: '0 4px 6px hsla(0, 0%, 0%, 0.2)',
                }}
              />
              <div className={styles.aboutSection}>
                <p>
                  We are Dyonna and Lawrence, a married couple taking life step
                  by step. We thought we wanted the “American Dream” so we did
                  everything society tells us to do. We went to college, got
                  jobs, bought new cars, got married, and we even bought a
                  house.
                </p>
                <p>But then something happened.</p>
                <Link to="/about" className={styles.readMore}>
                  Read More About Us
                </Link>
              </div>
            </div>
            <div style={{ margin: '15px 0' }}>
              <SignUpForm />
            </div>
            <h2 className="section-headline">Recent Blog Posts</h2>
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
            <h2 className="section-headline">Watch Us On YouTube</h2>
            <ul className="article-list">
              {videos.map(({ node }) => {
                return (
                  <li key={node.id}>
                    <a
                      href={`https://youtu.be/${node.videoId}`}
                      target="_blank"
                      rel="noopener"
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '200px',
                          background: `url(${node.thumbnail.url}) no-repeat center center`,
                          backgroundSize: 'cover',
                          borderRadius: '10px',
                          boxShadow: '0 4px 6px hsla(0, 0%, 0%, 0.2)',
                        }}
                      ></div>
                    </a>
                  </li>
                )
              })}
            </ul>
            {/* <h2 className="section-headline">Follow Us On Instagram</h2>
            <div className={styles.scrollingWrapper}>
              {instaPosts.map(({ node }) => {
                return (
                  <div
                    key={node.id}
                    style={{ margin: '0 5px', flex: '0 0 auto' }}
                  >
                    <a
                      href={`https://instagr.am/p/${node.id}/`}
                      target="_blank"
                      rel="noopener"
                    >
                      <img src={node.original} style={{ width: '300px' }} />
                    </a>
                  </div>
                )
              })}
            </div> */}
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
    allContentfulBlogPost(
      sort: { fields: [publishDate], order: DESC }
      limit: 6
    ) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
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
    file(relativePath: { eq: "nyc_trip.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 700) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

// allInstaNode(filter: { mediaType: { eq: "GraphImage" } }, limit: 10) {
//   edges {
//     node {
//       id
//       original
//     }
//   }
// }