import { NavLink } from "react-router-dom";
import "../style/Navbar.css";
import { IoSearch } from "react-icons/io5";
function Navbar({ cartCount,setSearchinput,setCatagory }) {
  const handleClick = (item) =>{
    setSearchinput(item.target.value);
  }
  return (
    <div className="navigation">
      <div className="logo-container">
        <div className="logo"></div>
        <p>
          Shop<span>zy</span>
        </p>
      </div>
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">
          Cart<sup>{cartCount}</sup>
        </NavLink>
      </div>
      <div className="searchbar">
        <IoSearch className="searchicon" />
        <input type="text" placeholder="search products..." className="searchBox" onChange={(item) => handleClick(item) }/>
      </div>
      <select name="catagory" id="catagory" onChange={(item) => setCatagory(item.target.value)}>
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="accessories">Accessories</option>
        </select>
      <div className="button-login-container">
        <button>Login</button>
        <button id="sign-up-button">Sign Up</button>
      </div>
    </div>
  );
}

export default Navbar;
