import "../style/ProductCard.css";
import { useNavigate } from "react-router-dom";
function ProductCard({id, image, productName, description, price ,onView}) {
  const navigae = useNavigate();
  return (
    <div className="product-container">
      <div className="product-img"><img src={image} alt={productName} /></div>
      <h3>{productName}</h3>
      <p>{description}</p>
      <p>{price}</p>
      <button onClick={()=> navigae(`/products/${id}`)}>View</button>
    </div>
  );
}

export default ProductCard;