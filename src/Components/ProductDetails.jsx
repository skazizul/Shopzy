import { useParams } from "react-router-dom";
import "../style/ProductDetails.css";
import productId1 from "../assets/productID1.webp";
import productId2 from "../assets/ProductID2.webp";
import productId3 from "../assets/ProductID3.webp";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

function ProductDetails() {
  const { cart,addToCart,updateQuantity } = useContext(CartContext)
  const { id } = useParams();

  const productItems = [
    {
      id: 1,
      image: productId1,
      name: "Laptop",
      description: "This is laptop",
      price: 59999,
      catagory:"electronics"
    },
    {
      id: 2,
      image: productId2,
      name: "Phone",
      description: "This is phone",
      price: 19999,
      catagory:"electronics"
    },
    {
      id: 3,
      image: productId3,
      name: "Watch",
      description: "This is watch",
      price: 9999,
      catagory:"electronics"
    },
  ];

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
            onClick={() => updateQuantity(item.id,"decrease")}
          >
            -
          </button>
          <p className="product-quantity">{cartProduct?.quantity || 0}</p>
          <button
            className="increase"
            onClick={() => updateQuantity(item.id,"increase")}
          >
            +
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
