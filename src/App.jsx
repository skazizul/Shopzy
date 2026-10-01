import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Page/Home";
import ProductDetails from "./Components/ProductDetails";
import Cart from "./Page/Cart";
import CheckOut from "./Components/CheckOut";
import OrderSuccessfull from "./Components/OrderSuccessfull";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart):[]
  });
  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cart))
  },[cart]);

  return (
    <div>
      <Navbar cartCount={cart.length} />

      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />

        <Route
          path="/products/:id"
          element={<ProductDetails cart={cart} setCart={setCart} />}
        />

        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/cart/checkout" element={<CheckOut cart={cart}/>}/>
        <Route path="/cart/checkout/place-order" element={<OrderSuccessfull/>}/>
      </Routes>
    </div>
  );
}

export default App;
