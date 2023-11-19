export const addToLocalCart = (productSlug) => {
    if (typeof window !== "undefined") {
        const oldCart = JSON.parse(localStorage.getItem("cart")) || [];
        if (!oldCart.includes(productSlug)) {
            localStorage.setItem("cart", JSON.stringify([productSlug, ...oldCart]))
        }
    }
}

export const getLocalCart = () => {
    if (typeof window !== "undefined") {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        return cart;
    }
    return [];
}

export const removeFromLocalCart = (productSlug) => {
    if (typeof window !== "undefined") {
        const oldCart = JSON.parse(localStorage.getItem("cart")) || [];
        const index = oldCart.findIndex((item) => item === productSlug);
        oldCart.splice(index, 1);
        if (!oldCart.includes(productSlug)) {
            localStorage.setItem("cart", JSON.stringify([...oldCart]))
        }
    }
}

export const clearLocalCart = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
    }
}