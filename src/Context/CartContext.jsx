import { createContext, useEffect, useReducer, useState } from "react";
export const CartContext = createContext();
import cartReducer from "./cartRuducer";
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } from "./cartAction";

function CartProvider({ children }) {
  const [cart, disPatch] = useReducer(
    cartReducer,
    JSON.parse(localStorage.getItem("cart")) || [],
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      return;
    }
    // setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    disPatch({
      type: ADD_TO_CART,
      payload: product,
    });
  };

  const removeFromCart = (productId) => {
    // const existingProducts = cart.filter((item) => {
    //   return item.id !== productId;
    // });
    // setCart(existingProducts);
    disPatch({
      type: REMOVE_FROM_CART,
      payload: productId,
    });
  };

  const updateQuantity = (productId, type) => {
    // setCart((prevCart) =>
    //   prevCart.map((item) => {
    //     if (item.id !== productId) {
    //       return item;
    //     }

    //     if (type === "increase") {
    //       return {
    //         ...item,
    //         quantity: item.quantity + 1,
    //       };
    //     }

    //     if (type === "decrease" && item.quantity > 1) {
    //       return {
    //         ...item,
    //         quantity: item.quantity - 1,
    //       };
    //     }

    //     return item;
    //   }),
    // );

    disPatch({
      type: UPDATE_QUANTITY,
      payload: {
        productId,
        type,
      },
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
