import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import heroStyles from '../components/hero.module.css'
import blogStyles from './blog-post.module.css'


import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Bold = ({ children }) => <span className="bold"> {children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>
const EmbeddedImage = ({ children }) => <img className={blogStyles.embeddedImg} src={`${children.url}?fm=jpg&q=25`} />

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: ({ data: { target: { fields }}}) => <EmbeddedImage>{fields.file["en-US"]}</EmbeddedImage>,
    [BLOCKS.EMBEDDED_ENTRY]: ({ data: { target: { fields, sys: { contentType: { sys: { id }}} }}}) => {
      if (id === 'video') {
        return <iframe
          title={fields.title["en-US"]}
          width="560"
          height="315"
          src={fields.url["en-US"]}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen>
        </iframe>
      }
      if (id === 'map') {
        return <iframe
          src={fields.url["en-US"]}
          width="640"
          height="480">
        </iframe>
      }

      return <div></div>
    }
  },
}


class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <div className={heroStyles.hero}>
            <Img className={heroStyles.heroImage} alt={post.title} fluid={post.heroImage.fluid} />
            <div className="gradient-layer"></div>
          </div>
          <div className="wrapper">
            <h1 className="section-headline">{post.title}</h1>
            <p
              style={{
                display: 'block',
              }}
            >
              {post.publishDate}
            </p>

            { post.content && documentToReactComponents(post.content.json, options) }
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      content {
        json
      }
    }
  }
`
