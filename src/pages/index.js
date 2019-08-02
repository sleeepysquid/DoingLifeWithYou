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
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

am4core.useTheme(am4themes_animated);

class RootIndex extends React.Component {
  constructor(props) {
    super(props);
    this.openForm = this.openForm.bind(this);
  }

  openForm() {
    this.typeformEmbed.typeform.open();
  }

  componentDidMount() {
    let chart = am4core.create("chartdiv", am4maps.MapChart);

    chart.geodata = am4geodata_worldLow;
    chart.projection = new am4maps.projections.Miller();
    chart.homeZoomLevel = 2.5;
    chart.homeGeoPoint = {
        latitude: 38,
        longitude: -60
    };

    // Create map polygon series
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.mapPolygons.template.fill = chart.colors.getIndex(0).lighten(0.5);
    polygonSeries.mapPolygons.template.nonScalingStroke = true;
    polygonSeries.exclude = ["AQ"];

    // Add line bullets
    let cities = chart.series.push(new am4maps.MapImageSeries());
    cities.mapImages.template.nonScaling = true;

    let city = cities.mapImages.template.createChild(am4core.Circle);
    city.radius = 6;
    city.fill = chart.colors.getIndex(0).brighten(-0.2);
    city.strokeWidth = 2;
    city.stroke = am4core.color("#fff");

    function addCity(coords, title) {
        let city = cities.mapImages.create();
        city.latitude = coords.latitude;
        city.longitude = coords.longitude;
        city.tooltipText = title;
        return city;
    }

    let paris = addCity({ "latitude": 48.8567, "longitude": 2.3510 }, "Paris");
    let toronto = addCity({ "latitude": 43.8163, "longitude": -79.4287 }, "Toronto");
    let la = addCity({ "latitude": 34.3, "longitude": -118.15 }, "Los Angeles");
    let havana = addCity({ "latitude": 23, "longitude": -82 }, "Havana");

    // Add lines
    let lineSeries = chart.series.push(new am4maps.MapArcSeries());
    lineSeries.mapLines.template.line.strokeWidth = 2;
    lineSeries.mapLines.template.line.strokeOpacity = 0.5;
    lineSeries.mapLines.template.line.stroke = city.fill;
    lineSeries.mapLines.template.line.nonScalingStroke = true;
    lineSeries.mapLines.template.line.strokeDasharray = "1,1";
    lineSeries.zIndex = 10;

    let shadowLineSeries = chart.series.push(new am4maps.MapLineSeries());
    shadowLineSeries.mapLines.template.line.strokeOpacity = 0;
    shadowLineSeries.mapLines.template.line.nonScalingStroke = true;
    shadowLineSeries.mapLines.template.shortestDistance = false;
    shadowLineSeries.zIndex = 5;

    function addLine(from, to) {
        let line = lineSeries.mapLines.create();
        line.imagesToConnect = [from, to];
        line.line.controlPointDistance = -0.3;

        let shadowLine = shadowLineSeries.mapLines.create();
        shadowLine.imagesToConnect = [from, to];

        return line;
    }

    addLine(paris, toronto);
    addLine(toronto, la);
    addLine(la, havana);

    // Add plane
    let plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
    plane.position = 0;
    plane.width = 48;
    plane.height = 48;

    plane.adapter.add("scale", function(scale, target) {
        return 0.5 * (1 - (Math.abs(0.5 - target.position)));
    })

    let planeImage = plane.createChild(am4core.Sprite);
    planeImage.scale = 0.08;
    planeImage.horizontalCenter = "middle";
    planeImage.verticalCenter = "middle";
    planeImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
    planeImage.fill = chart.colors.getIndex(2).brighten(-0.2);
    planeImage.strokeOpacity = 0;

    let shadowPlane = shadowLineSeries.mapLines.getIndex(0).lineObjects.create();
    shadowPlane.position = 0;
    shadowPlane.width = 48;
    shadowPlane.height = 48;

    let shadowPlaneImage = shadowPlane.createChild(am4core.Sprite);
    shadowPlaneImage.scale = 0.05;
    shadowPlaneImage.horizontalCenter = "middle";
    shadowPlaneImage.verticalCenter = "middle";
    shadowPlaneImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
    shadowPlaneImage.fill = am4core.color("#000");
    shadowPlaneImage.strokeOpacity = 0;

    shadowPlane.adapter.add("scale", function(scale, target) {
        target.opacity = (0.6 - (Math.abs(0.5 - target.position)));
        return 0.5 - 0.3 * (1 - (Math.abs(0.5 - target.position)));
    })

    // Plane animation
    let currentLine = 0;
    let direction = 1;
    function flyPlane() {

        // Get current line to attach plane to
        plane.mapLine = lineSeries.mapLines.getIndex(currentLine);
        plane.parent = lineSeries;
        shadowPlane.mapLine = shadowLineSeries.mapLines.getIndex(currentLine);
        shadowPlane.parent = shadowLineSeries;
        shadowPlaneImage.rotation = planeImage.rotation;

        // Set up animation
        let from, to;
        let numLines = lineSeries.mapLines.length;
        if (direction == 1) {
            from = 0
            to = 1;
            if (planeImage.rotation != 0) {
                planeImage.animate({ to: 0, property: "rotation" }, 1000).events.on("animationended", flyPlane);
                return;
            }
        }
        else {
            from = 1;
            to = 0;
            if (planeImage.rotation != 180) {
                planeImage.animate({ to: 180, property: "rotation" }, 1000).events.on("animationended", flyPlane);
                return;
            }
        }

        // Start the animation
        let animation = plane.animate({
            from: from,
            to: to,
            property: "position"
        }, 5000, am4core.ease.sinInOut);
        animation.events.on("animationended", flyPlane)
        /*animation.events.on("animationprogress", function(ev) {
          let progress = Math.abs(ev.progress - 0.5);
          //console.log(progress);
          //planeImage.scale += 0.2;
        });*/

        shadowPlane.animate({
            from: from,
            to: to,
            property: "position"
        }, 5000, am4core.ease.sinInOut);

        // Increment line, or reverse the direction
        currentLine += direction;
        if (currentLine < 0) {
            currentLine = 0;
            direction = 1;
        }
        else if ((currentLine + 1) > numLines) {
            currentLine = numLines - 1;
            direction = -1;
        }

    }

    // Go!
    flyPlane();

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const heroImg = get(this, 'props.data.file.childImageSharp.fluid') 
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
            {/* <Img fluid={heroImg} /> */}
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
            <h2 className="section-headline">Read Our Blog</h2>
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
            <h2 className="section-headline">Places We've Been</h2>
            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
            <h2 className="section-headline">Watch Us On YouTube</h2>
            <ul className="article-list">
              {videos.map(({ node }) => {
                return (
                  <li key={node.id}>
                    <a href={`https://youtu.be/${node.videoId}`} target='_blank' rel="noopener">
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
          heroImage {
            fluid {
              ...GatsbyContentfulFluid_tracedSVG
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

// heroImage {
//   fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
//    ...GatsbyContentfulFluid_tracedSVG
//   }
// }
