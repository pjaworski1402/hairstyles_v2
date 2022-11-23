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

    return (
        <Layout>
            <Container>
                <h1 className="cartTitle">Checkout</h1>
                <div className="productsWrapper">
                    {products?.map(product => <CartOffer offer={product.attributes} removeProduct={removeProduct} />)}
                </div>
                <BottomWrapper>
                    TOTAL { }
                    <button className="nextButton" onClick={handleBuy}>
                        Next
                        <Image src={arrowRight} width={20} height={20} />
                    </button>
                </BottomWrapper>
            </Container>
        </Layout>);
}

export default Cart;