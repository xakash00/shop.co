import { createSlice } from "@reduxjs/toolkit";
import { GET_ALL_PRODUCTS } from "../types";

export const getProdcutsReducer = createSlice({
    name: GET_ALL_PRODUCTS,
    initialState: {
        data: 0
    },
    reducers: {
        data: state => {
            state.value += 1
        }
    }
})

export const { data } = getProdcutsReducer.actions
export default getProdcutsReducer.reducer