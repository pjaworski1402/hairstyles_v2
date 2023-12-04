import { Container, BottomWrapper, InputVoucher, ButtonVoucher } from "../../styles/pages/Cart.styled";
import Layout from "../../components/Layout/Layout";
import { fetchAPI } from "../../lib/api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import CartOffer from "../../components/OfferCards/CartOffer";
import { API_URL } from "../../utilities/urls";
import { removeFromCart } from "../../redux/cart.slice";
import Image from "next/image";
import arrowRight from "../../static/icons/arrow-next.svg";
import stripeIco from "../../static/images/stripe.png";
import Seo from "../../components/SEO/SEO";
// import googlePayIco from "../../static/images/googlePay.png";
// import linkPayIco from "../../static/images/linkPay.png";

const stripePromise = loadStripe(
  `pk_test_51M48txJbvSFyUq8IKOyqyNuANXMw7O22W0jYLUvraG6MSNHqjrTfJ2wp89CFeSYpDFQwoFdt52o1LmRtdmvhvJd400NIHoixad`
);
// const stripePromise = loadStripe(
//   `pk_live_51ODXBuJY4hX5zC5ZczI7GpOB3BUHtKfR2S8XMpbCD0bRgt2PxDDO7tl7zLRSt5x3Wab9RZqbAq9A5lB3tqmkDqdT002ircl2Fp`
// );

