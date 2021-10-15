import React, {useEffect} from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
export const SecondarySlider = ({ node }) => {
    useEffect(() => {
      AOS.init({ duration:2000 });
    },[]);
    const settings = {
      customPaging: function (i) {
        return (
          <a href="/#" className="dot">
            {(i+1 < 10 ? '0'+(i+1) : '')}
          </a>
        );
      },
      dots: true,
      dotsClass: "slick-list",
      fade: false,
      infinite: true,
      // vertical: true,
      speed: 500,
      slidesToShow: 1,
      arrows: true,
      slidesToScroll: 1,
      className: "secundarySlider",
      lazyLoad: 'ondemand',
      beforeChange: (current, next) => {
        var d = document.querySelector("#secundary-slider ul.slick-list");
        //element.classList.remove("my-class");
        d.setAttribute('active',"active"+next);
      }
    }

    const animate =  e => {
      if (e.deltaY < 0) {
        this.slickNext();
      } else {
        this.slickPrev();
      }
    }
    return (
      <div id="secundary-slider" className="secundary-slider" onScroll={animate} >

        <div className="title-component" id="secundary-slider" > <h2 className="font-line-black" dangerouslySetInnerHTML={{ __html: node.field_title}} /> </div>

    <Slider {...settings} >
      {node.data_slide.field_slide.map((slide, i) => {
        let imageOne = slide.image.imageOne !== null ? slide.image.imageOne : JSON.stringify({});
        let imageTwo = slide.image.imageTwo !== null ? slide.image.imageTwo : JSON.stringify({});
        let imageThree = slide.image.imageThree !== null ? slide.image.imageThree : JSON.stringify({});
        let imageFour = slide.image.imageFour !== null ? slide.image.imageFour : JSON.stringify({});
        return (
          < div className = {`container-slick position-${(i+1)%2 ? 'rigth': 'left'}`} key = {i} >
            <div className="text-lateral"> <h2 className="h2-lateral" dangerouslySetInnerHTML={{ __html: node.field_lateral_text}} /> </div>
            <div className="bodySlider">
              <div className="text-lateral-body">
                <h2 className="h2-text-lateral regist" dangerouslySetInnerHTML={{ __html: slide.field_title_lateral_line}} />
              </div>
              <div className="number-text">
                <h2 className="regist font-line-orange" data-aos="fade-up" data-aos-offset="0" dangerouslySetInnerHTML={{ __html: slide.field_title}} />
                <h2 className="title-slider regist" data-aos="fade-up" data-aos-offset="0" dangerouslySetInnerHTML={{ __html: slide.field_title_second_line}} />
              </div>
              <div className="pagraph-slider" data-aos="zoom-in"  data-aos-offset="0" dangerouslySetInnerHTML={{ __html: slide.field_description.processed}} />
              <div className="link button-six"><Link to={slide.field_link.uri.replace('internal:/','')}>{slide.field_link.title}</Link></div>
            </div>
            <div className={slide.field_position_images}>
              {Object.keys(imageOne).length !== 0 && imageOne.constructor === Object ?
              <Img fluid={slide.image.imageOne.data.image.localFile.childImageSharp.fluid} alt ={slide.image.imageOne.data.image.filename}  data-aos="zoom-in" className="image-one"  />
              : ''}
              {Object.keys(imageTwo).length !== 0 && imageTwo.constructor === Object ?
              <Img fluid={slide.image.imageTwo.data.image.localFile.childImageSharp.fluid} alt ={slide.image.imageTwo.data.image.filename} data-aos="zoom-in" className="image-two"  />
              : ''}
              {Object.keys(imageThree).length !== 0 && imageThree.constructor === Object ?
              <Img fluid={slide.image.imageThree.data.image.localFile.childImageSharp.fluid} alt ={slide.image.imageThree.data.image.filename} data-aos="zoom-in" className="image-three"  />
              : ''}
              {Object.keys(imageFour).length !== 0 && imageFour.constructor === Object ?
              <Img fluid={slide.image.imageFour.data.image.localFile.childImageSharp.fluid} alt ={slide.image.imageFour.data.image.filename} data-aos="zoom-in" className="image-four"  />
              : ''}
            </div>
          </div>
        );
      })}
    </Slider>
    </div>
    );
};


export const fragment = graphql`
    fragment ParagraphSecondarySlider on paragraph__secondary_slider {
        id
        field_title
        field_lateral_text
        data_slide: relationships {
          field_slide {
            field_title_lateral_line
            field_title
            field_title_second_line
            field_description {
              processed
            }
            field_link {
              title
              uri
            }
            field_position_images
            image: relationships{
              imageOne: field_image_one {
                data: relationships {
                  image: field_media_image_2 {
                    filename
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
              imageTwo: field_image_two {
                data: relationships {
                  image: field_media_image_3 {
                    filename
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
              imageThree: field_image_three {
                data: relationships {
                  image: field_media_image_4 {
                    filename
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
              imageFour: field_image_four {
                data: relationships {
                  image: field_media_image_5 {
                    filename
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
