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
        user: 'hairstyles.gta5@gmail.com', // Your email
        pass: 'tear usme frcz bumy' // Your email password
    }
});


module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async create(ctx) {
        const BASE_URL = ctx.request.headers.origin || 'http://firos:3000'

        const { product, selectedVoucher } = ctx.request.body
        // console.log(selectedVoucher)
        if (!product) {
            return ctx.send({
                error: 'Please add a product to body'
            }, 400);
        }

        const realProduct = await strapi.entityService.findMany('api::product.product', {
            filters: { id: product.id },
            populate: {
                tags: {
                    populate: "*",
                },
                type: {
                    populate: "*",
                },
                category: {
                    populate: "*",
                },
            },
        });
        if (!realProduct) {
            return ctx.send({
                error: "This product doesn't exist"
            }, 404);
        }
        // console.log(realProduct)
        const realVoucher = await strapi.entityService.findMany('api::promo-code.promo-code', {
            filters: { code: selectedVoucher },
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
        });
        // console.log(realProduct)
        const matchingProducts = []
        if (realVoucher.length > 0) {
            const { products: voucherProducts, tags: voucherTags, types: voucherTypes, discountPercentage } = realVoucher[0]
            // Get ids voucher
            const voucherProductsIds = voucherProducts.map(({ id }) => id)
            const voucherTagsIds = voucherTags.map(({ id }) => id)
            const voucherTypesIds = voucherTypes.map(({ id }) => id)
            realProduct.forEach(product => {
                const { id, tags, type, price } = product;

                let discountedPrice = price;

                if (voucherProductsIds.includes(id)) {
                    // Jeśli produkt pasuje do kuponu, obniż cenę o określony procent
                    discountedPrice -= (discountedPrice * discountPercentage) / 100;
                    // Zaokrągl cenę do dwóch miejsc po przecinku
                    discountedPrice = Math.round(discountedPrice * 100) / 100;
                    matchingProducts.push({ ...product, price: discountedPrice });
                } else if (tags && tags.some(tag => voucherTagsIds.includes(tag.id))) {
                    // Jeśli tag produktu pasuje do kuponu, obniż cenę o określony procent
                    discountedPrice -= (discountedPrice * discountPercentage) / 100;
                    // Zaokrągl cenę do dwóch miejsc po przecinku
                    discountedPrice = Math.round(discountedPrice * 100) / 100;
                    matchingProducts.push({ ...product, price: discountedPrice });
                } else if (type && voucherTypesIds.includes(type.id)) {
                    // Jeśli typ produktu pasuje do kuponu, obniż cenę o określony procent
                    discountedPrice -= (discountedPrice * discountPercentage) / 100;
                    // Zaokrągl cenę do dwóch miejsc po przecinku
                    discountedPrice = Math.round(discountedPrice * 100) / 100;
                    matchingProducts.push({ ...product, price: discountedPrice });
                }
            });
        }
        // const totalPrice = realProduct.reduce((accumulator, singleProduct) => {
        //     return accumulator + singleProduct.price;
        // }, 0);
        const totalPrice = realProduct.reduce((accumulator, product) => {
            const discountedOffer = matchingProducts.find(
                (offer) => offer.id === product.id
            );
            const discount = discountedOffer || product;
            return accumulator + discount.price;
        }, 0);
        const allIds = realProduct.map(singleProduct => singleProduct.id)
        const allTitles = realProduct.map((singleProduct, key) => `${key + 1}. ${singleProduct.title}`)
        const allItems = realProduct.map((singleProduct, key) => {
            const discountedOffer = matchingProducts.find(
                (offer) => offer.id === singleProduct.id
            );
            const discount = discountedOffer || singleProduct;
            return ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: discount.title
                    },
                    unit_amount: fromDecimalToInt(discount.price),
                },
                quantity: 1,
            })
        })
        // console.log(allTitles)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: allItems,
            mode: "payment",
            success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${BASE_URL}/failed?session_id={CHECKOUT_SESSION_ID}`,
        })
        // console.log("Sesja", session)
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
                    from: 'hairstyles.gta5@gmail.com',
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
                error: "It seems like the order wasn't verified. If you have any questions, please contact our support."
            }, 400);
        }
    }
}));
