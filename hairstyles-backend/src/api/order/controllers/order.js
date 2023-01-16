'use strict';
const stripe = require('stripe')("sk_test_51M48txJbvSFyUq8IptqbUiV6aVg4PIJjrt1TmFvzjP0fKsq3rNu28YvjkVvPQ9xWRcXF4aUzACZSMHTVJzjFQiVz00dTcmEqq2")
const nodemailer = require('nodemailer');
const fs = require('fs');
const fromDecimalToInt = (number) => parseInt(number * 100)

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', //Your SMTP host
    port: 587, // SMTP port
    auth: {
        user: 'kowexxxl@gmail.com', // Your email
        pass: 'quesijpcnghsaqdh' // Your email password
    }
});


module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async create(ctx) {
        const BASE_URL = ctx.request.headers.origin || 'http://firos:3000'

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
        const allTitles = realProduct.map((singleProduct, key) => `${key + 1}. ${singleProduct.title}`)
        const allItems = realProduct.map((singleProduct, key) => (
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: singleProduct.title
                    },
                    unit_amount: fromDecimalToInt(singleProduct.price),
                },
                quantity: 1,
            }
        ))
        // console.log(allTitles)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: allItems,
            mode: "payment",
            success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: BASE_URL,
        })
        console.log("Sesja", session)
        const newOrder = await strapi.entityService.create('api::order.order', {
            data: {
                products: allIds,
                total: totalPrice,
                status: 'unpaid',
                checkout_session: session.id,
            },
        });

        return { id: session.id }
    },
    async confirm(ctx) {
        const { checkout_session } = ctx.request.body
        const session = await stripe.checkout.sessions.retrieve(
            checkout_session
        )
        if (session.payment_status === "paid") {
            //Update order
            const getOrderId = await strapi.entityService.findMany('api::order.order', {
                filters: { checkout_session },
                populate: { products: true },
            });

            if (getOrderId[0].status !== "paid") {
                const products = getOrderId.map(order => order.products)
                const slugs = products.map(product => product.map(({ slug }) => slug)).flat()
                const attachments = await Promise.all(slugs.map(async (slug) => {
                    try {
                        const file = await fs.promises.readFile(`/home/pjaworski/apps/hairstyles/hairstyles-backend/private/${slug}.zip`)
                        return {
                            filename: `${slug}.zip`,
                            content: file
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }));
                const mailOptions = {
                    from: 'kowexxxl@gmail.com',
                    to: `${session.customer_details.email}`,
                    subject: 'Purchase Confirmation',
                    html: `<p>Thank you for purchasing! Check attachments</p>`,
                    attachments: attachments
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }

            const newOrder = await strapi.entityService.update('api::order.order', getOrderId[0].id, {
                data: {
                    status: 'paid',
                    email: session.customer_details.email
                },
            });
            return ctx.send({
                data: newOrder
            }, 200);

        } else {
            return ctx.send({
                error: "It seems like the order wasn't verified, please contact support"
            }, 400);
        }
    }
}));
