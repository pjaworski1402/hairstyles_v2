import { Container } from "./ContentOffer.styled";
import addToCartIco from "../../../static/icons/add-to-cart.svg";
import Image from "next/image";
import OfferAttributes from "../../OfferAttributes/OfferAttributes";
import { addToCart, removeFromCart } from "../../../redux/cart.slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { fetchAPI } from "../../../lib/api";
import OfferCard from "../../OfferCards/OfferCard";

export const tabs = {
  description: "DESCRIPTION",
  review: "REVIEW",
  similar: "SIMILAR",
};

const MobileContentOffer = ({
  product,
  setCurrentTab,
  currentTab,
  isInCart,
}) => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product));
  };
  console.log(products)
  useEffect(() => {
    const fetchProducts = () => {
      fetchAPI(
        "/products",
        {
          filters: {
            type: {
              id: { $eq: product.type.data.id },
            },
          },
          populate: {
            type: {
              populate: "*",
            },
            gender: {
              populate: "*",
            },
            gallery: {
              populate: "*",
            },
            tags: {
              populate: "*",
            },
            character: {
              populate: "*",
            },
          },
          pagination: {
            limit: 9,
          },
          sort: "createdAt:DESC",
        },
        {},
        true
      ).then((res) => {
        console.log(res)
        setProducts(res);
      }).catch(err => console.log(err));
    };
    fetchProducts()
  }, [product.type.data.id])
  return (
    <Container className="container">
      <div className="productHeader">
        <div className="topHeader">
          <div className="title">{product.title}</div>
        </div>
        <div className="bottomHeader">
          <div className="priceWrapper">
            <div className="price">{product.price}$</div>
            {product.old_price > product.price && (
              <div className="oldPrice">{product.old_price}$</div>
            )}
          </div>
          <div className="tags">
            {product.tags.data.map((tag) => (
              <div key={tag.id} className="tag">
                #{tag.attributes.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <nav className="tabs">
        <button
          className={`tab${currentTab === tabs.description ? " active" : ""}`}
          onClick={() => setCurrentTab(tabs.description)}
        >
          Description
        </button>
        <button
          className={`tab${currentTab === tabs.review ? " active" : ""}`}
          onClick={() => setCurrentTab(tabs.review)}
        >
          Review
        </button>
        <button
          className={`tab${currentTab === tabs.similar ? " active" : ""}`}
          onClick={() => setCurrentTab(tabs.similar)}
        >
          Similar products
        </button>
      </nav>
      <main className="content">
        {tabs.description === currentTab && (
          <>
            <div className="description">
              {product.description.replace(/\n/gi, "\n")}
            </div>
            <OfferAttributes product={product} />
          </>
        )}
        {tabs.review === currentTab && (
          <div className="review">Coming soon...</div>
        )}
        {tabs.similar === currentTab && (
          <div className="similar">
            {products?.data?.map((productApi, index) => {
              console.log(productApi, product)
              if (index != 9 && productApi.attributes.slug !== product.slug) {
                return (
                  <OfferCard
                    key={`hairstyles_${productApi.id}`}
                    product={productApi}
                  />
                );
              }
            })}
          </div>
        )}
      </main>
      <div className="bottomWrapper">
        {isInCart ? (
          <button className="bottomWrapper" onClick={handleRemoveFromCart}>
            <div className="removeFromCartButton">Remove from Cart</div>
          </button>
        ) : (
          <button className="addToCartButton" onClick={handleAddToCart}>
            <Image alt="cart" src={addToCartIco} width={20} height={20} />
            Add to Cart {`($${product.price})`}
          </button>
        )}
      </div>
    </Container>
  );
};

export default MobileContentOffer;
