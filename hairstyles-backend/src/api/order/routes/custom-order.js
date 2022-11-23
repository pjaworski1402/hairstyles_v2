module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/orders/confirm',
            handler: 'order.confirm',
            config: {
                policies: []
            },
        },
    ],
};