import { useState } from "react";
import "../style/Login.css";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useNavigate } from "react-router";

function Login({ setLogin,setCurrentUserEmail }) {
  const [showPass, setPass] = useState(false);
  const navigation = useNavigate();
  const [loginData, setLogindata] = useState({
    email: "",
    password: "",
  });
  const [loginMessage, setLoginMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleEyeButton = () => {
    setPass((prev) => !prev);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogindata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const existingUser = JSON.parse(localStorage.getItem("users")) || [];
  const findUser = existingUser.filter(
    (user) => user.email === loginData.email,
  );
  const finalUser = findUser.find(
    (user) => user.password === loginData.password,
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (findUser.length === 0) {
      setLoginMessage("User not found");
      setMessageType("error");
    } else if (!finalUser) {
      setLoginMessage("Wrong password");
      setMessageType("error");
    } else {
      const updatedUsers = existingUser.map((user) =>
        user.email === finalUser.email
          ? { ...user, login: true }
          : { ...user, login: false },
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("currentUserEmail", finalUser.email);
      setLoginMessage("Login successful");
      setMessageType("success");
      setLogin(true);
      setCurrentUserEmail(finalUser.email);
      navigation("/", { replace: true });
    }

  };

  return (
    <main className="login-page">
      <form className="loginContainer" onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>
        <p>Login to your Shopzy account.</p>

        <input
          type="email"
          placeholder="Enter email"
          required
          name="email"
          value={loginData.email}
          className="loginEmail"
          onChange={handleChange}
        />

        <div className="password-wrapper">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Enter password"
            className="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            className="showPassButton"
            onClick={handleEyeButton}
          >
            {showPass ? <LuEye /> : <LuEyeClosed />}
          </button>
        </div>
        {loginMessage && (
          <p className={`login-message ${messageType}`}>{loginMessage}</p>
        )}
        <button type="submit" className="loginButton">
          Login
        </button>

        <p className="signup-link">
          Don't have an account?{" "}
          <span onClick={() => navigation("/sign-up")}>Sign Up</span>
        </p>
      </form>
    </main>
  );
}

export default Login;
