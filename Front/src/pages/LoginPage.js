import React, { useState } from "react";
import "../styles/LoginPage.css";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleClick = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      setSuccess(response.data);

      setError("");
    } catch (error) {
      setError("Invalid username or password");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form action="">
            <h2>Login</h2>
            <div className="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="">Email</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
            </div>
            <div className="forget">
              <label>
                <input type="checkbox" />
                Remember <a href="/">I forgot my password</a>
              </label>
            </div>
            <button onClick={handleClick} disabled={loading}>
              {loading ? "Loading" : "Log in"}
            </button>

            <h2 className="errur">{error && <p>{error}</p>}</h2>
            <div className="register">
              <p>
                I do not have an account <a href="/">Creat new account</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
