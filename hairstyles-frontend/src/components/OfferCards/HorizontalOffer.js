import Image from "next/image";
import { Container } from "./HorizontalOffer.styled";
import { getStrapiMedia } from "../../lib/media";
import Link from "next/link";
import addIco from "../../static/icons/add.svg";
import shoppingCartIco from "../../static/icons/shopping-cart-white.svg";

const HorizontalOffer = ({ product }) => {
  const { attributes: offer } = product;
  const image = getStrapiMedia(offer.gallery);
  const imageData = offer.gallery.data[0].attributes;
  console.log(offer.slug);
  return (
    <Container>
      <Link href={`/product/${offer.slug}`}>
        <a>
          <div className="imageWrapper">
            <Image
              src={image[0]}
              loader={() => image[0]}
              width={imageData.width}
              height={imageData.height}
              unoptimized
            />
          </div>
          <div className="offerWrapper">
            <div className="offerTitle">{offer.title}</div>
            <div className="tags">
              {offer.tags.data.map((tag, index) => {
                return index < offer.tags.data.length - 1
                  ? `${tag.attributes.name} |`
                  : tag.attributes.name;
              })}
            </div>
            <div className="description">{offer.description}</div>
            <div className="priceWrapper">
              <div className="price">${offer.price}</div>
              {offer.old_price > offer.price && (
                <div className="oldPrice">${offer.old_price}</div>
              )}
              <button className="addToCartButton">
                <Image src={addIco} width={16} height={16} />
              </button>
              <button className="addToCartButtonDesktop">
                <Image src={shoppingCartIco} width={16} height={16} />
                Add to cart
              </button>
            </div>
          </div>
        </a>
      </Link>
    </Container>
  );
};

export default HorizontalOffer;
