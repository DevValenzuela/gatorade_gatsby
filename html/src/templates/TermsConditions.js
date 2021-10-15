import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Img from "gatsby-image";

const TermsPage = ({data}) => {
  let imageOne = data.page.background.imageBackground !== null ? data.page.background.imageBackground : JSON.stringify({});
  return (
    <Layout>
      <SEO title={data.page.title} className="terms-conditions" />
      <div className="container-terms">
        {Object.keys(imageOne).length !== 0 && imageOne.constructor === Object ?
        <Img fluid={data.page.background.imageBackground.data.image.localFile.childImageSharp.fluid} className="bg-terms" alt="Background privacy" title="background privacy" />
        : ''}
        <h1 className="text-terms" dangerouslySetInnerHTML={{
              __html: data.page.title,
            }}></h1>
          <div
            className="data-article terms"
            dangerouslySetInnerHTML={{
              __html: data.page.body.value,
            }}

          />
      </div>
    </Layout>
  );
};

export default TermsPage

export const termsQuery = graphql`
  query($slug: String!) {
      page: nodeArticle(fields: { slug: { eq: $slug } }) {
          id
          title
          body {
            value
          }
          background: relationships {
            imageBackground: field_background {
              data: relationships {
                image: field_media_image {
                  localFile {
                    childImageSharp {
                      fluid {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
      }
  }
`;
