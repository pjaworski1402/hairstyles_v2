import { Container, BottomWrapper } from "../../styles/pages/Cart.styled"
import Layout from "../../components/Layout/Layout";
import { fetchAPI } from "../../lib/api";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import CartOffer from "../../components/OfferCards/CartOffer";
import { removeFromCart } from "../../redux/cart.slice";
import Image from "next/image";
import arrowRight from "../../static/icons/arrow-next.svg"
import stripeIco from "../../static/images/stripe.png"
import googlePayIco from "../../static/images/googlePay.png"
import linkPayIco from "../../static/images/linkPay.png"

const stripePromise = loadStripe(`pk_test_51M48txJbvSFyUq8IKOyqyNuANXMw7O22W0jYLUvraG6MSNHqjrTfJ2wp89CFeSYpDFQwoFdt52o1LmRtdmvhvJd400NIHoixad`)

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const [products, setProducts] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();
    console.log(cart)

    const productsRes = fetchAPI("/products", {
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

    useEffect(() => {
        productsRes.then(res => {
            setProducts(res.data)
            console.log(res.data)
            // setTotalPrice(res.data)
        }).catch(err => console.log(err))
    }, [cart])

    const removeProduct = (product) => {
        dispatch(removeFromCart(product))
    }

    const handleBuy = async (e) => {
        const stripe = await stripePromise
        e.preventDefault()
        console.log("test", products)
        const getIds = products.map(product => product.id)
        const productIds = {
            product: { id: getIds }
        }
        console.log(productIds)
        const res = await fetch(`http://firos:1337/api/orders/`, {
            method: 'POST',
            body: JSON.stringify(productIds),
            headers: {
                'Content-type': 'application/json',
            }
        })
        const session = await res.json()
        console.log("session", session)

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });
    }
    console.log(products)
    const getTotalPrice = () => {
        if (products) {
            const totalprice = products.reduce((accumulator, product) => {
                return accumulator + product.attributes.price;
            }, 0);
            return totalprice;
        }
        return 0;
    }
    return (
        <Layout>
            <Container className="container">
                <h1 className="cartTitle">Order summary</h1>
                <div className="productsWrapper">
                    {products?.map(product => <CartOffer offer={product.attributes} removeProduct={removeProduct} />)}
                </div>
                <BottomWrapper>
                    <div className="container">
                        <div className="totalPrice">
                            <span className="priceText">TOTAL</span> <span className="priceValue">${getTotalPrice()}</span>
                        </div>
                        <div className="summaryDesktop">
                            <div className="paymentMethod">
                                <h3 className="paymentMethodTitle">Payment</h3>
                                <div className="paymentWrapper">
                                    <Image src={stripeIco} width={148.25} height={47} />
                                    <Image src={googlePayIco} width={67.37} height={32} />
                                    <Image src={linkPayIco} width={117.03} height={32} />
                                </div>
                            </div>
                            <div className="summaryTotalPrice">
                                <h3 className="totalPriceTitle">Summary</h3>
                                <div className="totalPriceDesktop">
                                    <span className="priceText">Total</span> <span className="priceValue">${getTotalPrice()}</span>
                                </div>
                            </div>
                        </div>
                        <button className="nextButton container" onClick={handleBuy}>
                            Next
                            <Image src={arrowRight} width={20} height={20} />
                        </button>
                    </div>
                </BottomWrapper>
            </Container>
        </Layout>);
}

export default Cart;