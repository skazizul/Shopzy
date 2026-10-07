import { NavLink, useNavigate } from "react-router-dom";
import "../style/Navbar.css";
import { IoSearch } from "react-icons/io5";
function Navbar({
  cartCount,
  setSearchinput,
  setCatagory,
  isLogin,
  setLogin,
  currentUserEmail,
}) {
  const navigation = useNavigate();
  const handleClick = (item) => {
    setSearchinput(item.target.value);
  };
  const handleLogin = () => {
    if (!isLogin) {
      navigation("/login");
    }
  };

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const logedUser = users.find((user) => user.email === currentUserEmail);

  const handleLogout = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.email === currentUserEmail ? { ...user, login: false } : user,
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.removeItem("currentUserEmail");
    localStorage.removeItem("logedInUser");
    setLogin(false);
    navigation("/login");
  };
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
        <NavLink to="/cart" onClick={handleLogin}>
          Cart<sup>{cartCount}</sup>
        </NavLink>
      </div>
      <div className="searchbar">
        <IoSearch className="searchicon" />
        <input
          type="text"
          placeholder="search products..."
          className="searchBox"
          onChange={(item) => handleClick(item)}
        />
      </div>
      <select
        name="catagory"
        id="catagory"
        onChange={(item) => setCatagory(item.target.value)}
      >
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="accessories">Accessories</option>
      </select>
      <div className="button-login-container">
        {isLogin ? (
          <>
            <p className="welcome-message">
              Welcome, <span>{logedUser.name}</span>
            </p>

            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigation("/login")}>Login</button>
            <button id="sign-up-button" onClick={() => navigation("/sign-up")}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
