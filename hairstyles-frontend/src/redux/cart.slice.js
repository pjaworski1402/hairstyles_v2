import { createSlice } from '@reduxjs/toolkit';
import { getLocalCart, addToLocalCart, removeFromLocalCart } from "../utilities/cartLocalStorage"

const cartSlice = createSlice({
    name: 'cart',
    initialState: getLocalCart(),
    reducers: {
        addToCart: (state, action) => {
            const itemExists = state.find((item) => item === action.payload.slug);
            if (!itemExists) {
                addToLocalCart(action.payload.slug)
                state.push(action.payload.slug);
            }
        },
        removeFromCart: (state, action) => {
            const index = state.findIndex((item) => item === action.payload.slug);
            state.splice(index, 1);
            removeFromLocalCart(action.payload.slug)
        },
    },
});

export const cartReducer = cartSlice.reducer;

export const {
    addToCart,
    removeFromCart,
} = cartSlice.actions;