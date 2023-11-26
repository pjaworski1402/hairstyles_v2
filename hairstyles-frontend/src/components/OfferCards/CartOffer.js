import Image from "next/image";
import { getStrapiMedia } from "../../lib/media";
import { Container } from "./CartOffer.styled";
import trash from "../../static/icons/trash.svg";

const CartOffer = ({ offer, removeProduct, discount }) => {
  const isDiscount = !!discount
  const image = getStrapiMedia(offer.gallery);
  const imageData = offer.gallery.data[0].attributes;
  return (
    <Container isDiscount={isDiscount}>
      <div className="thumbnail">
        <Image
          src={image[0]}
          loader={() => image[0]}
          width={imageData.width}
          height={imageData.height}
          unoptimized
        />
      </div>
      <div className="info">
        <div className="title">{offer.title}</div>
        <div className="tags">
          {offer?.type?.data?.attributes?.category?.data?.attributes?.name} |{" "}
          {offer?.character?.data?.attributes?.name}{" "}
          {offer?.gender?.data?.attributes?.name} | {offer?.color_variants}{" "}
          {offer?.color_variants > 1 ? "textures" : "texture"}
        </div>
        <div className="price">
          {isDiscount ? (<>
            <span className="oldPrice">${offer.price.toFixed(2)}</span>{" "}
            <span className="newPrice">${discount.price.toFixed(2)}</span>
          </>) : (
            <>${offer.price.toFixed(2)}</>
          )}
        </div>
      </div>
      <div className="endWrapper">
        <div className="priceDesktop">
          {isDiscount ? (<>
            <span className="oldPrice">${offer.price.toFixed(2)}</span>{" "}
            <span className="newPrice">${discount.price.toFixed(2)}</span>
          </>) : (
            <>${offer.price.toFixed(2)}</>
          )}

        </div>
        <button onClick={() => removeProduct(offer)}>
          <Image src={trash} width={24} height={24} />
        </button>
        <div className="quantity">x1</div>
      </div>
    </Container>
  );
};

export default CartOffer;
