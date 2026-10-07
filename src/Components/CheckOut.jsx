import { useNavigate } from "react-router-dom";
import "../style/CheckOut.css";
import useCart from "../Hooks/useCart";

function CheckOut() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  if (cart.length === 0) {
    return (
      <main className="empty-checkout">
        <p>Your cart is empty</p>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
      </main>
    );
  }


  return (
    <main className="checkout-page">
      <div className="checkout-header">
        <h2>Checkout</h2>
        <p>Review your order before placing it.</p>
      </div>
      <div className="checkout-order">
        <div className="checkout-order-title">
          <h3>Your Order</h3>
        </div>
        {cart.map((item) => (
          <div className="checkout-product" key={item.id}>
            <span className="checkout-product-name">
              {item.name} × {item.quantity}
            </span>

            <span className="checkout-product-price">
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}

        <div className="checkout-total">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <button className="place-order-btn" onClick={() => navigate("/cart/checkout/place-order")}>Place Order</button>
    </main>
  );
}

export default CheckOut;
