import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

export const Benefits = ({ node }) => {
  return (
    <div className="benefits-component">
      <div className="title-benefits" id="#secondary-benefits">
        <h2 dangerouslySetInnerHTML={{ __html: node.field_title}} />
      </div>
      <div className="body-benefits">
        <h3 className="side-title" dangerouslySetInnerHTML={{ __html: node.field_lateral_text}} />
        <div className="image-benefits">
          <div className="image-bg-benefits"><Img fluid={node.background.field_image.data.field_media_image.localFile.childImageSharp.fluid} /></div>
        </div>
        <div className="text-box">
          {node.data_step.field_steps.map((step, i) => (
            <div className="text-section" key={i}>
              <h2 dangerouslySetInnerHTML={{ __html: step.field_numeration}} />
              <h2 dangerouslySetInnerHTML={{ __html: step.field_title}} />
              <p dangerouslySetInnerHTML={{ __html: step.field_short_description}} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const fragment = graphql`
    fragment ParagraphBenefits on paragraph__benefits {
      id
      field_title
      field_lateral_text
      background: relationships {
        field_image {
          data: relationships {
            field_media_image {
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
      data_step: relationships {
        field_steps{
          field_numeration
          field_title
          field_short_description
        }
      }
    }
`;
