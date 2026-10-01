
import { useNavigate } from "react-router";
import "../style/Cart.css";
import { RiCloseLargeFill } from "react-icons/ri";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();
  const increaseQuantity = (productId) => {
    setCart(
      cart.map((item) => {
        return item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      }),
    );
  };

  const decreaseQuantity = (productId) => {
    setCart(
      cart.map((item) => {
        return item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      }),
    );
  };

  const removeItem = (productId) => {
    const existingProducts = cart.filter((item) => {
      return item.id !== productId;
    });
    setCart(existingProducts);
  };

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
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <RiCloseLargeFill
                  className="removeItem"
                  onClick={() => removeItem(item.id)}
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
