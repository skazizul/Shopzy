import { useState } from "react";
import "../style/Signup.css";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useNavigate } from "react-router";

function Signup({ signupData, setSignupdata }) {
  const [showPass, setPass] = useState(false);
  const [showConfirmPass, setConfirmPass] = useState(false);
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const navigation = useNavigate();
  const handleEyeButton = () => {
    setPass((prev) => !prev);
  };

  const handleConfirmEyeButton = () => {
    setConfirmPass((prev) => !prev);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignupdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validationChecker = () => {
    let isValid = true;

    if (signupData.password.length < 8) {
      setError("Password must be at least 8 characters");
      isValid = false;
    } else {
      setError("");
    }

    if (signupData.password !== signupData.rePassword) {
      setError1("Passwords do not match");
      isValid = false;
    } else {
      setError1("");
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validationChecker()) {
      return;
    }
    const storedUsers = JSON.parse(localStorage.getItem("users"));

    const oldUsers = Array.isArray(storedUsers)
      ? storedUsers
      : storedUsers
        ? [storedUsers]
        : [];
    oldUsers.push(signupData);
    localStorage.setItem("users", JSON.stringify(oldUsers));

    navigation("/");
  };

  return (
    <main className="signup-page">
      <form className="signupContainer" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <p>Join Shopzy and start shopping.</p>

        <input
          type="text"
          name="name"
          value={signupData.name}
          placeholder="Enter your name"
          className="fullName"
          required
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="xyz@gmail.com"
          className="fullEmail"
          required
          value={signupData.email}
          onChange={handleChange}
        />

        <div className="password-wrapper">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Enter password"
            name="password"
            className="password"
            required
            value={signupData.password}
            onChange={handleChange}
          />

          <button
            type="button"
            className="showPassButton"
            onClick={handleEyeButton}
          >
            {showPass ? <LuEye /> : <LuEyeClosed />}
          </button>
          {error && <p className="password-error">{error}</p>}
        </div>

        <div className="password-wrapper">
          <input
            type={showConfirmPass ? "text" : "password"}
            name="rePassword"
            placeholder="Re-enter password"
            className="confirmPassword"
            required
            value={signupData.rePassword}
            onChange={handleChange}
          />

          <button
            type="button"
            className="showPassButton"
            onClick={handleConfirmEyeButton}
          >
            {showConfirmPass ? <LuEye /> : <LuEyeClosed />}
          </button>
          {error1 && <p className="password-error">{error1}</p>}
        </div>

        <button type="submit" className="createAccountBtn">
          Create Account
        </button>
      </form>
    </main>
  );
}

export default Signup;
