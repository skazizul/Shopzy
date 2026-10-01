import { useNavigate } from "react-router-dom";
import "../style/OrderSuccessfull.css";

function OrderSuccessfull() {
  const navigate = useNavigate();

  return (
    <main className="success-page">
      <div className="success-card">
        <div className="success-icon">✓</div>

        <h1>Thank You For Your Order!</h1>
        <p className="success-title">
          Your order has been placed successfully.
        </p>
        <p className="success-description">
          We've received your order and it's now being processed. You'll receive
          an update when your order is ready.
        </p>
        <button className="continue-shopping" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    </main>
  );
}

export default OrderSuccessfull;
