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
    deleteFromCart: (state, { payload }) => {
      const index = state.cart.findIndex(
        (item) => item.id === payload.id && item.type === payload.type
      );
      if (state.cart[index].amount > 1) {
        //miktar 1 den fazla ise miktar azalt
        state.cart[index].amount--;
      } else {
        //miktar 1 ise ürünü sil
        state.cart.splice(index, 1);
      }
    },
    createOrder: (state, { payload }) => {},
  },
});

export const { addToCart, deleteFromCart, createOrder } = cartSlice.actions;
export default cartSlice.reducer;
