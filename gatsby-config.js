require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const path = require(`path`)

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST
}

const { spaceId, accessToken } = contentfulConfig
const channelId = process.env.CHANNEL_ID
const apiKey = process.env.GOOGLE_API_KEY

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    title: 'Doing Life With You',
    siteUrl: `https://doinglifewithyou.com`,
  },
  pathPrefix: '/gatsby-contentful-starter',
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    `gatsby-remark-responsive-iframe`,
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-source-youtube-v2`,
      options: {
        channelId,
        apiKey,
        maxVideos: 20
      },
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `9485763934`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-158094237-1",
      },
    },
  ],
}
