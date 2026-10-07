import { useParams } from "react-router-dom";
import "../style/ProductDetails.css";
import useCart from "../Hooks/useCart";
import { productItems } from "../ProductItems/productItems";

function ProductDetails() {
  const { cart,addToCart,updateQuantity } = useCart();
  const { id } = useParams();

  const product = productItems.find((item) => item.id === Number(id));
  if (!product) {
    return <h2>Product not found</h2>;
  }
  const cartProduct = cart.find((item) => {
    return item.id === product.id;
  });

  return (
    <main className="product-details">
      <div className="product-details-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-details-info">
        <p className="product-category">Featured Product</p>

        <h1>{product.name}</h1>

        <p className="product-description">{product.description}</p>

        <p className="product-price">₹{product.price}</p>

        <button
          className="add-cart-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
        <div className="increase-decrease">
          <button
            className="increase"
            onClick={() => updateQuantity(product.id,"decrease")}
          >
            -
          </button>
          <p className="product-quantity">{cartProduct?.quantity || 0}</p>
          <button
            className="increase"
            onClick={() => updateQuantity(product.id,"increase")}
          >
            +
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
