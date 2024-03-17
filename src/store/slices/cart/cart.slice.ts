import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cart, Product } from "./type/cart.type";
import { RootState } from "../../types/store.type";

const initialState: Cart = {
  products: [],
  totalPrice: 0.0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const { id } = action.payload;

      const itemInCart = state.products.find((product) => product.id === id);

      if (itemInCart) itemInCart.amount++;
      else {
        state.products.push(action.payload);
      }

      const priceOfProductsInCart = state.products.reduce((acc, product) => {
        return (acc += product.amount * product.price);
      }, 0);

      const totalPrice = parseFloat(priceOfProductsInCart.toFixed(2));
      state.totalPrice = totalPrice;
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const filteredProductrs = state.products.filter(
        (product) => product.id !== action.payload
      );

      state.products = filteredProductrs;

      const priceOfProductsInCart = state.products.reduce((acc, product) => {
        return (acc += product.amount * product.price);
      }, 0);

      const totalPrice = parseFloat(priceOfProductsInCart.toFixed(2));
      state.totalPrice = totalPrice;
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const itemInCart = state.products.find(
        (product) => product.id === action.payload
      );
      if (itemInCart) itemInCart.amount++;
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const itemInCart = state.products.find(
        (product) => product.id === action.payload
      );
      if (itemInCart) {
        itemInCart.amount === 1
          ? removeProduct(action.payload)
          : itemInCart.amount--;
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0.0;
    },
  },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;

export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;

export default cartSlice;
