
import React from "react"
import { useStaticQuery, graphql } from "gatsby";
import RedemptionForm from "../drupal-oauth/RedemptionForm";
  const Redemption = (props) => {
    const data = useStaticQuery(graphql `
      query {
        products: allNodeProduct {
          nodes {
            title
            field_unique
            drupal_internal__nid
          }
        }
      }
    `);
    return (<RedemptionForm data={data} redem={props.redem}/> );
}

export default Redemption;
