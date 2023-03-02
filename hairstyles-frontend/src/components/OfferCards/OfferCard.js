import Image from "next/image";
import { ContainerVertical } from "./VerticalOffer.styled";
import { ContainerHorizontal } from "./HorizontalOffer.styled";
import { getStrapiMedia } from "../../lib/media";
import Link from "next/link";
import addIco from "../../static/icons/add.svg";
import shoppingCartIco from "../../static/icons/shopping-cart-white.svg";
import { addToCart, removeFromCart } from "../../redux/cart.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import done from "../../static/icons/done.svg";

const OfferCard = ({ product, display = "vertical" }) => {
  const cart = useSelector((state) => state.cart);
  const [isInCart, setIsInCart] = useState();
  const { attributes: offer } = product;
  const image = getStrapiMedia(offer.gallery);
  const imageData = offer.gallery.data[0].attributes;
  const dispatch = useDispatch();
  useEffect(() => {
    setIsInCart(cart.includes(offer.slug));
  });
  const addToCartButton = (e) => {
    e.preventDefault();
    dispatch(addToCart(offer));
    return 1;
  };
  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    dispatch(removeFromCart(offer));
  };
  if (display === "horizontal") {
    return (
      <ContainerHorizontal className="productHorizontal">
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
                {
                  offer?.type?.data?.attributes?.category?.data?.attributes
                    ?.name
                }{" "}
                | {offer?.character?.data?.attributes?.name}{" "}
                {offer?.gender?.data?.attributes?.name} |{" "}
                {offer?.color_variants} textures
              </div>
              <div className="description">{offer.description}</div>
              <div className="priceWrapper">
                <div className="price">${offer.price}</div>
                {offer.old_price > offer.price && (
                  <div className="oldPrice">${offer.old_price}</div>
                )}
                {isInCart ? (
                  <>
                    <button
                      className="addedToCartButton"
                      onClick={(e) => handleRemoveFromCart(e)}
                    >
                      <Image src={done} width={16} height={16} />
                    </button>
                    <button
                      className="addedToCartButtonDesktop"
                      onClick={(e) => handleRemoveFromCart(e)}
                    >
                      <Image src={done} width={16} height={16} />
                      Added to cart
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="addToCartButton"
                      onClick={(e) => addToCartButton(e)}
                    >
                      <Image src={addIco} width={16} height={16} />
                    </button>
                    <button
                      className="addToCartButtonDesktop"
                      onClick={(e) => addToCartButton(e)}
                    >
                      <Image src={shoppingCartIco} width={16} height={16} />
                      Add to cart
                    </button>
                  </>
                )}
              </div>
            </div>
          </a>
        </Link>
      </ContainerHorizontal>
    );
  } else {
    return (
      <ContainerVertical className="productVertical">
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
                {
                  offer?.type?.data?.attributes?.category?.data?.attributes
                    ?.name
                }{" "}
                | {offer?.character?.data?.attributes?.name}{" "}
                {offer?.gender?.data?.attributes?.name} |{" "}
                {offer?.color_variants} textures
              </div>
              <div className="description">{offer.description}</div>
              <div className="priceWrapper">
                <div className="price">${offer.price}</div>
                {offer.old_price > offer.price && (
                  <div className="oldPrice">${offer.old_price}</div>
                )}
                {isInCart ? (
                  <button
                    className="removeFromCartButton"
                    onClick={(e) => handleRemoveFromCart(e)}
                  >
                    <Image src={done} width={16} height={16} />
                  </button>
                ) : (
                  <button
                    className="addToCartButton"
                    onClick={(e) => addToCartButton(e)}
                  >
                    <Image src={addIco} width={16} height={16} />
                  </button>
                )}
              </div>
            </div>
          </a>
        </Link>
      </ContainerVertical>
    );
  }
};

export default OfferCard;
