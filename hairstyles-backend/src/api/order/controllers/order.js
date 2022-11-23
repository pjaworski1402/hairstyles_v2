'use strict';
const stripe = require('stripe')("sk_test_51M48txJbvSFyUq8IptqbUiV6aVg4PIJjrt1TmFvzjP0fKsq3rNu28YvjkVvPQ9xWRcXF4aUzACZSMHTVJzjFQiVz00dTcmEqq2")

const fromDecimalToInt = (number) => parseInt(number * 100)

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async create(ctx) {
        const BASE_URL = ctx.request.headers.origin || 'http://localhost:3000' //So we can redirect back

        const { product } = ctx.request.body
        console.log(product)
        if (!product) {
            return ctx.send({
                error: 'Please add a product to body'
            }, 400);
        }

        const realProduct = await strapi.entityService.findMany('api::product.product', {
            filters: { id: product.id },
        });
        if (!realProduct) {
            return ctx.send({
                error: "This product doesn't exist"
            }, 404);
        }
        console.log(realProduct)
        const totalPrice = realProduct.reduce((accumulator, singleProduct) => {
            return accumulator + singleProduct.price;
        }, 0);
        const allIds = realProduct.map(singleProduct => singleProduct.id)
        console.log(allIds)
        const allTitles = realProduct.map((singleProduct, key) => `${key + 1}. ${singleProduct.title}`)
        console.log(allTitles)
        // TODO line_items powinien zawierać tablicę produktów a nie jeden produkt xD
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: allTitles.join(", ")
                        },
                        unit_amount: fromDecimalToInt(totalPrice),
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: BASE_URL,
        })
        console.log(session)
        const newOrder = await strapi.entityService.create('api::order.order', {
            data: {
                products: allIds,
                total: totalPrice,
                status: 'unpaid',
                checkout_session: session.id
            },
        });

        return { id: session.id }
    },
    async confirm(ctx) {
        // TODO Trzeba wyciągnąć jakoś checkout_session id i potwierdzać to no i żeby wysłał maila po success
        // TODO Pomysł jest taki żeby nową sesje dodawał stripe web hook a nie żeby dodawał się przy tworzeniu płatności. Tworzenie płatności ma tylko przekierwoać na stronę :D
        const clientSecret = ctx.request.body.data.object.client_secret
        console.log(ctx.request.body, clientSecret)

        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret);
        if (error) {
            return ctx.send({
                info: "error"
            }, 200);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            console.log("SUPER UDALOSIE@!!!!!")
            return ctx.send({
                info: "succeeded"
            }, 200);
        }

        // const { checkout_session } = ctx.request.body
        // console.log("checkout_session", checkout_session)
        // const session = await stripe.checkout.sessions.retrieve(
        //     checkout_session
        // )
        // console.log("verify session", session)

        // if (session.payment_status === "paid") {
        //     //Update order
        //     const newOrder = await strapi.services.order.update({
        //         checkout_session
        //     },
        //         {
        //             status: 'paid'
        //         })

        //     return newOrder

        // } else {
        //     ctx.throw(400, "It seems like the order wasn't verified, please contact support")
        // }
    }
}));
