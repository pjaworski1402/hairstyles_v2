import { useRouter } from "next/router";
import { fetchAPI } from "../../lib/api";
import Slider from "../../components/Slick/Slider";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  MobileSlider,
  DesktopSlider,
  DesktopContentOffer,
} from "../../styles/pages/Product.styled";
import ContentOffer, {
  tabs,
} from "../../components/Layout/ContentOffer/ContentOffer";
import Layout from "../../components/Layout/Layout";
import Image from "next/image";
import shareIco from "../../static/icons/share.svg";
import addToCartIco from "../../static/icons/add-to-cart.svg";
import OfferAttributes from "../../components/OfferAttributes/OfferAttributes";
import { useState } from "react";
import { addToCart, removeFromCart } from "../../redux/cart.slice";
import { useEffect } from "react";
import { message } from 'antd';
import Seo from "../../components/SEO/SEO"

const Product = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const [currentTab, setCurrentTab] = useState(tabs.description);
  const [isInCart, setIsInCart] = useState();
  const router = useRouter();
  const { slug } = router.query;
  product = product.attributes;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    return 1;
  };
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product));
  };

  useEffect(() => {
    setIsInCart(cart.includes(slug));
  });

  const handleClickShare = () => {
    const linkToCopy = window?.location?.href;
    if (linkToCopy) {
      const textarea = document.createElement('textarea');
      textarea.value = linkToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      message.success('Link has been copied to the clipboard!', 5);
    }
  }

  return (
    <Layout>
      <Seo customTitle={product.title} />
      <Container className="container">
        <MobileSlider onTouchStart={() => window.scrollTo(0, 0)}>
          <Slider slides={product.gallery.data} height={320} zoom />
        </MobileSlider>
        {/* DESKTOP */}
        <DesktopContentOffer className="container">
          <div className="headerWrapper">
            <button className="shareButton" onClick={handleClickShare}>
              <Image alt="shareIco" src={shareIco} width={20} height={20} />
              Share
            </button>
          </div>
          <DesktopSlider>
            <Slider slides={product.gallery.data} height={470} zoom />
          </DesktopSlider>
          <div className="productInfo">
            <div className="title">{product.title}</div>
            <div className="priceWrapper">
              <div className="priceTitle">Price:</div>
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
                <div className="removeFromCartButton">Remove from Cart</div>
              </button>
            ) : (
              <div className="bottomWrapper">
                <button className="addToCartButton" onClick={handleAddToCart}>
                  <Image alt="cart" src={addToCartIco} width={20} height={20} />
                  Add to Cart {`($${product.price})`}
                </button>
              </div>
            )}
          </div>
        </DesktopContentOffer>
        <div className="offerInfo">
          <ContentOffer
            handleRemoveFromCart={handleRemoveFromCart}
            isInCart={isInCart}
            addToCart={addToCart}
            product={product}
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
          />
        </div>
      </Container>
    </Layout>
  );
};

export async function getStaticPaths() {
  const limit = 100;
  let currentPage = 1;
  let allProducts = [];

  while (true) {
    const productsRes = await fetchAPI("/products", {
      fields: ["slug"],
      pagination: {
        start: (currentPage - 1) * limit,
        limit,
      },
    });

    if (productsRes.data.length === 0) {
      break;
    }

    allProducts = allProducts.concat(productsRes.data);

    currentPage++;
  }

  return {
    paths: allProducts.map((product) => ({
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
        populate: {
          category: {
            populate: "*",
          },
        },
      },
      gender: {
        populate: "*",
      },
      character: {
        populate: "*",
      },
    },
  });

  return {
    props: { product: productsRes.data[0] },
    revalidate: 1,
  };
}

export default Product;
