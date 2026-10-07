
import { useNavigate } from "react-router";
import "../style/Cart.css";
import { RiCloseLargeFill } from "react-icons/ri";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import useCart from "../Hooks/useCart";

function Cart() {
  const { cart,removeFromCart,updateQuantity } = useCart();
  const navigate = useNavigate();
  

  const totalPrice = cart.reduce((totalprice, item) => {
    return totalprice + item.quantity * item.price;
  }, 0);

  return (
    <main className="cart-page">
      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart and they will appear here.</p>
        </div>
      ) : (
        <div>
          <div className="cart-header">
            <h1>Your Cart</h1>
            <p>Review the products you've added to your cart.</p>
          </div>
          <div className="cart-container">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-item-info">
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <span>₹{item.price}</span>
                </div>

                <div className="sub-total">
                  <span>₹{item.quantity * item.price}</span>
                </div>

                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.id,"decrease")}>-</button>

                  <span>{item.quantity}</span>

                  <button onClick={() => updateQuantity(item.id,"increase")}>+</button>
                </div>
                <RiCloseLargeFill
                  className="removeItem"
                  onClick={() => removeFromCart(item.id)}
                />
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div>
              <span>Total</span>
              <strong>₹{totalPrice}</strong>
            </div>

            <button onClick={() => navigate("/cart/checkout")}>Checkout</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Cart;
