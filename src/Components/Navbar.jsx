import { NavLink } from "react-router-dom";
import "../style/Navbar.css";
function Navbar({ cartCount }) {
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
      <div className="button-login-container">
        <button>Login</button>
        <button id="sign-up-button">Sign Up</button>
      </div>
    </div>
  );
}

export default Navbar;
