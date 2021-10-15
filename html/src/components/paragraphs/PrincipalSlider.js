import React, {useEffect} from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";

export const PrincipalSlider = ({ node }) => {
    useEffect(() => {
      AOS.init({ duration:2000 });
    },[]);
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      arrows: true,
      slidesToScroll: 1,
      className: "principalSlider"
    }
    return (
      <Slider {...settings}>
        {node.data_slide.field_slide.map((slide, i ) => (
          <div className="container-principalSlider container-fluid" key={i}>
            <div className="row">
              <div className="box-text col-12 col-xl-6">
                <div className="text-prinicpal-slider">
                  <h2 data-aos="fade-up" data-aos-delay="800" data-aos-offset="0" dangerouslySetInnerHTML={{ __html: slide.field_title}} />
                  <div className="description"  data-aos="zoom-in" data-aos-offset="5"  dangerouslySetInnerHTML={{ __html: slide.field_description.processed}} />
                  <div className="box-button" data-aos="fade-right" data-aos-duration="3000" data-aos-offset="0" data-aos-once="true" ><div className="button-second"><Link to={slide.field_link.uri.replace('internal:/','')}>{slide.field_link.title}</Link></div></div>
                </div>
                <div className="button-pass"><Link to="/#secundary-slider"></Link></div>
              </div>
              <div className="image"><Img className="bg-prinicpal-slider" data-aos="fade-up" data-aos-delay="800" data-aos-offset="1" fluid={slide.image.field_image.data.field_media_image.localFile.childImageSharp.fluid} /></div>
            </div>
          </div>
        ))}
      </Slider>
    );
};

export const fragment = graphql`
    fragment ParagraphPrincipalSlider on paragraph__principal_slider {
        id
        data_slide: relationships {
          field_slide {
            field_title
            field_description {
              processed
            }
            field_link {
              title
              uri
            }
            image: relationships{
              field_image {
                data: relationships {
                  field_media_image {
                    localFile {
                      childImageSharp {
                        fluid{
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
    }
`;
