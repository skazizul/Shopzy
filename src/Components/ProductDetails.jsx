import { useParams } from "react-router-dom";
import "../style/ProductDetails.css";
import productId1 from "../assets/productID1.webp";
import productId2 from "../assets/productID2.webp";
import productId3 from "../assets/productID3.webp";

function ProductDetails({ cart, setCart }) {
  const { id } = useParams();

  const productItems = [
    {
      id: 1,
      image: productId1,
      name: "Laptop",
      description: "This is laptop",
      price: 59999,
    },
    {
      id: 2,
      image: productId2,
      name: "Phone",
      description: "This is phone",
      price: 19999,
    },
    {
      id: 3,
      image: productId3,
      name: "Watch",
      description: "This is watch",
      price: 9999,
    },
  ];

  const product = productItems.find((item) => item.id === Number(id));
  const increaseQuantity = (productId) => {
    setCart(
      cart.map((item) => {
        return item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      }),
    );
  };

  const decreseQuantity = (productId) => {
    setCart(
      cart.map((item) => {
        return item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      }),
    );
  };
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
          onClick={() => {
            const existingProduct = cart.find((item) => item.id === product.id);
            if (existingProduct) {
              return;
            }
            setCart((prev) => [...prev, { ...product, quantity: 1 }]);
          }}
        >
          Add to Cart
        </button>
        <div className="increase-decrease">
          <button
            className="increase"
            onClick={() => decreseQuantity(product?.id)}
          >
            -
          </button>
          <p className="product-quantity">{cartProduct?.quantity || 0}</p>
          <button
            className="increase"
            onClick={() => increaseQuantity(product?.id)}
          >
            +
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
