import { createContext, useEffect, useState } from "react";
export const CartContext = createContext();
function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      return;
    }
    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (productId) => {
    const existingProducts = cart.filter((item) => {
      return item.id !== productId;
    });
    setCart(existingProducts);
  };

  const updateQuantity = (productId, type) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        if (type === "increase") {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        if (type === "decrease" && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      }),
    );
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart ,updateQuantity}}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
