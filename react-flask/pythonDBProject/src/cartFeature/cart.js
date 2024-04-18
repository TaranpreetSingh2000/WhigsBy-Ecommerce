import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const productItem = state.products.find(
        (item) => item.id === action.payload.id
      );

      if (productItem) {
        productItem.quantity += action.payload.quantity; // if item is already in the cart then the new quantity of items append in the existing cart and increase its count
      } else {
        state.products.push(action.payload);
      }
    },

    removetoCart: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
    },

    resetCart: (state) => {
      state.products = [];
    },
  },
});

export const { addtoCart, removetoCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
