import ProductCard from "../Components/Productcard";
import "../style/Products.css";
function Products({ productItems }) {
  return (
    <main className="products-page">
      <div className="all-products">
        {productItems.map((item) => {
          return (
            <ProductCard
              key={item.id}
              id={item.id}
              image={item.image}
              productName={item.name}
              description={item.description}
              price={item.price}
            />
          );
        })}
      </div>
    </main>
  );
}

export default Products;
