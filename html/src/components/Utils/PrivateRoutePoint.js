import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import withDrupalOauthConsumer from '../drupal-oauth/withDrupalOauthConsumer';

// const PrivateRoutePoint = ({ component: Component, location, userAuthenticated, ...rest }) => {
//   if (!userAuthenticated) {
//     // If we’re not logged in, redirect to the home page.
//     navigate(`/`)
//     return null
//   }

//   return <Component {...rest} />
// }
const PrivateRoutePoint = ({ component: Component, location, userAuthenticated, ...rest }) => {
  useEffect(() => {
    checkLoginStatus()
  }, [])

  const checkLoginStatus = () => {
    if (!userAuthenticated) {
      navigate("/user/login");
      return null
    }
  }

  return <Component {...rest} />
}
PrivateRoutePoint.propTypes = {
  component: PropTypes.any.isRequired
}

export default withDrupalOauthConsumer(PrivateRoutePoint);
