import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Img from "gatsby-image"
import RedirectLoggedPacks from "../RedirectLoggedPacks"
export const getPack = node => {
  let imageOne = node.background.field_image !== null ? node.background.field_image : JSON.stringify({});
  return (
    <div className="container-buy" id="container-buy-id" key={node.drupal_internal__nid}>
      <div className="text-buy-lateral">
        <h2>{node.title}</h2>
      </div>
      <div className="body-buy">
        <div className="image-buy">
          <StaticImage
            className="image-bg-buy image-buy-one"
            src="../../images/bg-container-buy.png"
            objectFit="cover"
            quality={99}
            formats={["AUTO", "WEBP", "AVIF"]}
            alt="Logo gatorade"
          />
          <StaticImage
            className="image-bg-buy image-buy-two"
            src="../../images/bg-buy-two.jpg"
            objectFit="cover"
            quality={99}
            formats={["AUTO", "WEBP", "AVIF"]}
            alt="Logo gatorade"
          />
        </div>
        <div className="title-image-buy">
          <div className={[node.field_unique]}>
            <div className="title-buy">
              <h2 className="title-lateral">{node.field_lateral_title}</h2>
              <h2 className="title-one font-line-orange">{node.field_title}</h2>
              <h2 className="font-gatorade-light  shirt">{node.field_lateral_title}{" "} <strong className="font-line-orange">camiseta</strong></h2>
              <h2 className="font-gatorade-light bottle">
                {node.field_lateral_title}{" "}
                <strong>{node.field_quantity_bottles} Botellas</strong>
              </h2>
              <p className="price-pack">Precio: ${node.field_price}</p>
            </div>
            <div
              className="paragraph-buy"
              dangerouslySetInnerHTML={{
                __html: node.field_description.processed,
              }}
            />
            <div className="image-buy-two">
              <div className="image-bg-benefits">
              {Object.keys(imageOne).length !== 0 && imageOne.constructor === Object ?
              <Img fluid={node.background.field_image.localFile.childImageSharp.fluid} alt ={node.background.field_image.filename}  data-aos="zoom-in" className="image-one"  />
              : ''}
              </div>
            </div>
            <h2 className="font-gatorade-light bottle-shirt">{node.field_quantity_bottles} botellas</h2>
          </div>
          {/* <div className={[node.field_unique]}></div> */}
        </div>
        <RedirectLoggedPacks
          title={node.field_link.title}
          pid={node.drupal_internal__nid}
          gift={node.field_gift_pack}
          redirect={node.field_link.uri.replace('internal:','')}
        />
      </div>
    </div>
  )
}
