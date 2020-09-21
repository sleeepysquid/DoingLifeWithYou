import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styles from './article-preview.module.css'
import BackgroundImage from 'gatsby-background-image'

export default ({ article }) => (
  <div className={styles.preview}>
    <Link to={`/blog/${article.slug}`} style={{textDecoration: 'none'}}>
      <BackgroundImage
          Tag="section"
          style={{ display: 'flex', alignItems: 'flex-end', height: '300px', borderRadius: '10px', boxShadow: '0 4px 6px hsla(0, 0%, 0%, 0.2)'}}
          fluid={article.heroImage.fluid}
        >
          <h3 className={styles.previewTitle}>
            {article.title}
          </h3>
        </BackgroundImage>
    </Link>
  </div>
)
