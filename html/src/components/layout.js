/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import "../../enviroment/"
import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./global/header"
import Footer from "./global/footer"
import "./layout.css"
import drupalOauth from '../components/drupal-oauth/drupalOauth';
import withDrupalOauthProvider from '../components/drupal-oauth/withDrupalOauthProvider';

const {GATSBY_DRUPAL_ROOT, GATSBY_CLIENT_ID, GATSBY_CLIENT_SECRET, GATSBY_CLIENT_SCOPE} = window.configParametre;

const drupalOauthClient = new drupalOauth({
  drupal_root: GATSBY_DRUPAL_ROOT,
  client_id: GATSBY_CLIENT_ID,
  client_secret: GATSBY_CLIENT_SECRET,
  scope: GATSBY_CLIENT_SCOPE,
});

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <main>{children}</main>
        <Footer siteTitle={data.site.siteMetadata?.title || `Title`} />

    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withDrupalOauthProvider(drupalOauthClient, Layout);

