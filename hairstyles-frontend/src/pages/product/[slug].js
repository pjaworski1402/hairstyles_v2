import { useRouter } from "next/router";
import { fetchAPI } from "../../lib/api";
import Slider from "../../components/Slick/Slider";
import { useDispatch, useSelector } from 'react-redux';
import { Container, MobileSlider, DesktopSlider, DesktopContentOffer } from "../../styles/pages/Product.styled";
import ContentOffer, { tabs } from "../../components/Layout/ContentOffer/ContentOffer";
import Layout from "../../components/Layout/Layout"
import Image from "next/image";
import shareIco from "../../static/icons/share.svg"
import addToCartIco from "../../static/icons/add-to-cart.svg"
import OfferAttributes from "../../components/OfferAttributes/OfferAttributes";
import { useState } from "react";
import { addToCart, removeFromCart } from '../../redux/cart.slice';
import { useEffect } from "react";

const Product = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const [currentTab, setCurrentTab] = useState(tabs.description);
  const [isInCart, setIsInCart] = useState();
  const router = useRouter();
  const { slug } = router.query;
  product = product.attributes;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    console.log("test")
    console.log(product)
    dispatch(addToCart(product))
    return (1)
  }
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product))
  }

  useEffect(() => {
    setIsInCart(cart.includes(slug))
  });

  return (
    <Layout>
      <Container className="container">
        <MobileSlider onTouchStart={() => window.scrollTo(0, 0)}>
          <Slider slides={product.gallery.data} height={320} />
        </MobileSlider>
        {/* DESKTOP */}
        <DesktopContentOffer className="container">
          <div className="headerWrapper">
            <button className="shareButton">
              <Image src={shareIco} width={20} height={20} />
              Share
            </button>
          </div>
          <DesktopSlider>
            <Slider slides={product.gallery.data} height={470} />
          </DesktopSlider>
          <div className="productInfo">
            <div className="title">
              {product.title}
            </div>
            <div className="priceWrapper">
              <div className="priceTitle">Price</div>
              <div className="price">${product.price}</div>
              {product.old_price > product.price && (
                <div className="oldPrice">${product.old_price}</div>
              )}
            </div>
            <div className="tags">
              <div className="tagTitle">Tags</div>
              {product.tags.data.map((tag) => (
                <div key={tag.id} className="tag">
                  #{tag.attributes.name}
                </div>
              ))}
            </div>
            <OfferAttributes product={product} />
            {isInCart ? (
              <button className="bottomWrapper" onClick={handleRemoveFromCart}>
                <div className="removeFromCartButton">
                  Remove from Cart
                </div>
              </button>
            ) : (
              <div className="bottomWrapper">
                <button className="addToCartButton" onClick={handleAddToCart}>
                  <Image src={addToCartIco} width={20} height={20} />
                  Add to Cart {`($${product.price})`}
                </button>
              </div>
            )}
          </div>
        </DesktopContentOffer>
        <div className="offerInfo">
          <ContentOffer handleRemoveFromCart={handleRemoveFromCart} isInCart={isInCart} addToCart={addToCart} product={product} setCurrentTab={setCurrentTab} currentTab={currentTab} />
        </div>
      </Container>
    </Layout>
  );
};

export async function getStaticPaths() {
  const productsRes = await fetchAPI("/products", { fields: ["slug"] });
  return {
    paths: productsRes.data.map((product) => ({
      params: {
        slug: product.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const productsRes = await fetchAPI("/products", {
    filters: {
      slug: params.slug,
    },
    populate: {
      gallery: {
        populate: "*",
      },
      tags: {
        populate: "*",
      },
      type: {
        populate: "*"
      },
      category: {
        populate: "*",
      },
      gender: {
        populate: "*",
      },
      character: {
        populate: "*",
      }
    },
  });

  return {
    props: { product: productsRes.data[0] },
    revalidate: 1,
  };
}

export default Product;
