import "../style/ProductCard.css";
import { useNavigate } from "react-router-dom";
function ProductCard({id, image, productName, description, price ,onView}) {
  const navigae = useNavigate();
  const handleView = ()=>{
    navigae(`/products/${id}`);
  }
  return (
    <div className="product-container">
      <div className="product-img"><img src={image} alt={productName} /></div>
      <h3>{productName}</h3>
      <p>{description}</p>
      <p>{price}</p>
      <button onClick={handleView}>View</button>
    </div>
  );
}

export default ProductCard;