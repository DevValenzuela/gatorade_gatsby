import React from 'react';

import { Button } from "react-bootstrap"

import withDrupalOauthConsumer from '../../drupal-oauth/withDrupalOauthConsumer';
import { navigate } from 'gatsby';
const LogoutLink = (props) => {
  if (props.drupalOauthClient) {
    return(
      <div className="link-log-out">
        <Button
        variant="outlined"
        onClick={async () => {
          await props.drupalOauthClient.handleLogout();
          props.updateAuthenticatedUserState(false);
          navigate('/co/qr')
        }}
      >
       Cerrar <br/> sesión</Button>
      </div>
    );
  }
  return('');
};

export default withDrupalOauthConsumer(LogoutLink);