const voucherMess = {
  correct: ["Voucher activated!", true],
  incorrect: ["Voucher is not valid!", false],
}

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [voucherCode, setVoucherCode] = useState("");
  const [discountedOffers, setDiscountedOffers] = useState([]);
  const [voucherStatus, setVoucherStatus] = useState(false);
  const [selectedVoucher, setSelectedVocuher] = useState("")
  const dispatch = useDispatch();

  const productsRes = fetchAPI(
    "/products",
    {
      filters: {
        slug: cart,
      },
      populate: {
        gallery: {
          populate: "*",
        },
        tags: {
          populate: "*",
        },
        type: {
          populate: "*",
        },
        category: {
          populate: "*",
        },
        gender: {
          populate: "*",
        },
        character: {
          populate: "*",
        },
      },
    },
    {},
    true
  );

  useEffect(() => {
    if (cart.length > 0) {
      productsRes
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false)
        })
        .catch((err) => console.log(err));
    } else {
      setProducts();
      setIsLoading(false)
    }
  }, [cart]);

  const removeProduct = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleBuy = async (e) => {
    const stripe = await stripePromise;
    e.preventDefault();
    const getIds = products.map((product) => product.id);
    const productIds = {
      product: { id: getIds },
      selectedVoucher: selectedVoucher
    };
    const res = await fetch(`${API_URL}/api/orders/`, {
      method: "POST",
      body: JSON.stringify(productIds),
      headers: {
        "Content-type": "application/json",
      },
    });
    const session = await res.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };
  const getTotalPrice = () => {
    if (products) {
      const subTotal = products.reduce((accumulator, product) => {
        return accumulator + product.attributes.price;
      }, 0);
      const totalPrice = products.reduce((accumulator, product) => {
        const discountedOffer = discountedOffers.find(
          (offer) => offer.id === product.id
        );
        const discount = discountedOffer || product;
        return accumulator + discount.attributes.price;
      }, 0);
      return { totalprice: totalPrice.toFixed(2), subTotal: subTotal.toFixed(2) };
    }
    return 0;
  };
  const checkVoucher = () => {
    setSelectedVocuher(voucherCode)
    fetchAPI("/promo-codes", {
      filters: {
        code: voucherCode,
      },
      populate: {
        products: {
          populate: "*",
        },
        tags: {
          populate: "*",
        },
        types: {
          populate: "*",
        },
      },
    }, null, true).then((res) => {
      try {
        if (res?.data.length > 0) {
          const { products: voucherProducts, tags: voucherTags, types: voucherTypes, discountPercentage } = res.data[0]?.attributes
          // Get ids voucher
          const voucherProductsIds = voucherProducts.data.map(({ id }) => id)
          const voucherTagsIds = voucherTags.data.map(({ id }) => id)
          const voucherTypesIds = voucherTypes.data.map(({ id }) => id)

          setDiscountedOffers(findMatchingProducts(voucherProductsIds, voucherTagsIds, voucherTypesIds, products, discountPercentage))
          setVoucherStatus(voucherMess.correct)
        } else {
          setDiscountedOffers(findMatchingProducts([], [], [], [], 0))
          setVoucherStatus(voucherMess.incorrect)
        }
      } catch (error) {
        console.log(error)
        setVoucherStatus(voucherMess.incorrect)
      }

    })
  }
  const findMatchingProducts = (voucherProductsIds, voucherTagsIds, voucherTypesIds, products, discountPercentage) => {
    const matchingProducts = [];

    products.forEach(product => {
      const { id, attributes } = product;
      const { tags, type, price } = attributes;

      let discountedPrice = price;

      if (voucherProductsIds.includes(id)) {
        // Jeśli produkt pasuje do kuponu, obniż cenę o określony procent
        discountedPrice -= (discountedPrice * discountPercentage) / 100;
        // Zaokrągl cenę do dwóch miejsc po przecinku
        discountedPrice = Math.round(discountedPrice * 100) / 100;
        matchingProducts.push({ ...product, attributes: { ...attributes, price: discountedPrice } });
      } else if (tags && tags.data.some(tag => voucherTagsIds.includes(tag.id))) {
        // Jeśli tag produktu pasuje do kuponu, obniż cenę o określony procent
        discountedPrice -= (discountedPrice * discountPercentage) / 100;
        // Zaokrągl cenę do dwóch miejsc po przecinku
        discountedPrice = Math.round(discountedPrice * 100) / 100;
        matchingProducts.push({ ...product, attributes: { ...attributes, price: discountedPrice } });
      } else if (type && voucherTypesIds.includes(type.data.id)) {
        // Jeśli typ produktu pasuje do kuponu, obniż cenę o określony procent
        discountedPrice -= (discountedPrice * discountPercentage) / 100;
        // Zaokrągl cenę do dwóch miejsc po przecinku
        discountedPrice = Math.round(discountedPrice * 100) / 100;
        matchingProducts.push({ ...product, attributes: { ...attributes, price: discountedPrice } });
      }
    });
    return matchingProducts;
  };
  const totalPrice = getTotalPrice()
  return (
    <Layout>
      <Seo customTitle={"Contact"} />
      <Container className="container">
        <h1 className="cartTitle">Order summary</h1>
        <div className="productsWrapper">
          {isLoading ? ("Loading") : (<>
            {products?.map((product) => {
              // Sprawdź, czy istnieje oferta z tym samym ID w discountedOffers
              const discountedOffer = discountedOffers.find(
                (offer) => offer.id === product.id
              );

              // Użyj oferty z discountedOffers, jeśli istnieje, w przeciwnym razie użyj danych z products
              const discount = discountedOffer || false;

              return (
                <CartOffer
                  key={product.id}
                  offer={product.attributes}
                  removeProduct={removeProduct}
                  discount={discount.attributes}
                />
              );
            })}
            {!products && <div>Your cart is empty</div>}
          </>)}
        </div>
        {products && (
          <BottomWrapper>
            <div className="container">
              <div className="voucherMobile">
                <h3 className="totalPriceTitle">Voucher</h3>
                <div className="totalPrice">
                  <div className="inputVoucherWrapper">
                    <InputVoucher isCorrect={voucherStatus && voucherStatus[1]} placeholder="Enter voucher code" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)} />
                    {voucherStatus && (
                      <div className={`voucherStatus${voucherStatus[1] ? "" : " incorrect"}`}>{voucherStatus[0]}</div>
                    )}
                  </div>
                  <div>
                    <ButtonVoucher onClick={checkVoucher} type="button">Apply</ButtonVoucher>
                  </div>
                </div>
              </div>
              {totalPrice.subTotal !== totalPrice.totalprice && (
                <div className="priceDescMobile">
                  <div className="priceDescElement">
                    <span className="priceText">Subtotal</span>
                    <span className="priceValue">${totalPrice.subTotal}</span>
                  </div>
                  <div className="priceDescElement">
                    <span className="priceText">Discount</span>
                    <span className="priceValue">${(totalPrice.subTotal - totalPrice.totalprice).toFixed(2)}</span>
                  </div>
                </div>
              )}
              <div className="totalPrice">
                <span className="priceText">TOTAL</span>{" "}
                <span className="priceValue">${totalPrice.totalprice}</span>
              </div>
              <div className="summaryDesktop">
                <div className="paymentMethod">
                  <h3 className="paymentMethodTitle">Payment</h3>
                  <div className="paymentWrapper">
                    <Image alt="stripeIco" src={stripeIco} width={148.25} height={47} />
                    {/* <Image src={googlePayIco} width={67.37} height={32} /> */}
                    {/* <Image src={linkPayIco} width={117.03} height={32} /> */}
                  </div>
                </div>
                <div className="summaryTotalPrice">
                  <h3 className="totalPriceTitle">Voucher</h3>
                  <div className="totalPriceDesktop">
                    <div className="inputVoucherWrapper">
                      <InputVoucher isCorrect={voucherStatus && voucherStatus[1]} placeholder="Enter voucher code" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)} />
                      {voucherStatus && (
                        <div className={`voucherStatus${voucherStatus[1] ? "" : " incorrect"}`}>{voucherStatus[0]}</div>
                      )}
                    </div>
                    <div>
                      <ButtonVoucher onClick={checkVoucher} type="button">Apply</ButtonVoucher>
                    </div>
                  </div>
                </div>
                <div className="summaryTotalPrice">
                  <h3 className="totalPriceTitle">Summary</h3>
                  {totalPrice.subTotal !== totalPrice.totalprice && (
                    <div className="priceDesc">
                      <div className="priceDescElement">
                        <span className="priceText">Subtotal</span>
                        <span className="priceValue">${totalPrice.subTotal}</span>
                      </div>
                      <div className="priceDescElement">
                        <span className="priceText">Discount</span>
                        <span className="priceValue">${(totalPrice.subTotal - totalPrice.totalprice).toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                  <div className="totalPriceDesktop">
                    <span className="priceText">Total</span>{" "}
                    <span className="priceValue priceValueTotal">${totalPrice.totalprice}</span>
                  </div>
                </div>
              </div>
              <button className="nextButton container" onClick={handleBuy}>
                Next
                <Image alt="nextArrow" src={arrowRight} width={20} height={20} />
              </button>
            </div>
          </BottomWrapper>
        )}
      </Container>
    </Layout >
  );
};

export default Cart;
