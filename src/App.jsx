import { useContext, useEffect, useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Page/Home";
import ProductDetails from "./Components/ProductDetails";
import Cart from "./Page/Cart";
import CheckOut from "./Components/CheckOut";
import OrderSuccessfull from "./Components/OrderSuccessfull";
import Signup from "./Page/Signup";
import Login from "./Page/Login";
import productId1 from "./assets/productID1.webp";
import productId2 from "./assets/ProductID2.webp";
import productId3 from "./assets/ProductID3.webp";
import Products from "./Page/Products";
import { CartContext } from "./Context/CartContext";

function App() {
  const productItems = [
    {
      id: 1,
      image: productId1,
      name: "Laptop",
      description: "This is laptop",
      price: 59999,
      catagory: "electronics",
    },
    {
      id: 2,
      image: productId2,
      name: "Phone",
      description: "This is phone",
      price: 19999,
      catagory: "electronics",
    },
    {
      id: 3,
      image: productId3,
      name: "Watch",
      description: "This is watch",
      price: 9999,
      catagory: "electronics",
    },
  ];
  const {cart} = useContext(CartContext);
  const [searchInput,setSearchinput] = useState("");
  const [catagory,setCatagory] = useState("all");
  const [currentUserEmail, setCurrentUserEmail] = useState(
    () => localStorage.getItem("currentUserEmail"),
  );
  const [isLogin, setLogin] = useState(
    () => {
      const email = localStorage.getItem("currentUserEmail");
      const users = JSON.parse(localStorage.getItem("users")) || [];
      return Boolean(users.find((user) => user.email === email && user.login));
    },
  );
  
  const [signupData, setSignupdata] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  

  return (
    <div>
      <Navbar
        cartCount={cart.length}
        setSearchinput={setSearchinput}
        setCatagory={setCatagory}
        isLogin={isLogin}
        setLogin={setLogin}
        currentUserEmail={currentUserEmail}
      />

      <Routes>
        <Route path="/" element={<Home searchInput = {searchInput} Catagory={catagory} productItems={productItems}/>} />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute isLogin={isLogin}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart/checkout"
          element={
            <ProtectedRoute isLogin={isLogin}>
              <CheckOut />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart/checkout/place-order"
          element={
            <ProtectedRoute isLogin={isLogin}>
              <OrderSuccessfull />
            </ProtectedRoute>
          }
        />
        <Route path="/sign-up" element={<Signup signupData = {signupData} setSignupdata ={setSignupdata}/>}/>
        <Route
          path="/login"
          element={
            isLogin ? (
              <Navigate to="/" replace />
            ) : (
              <Login
                setLogin={setLogin}
                setCurrentUserEmail={setCurrentUserEmail}
              />
            )
          }
        />

        <Route path="/products" element={<Products productItems={productItems}/>}/>
      </Routes>
    </div>
  );
}

function ProtectedRoute({ isLogin, children }) {
  return isLogin ? children : <Navigate to="/login" replace />;
}

export default App;
