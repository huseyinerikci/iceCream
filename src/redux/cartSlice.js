import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] },
  reducers: {
    addToCart: (state, { payload }) => {
      //sepette aynı üründen var mı
      const found = state.cart.find(
        (item) =>
          item.id === payload.item.id && item.type === payload.selectedType
      );

      if (found) {
        //aynı üründen varsa miktar arttır
        found.amount++;
      } else {
        //! aynı üründen yoksa ekle
        state.cart.push({
          ...payload.item,
          type: payload.selectedType,
          amount: 1,
        });
      }
    },
    deleteFromCart: (state, { payload }) => {},
    createOrder: (state, { payload }) => {},
  },
});

export const { addToCart, deleteFromCart, createOrder } = cartSlice.actions;
export default cartSlice.reducer;
