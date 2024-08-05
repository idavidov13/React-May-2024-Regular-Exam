import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useLogin } from "../../hooks/useAuth";

export default function Login() {
  const [error, setError] = useState("");

  const login = useLogin();
  const navigate = useNavigate();

  const { values, changeHandler, submitHandler } = useForm(
    { email: "", password: "" },
    async ({ email, password }) => {
      try {
        await login(email, password);
        navigate("/");
      } catch (err) {
        values.password = "";
        const errorMessage =
          err?.message ||
          "An error occurred during registration. Please try again.";
        setError(errorMessage);
      }
    }
  );

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={submitHandler} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={changeHandler}
            placeholder="IvanDavidov@softuni.bg"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={changeHandler}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
      <p className="register-link-login-page">
        Not registered yet? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
