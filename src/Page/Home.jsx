import "../style/Home.css";
import { MdPhonelink } from "react-icons/md";
import { FaShopify } from "react-icons/fa6";
import { PiBowlFood } from "react-icons/pi";
import { GiLifeBar } from "react-icons/gi";
import ProductCard from "../Components/Productcard";
import { useEffect, useState } from "react";
import { getProducts } from "../Services/api";

function Home({ searchInput, Catagory, productItems }) {
  const [ products, setProducts ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [error, setError] = useState("");
  const filterProduct = productItems.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const catagoryProduct = productItems.filter(
    (item) => item.catagory === Catagory,
  );

  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (filterProduct.length === 0) {
    return (
      <div className="noProductFound">
        <p className="noProductFound-text">No Product Found</p>
      </div>
    );
  }

  if (searchInput.length > 0) {
    return (
      <div className="all-products">
        {filterProduct.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            image={item.image}
            productName={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    );
  }

  if (catagoryProduct.length === 0 && Catagory !== "all") {
    return (
      <div className="noProductFound">
        <p className="noProductFound-text">No Product Found</p>
      </div>
    );
  }

  if (Catagory !== "all") {
    return (
      <div className="all-products">
        {catagoryProduct.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            image={item.image}
            productName={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    );
  }

  return (
    <main className="home">
      <section className="hero">
        <h1>Welcome to Shopzy</h1>

        <p>
          Discover products you'll love, all in one place. Shopzy brings
          together quality products, modern styles, and everyday essentials to
          make your shopping experience simple, fast, and enjoyable.
        </p>

        <p>
          Explore our collection and find something perfect for you. Whether
          you're looking for the latest gadgets, stylish accessories, or useful
          products for everyday life, Shopzy is here to make shopping easier.
        </p>

        <button>Shop Now</button>
      </section>

      <section className="categories">
        <h2>Shop By Categories</h2>

        <div className="categories-container">
          <div className="categories-card">
            <MdPhonelink />
            <p>Electronics</p>
          </div>

          <div className="categories-card">
            <FaShopify />
            <p>Fashion</p>
          </div>

          <div className="categories-card">
            <PiBowlFood />
            <p>Accessories</p>
          </div>

          <div className="categories-card">
            <GiLifeBar />
            <p>Home & Life</p>
          </div>
        </div>
      </section>

      <section className="products-section">
        <h2>Featured Products</h2>
        <p>Discover our popular products</p>
      </section>

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

export default Home;
