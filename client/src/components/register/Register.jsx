import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

export default function Register() {
  const [error, setError] = useState("");

  const register = useRegister();

  const navigate = useNavigate();

  const { values, changeHandler, submitHandler } = useForm(
    { email: "", password: "", rePassword: "" },
    async ({ email, password, rePassword }) => {
      if (password != rePassword) {
        values.password = "";
        values.rePassword = "";
        return setError("Passwords do not match.");
      }
      try {
        await register(email, password);
        navigate("/");
      } catch (error) {
        setError(error);
      }
    }
  );

  return (
    <div className="registration-container">
      <h1>Register</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={submitHandler} className="registration-form">
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
        <div className="form-group">
          <label htmlFor="repeatPassword">Repeat Password:</label>
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            value={values.rePassword}
            onChange={changeHandler}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
      <p className="login-link">
        Already registered? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
