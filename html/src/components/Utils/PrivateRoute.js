import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import withDrupalOauthConsumer from '../drupal-oauth/withDrupalOauthConsumer';

const PrivateRoute = ({ component: Component, location, userAuthenticated, ...rest }) => {
  useEffect(() => {
    setTimeout(checkLoginStatus(),1000)
  }, [])

  const checkLoginStatus = async() => {
    if (!userAuthenticated) {
      await navigate("/user/login");
      return null
    }
  }

  return <Component {...rest} />
}
PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired
}

export default withDrupalOauthConsumer(PrivateRoute);
