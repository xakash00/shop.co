import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper'

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        searchTerm: "",
        quantity: 0,
        cartItems: [],
        totalAmount: 0,
        scroll_position: null
    },
    reducers: {
        searchProducts: (state, { payload }) => {
            state.searchTerm = payload
        },
        setScrollPosition: (state, action) => {
            state.scroll_position = action.payload
        },
        addToCart: (state, { payload }) => {
            const isItemExist = state.cartItems.find(
                (item) => item.id === payload.id
            );
            if (!isItemExist) {
                state.cartItems = [...state.cartItems, { ...payload, quantity: 1 }];
            } else {
                state.cartItems = state.cartItems.map((item) => {
                    if (item.id === payload.id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
            state.quantity++;
            state.totalAmount += payload.price;
        },

        removeFromCart: (state, { payload }) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== payload.id
            );
            state.quantity -= payload.quantity;
            state.totalAmount -= payload.price * payload.quantity;
        },

        addItemQuantity: (state, { payload }) => {
            state.cartItems = state.cartItems.map((item) => {
                if (item.id === payload.id) {
                    return { ...item, quantity: item.quantity + 1 };
                } else {
                    return item;
                }
            });
            state.quantity++;
            state.totalAmount += payload.price;
        },

        subtractItemQuantity: (state, { payload }) => {
            const subItem = state.cartItems.find((item) => item.id === payload.id);
            if (subItem.quantity === 1) {
                state.cartItems = state.cartItems.filter(
                    (item) => item.id !== subItem.id
                );
            } else {
                subItem.quantity -= 1;
            }
            state.quantity--;
            state.totalAmount -= subItem.price;
        },
        extraReducers: {
            [HYDRATE]: (state, action) => {
                return {
                    ...state,
                    ...action.payload.cart,
                };
            },
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    searchProducts,
    addItemQuantity,
    subtractItemQuantity,
    setScrollPosition
} = cartSlice.actions;

export default cartSlice.reducer;