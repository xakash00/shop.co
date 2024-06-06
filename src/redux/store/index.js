import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { cartSlice } from '../reducers/cartSlice';
import { contentSlice } from '../reducers/productReducer';

const makeStore = () =>
    configureStore({
        reducer: {
            [cartSlice.name]: cartSlice.reducer,
            [contentSlice.name]: contentSlice.reducer
        },
        devTools: true,
    });

export const wrapper = createWrapper(makeStore);