import React from 'react';
import { Link } from 'gatsby';
import withDrupalOauthConsumer from './drupal-oauth/withDrupalOauthConsumer';

function RedirectLoggedPacks(props) {
  return (
    <>
      {props.userAuthenticated ?<>
        <div className="button-six">
        {props.redirect !== '/' &&  props.redirect !== '#' ?
        <a href={props.redirect} target="_blank" rel="noopener noreferrer" >{props.title}</a>
        :
        <Link to={`/user/buy/${props.pid}`}>{props.title}</Link>
        }
        </div>
        </> :
        <div className="button-six">
          {props.redirect !== '/' &&  props.redirect !== '#' ?
          <a href={props.redirect} target="_blank" rel="noopener noreferrer" >{props.title}</a>
          :
          <Link to={"/user/login"}>{props.title}</Link>
          }
        </div>}
      </>
  );
}

export default withDrupalOauthConsumer(RedirectLoggedPacks);
