import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "dummy-token");
    navigate("/");
  };

  return (
    <main className="main">

      {/* LOGIN WRAPPER */}
      <div className="login-wrapper">

        <div className="login-card">

          {/* LOGO */}
          <div className="login-logo">
            <img
              src="https://www.suntec.ai/img/logo-top-header-nw.svg"
              className="logo-light"
              alt="logo"
            />
            <img
              src="https://www.suntec.ai/img/logo-top-header-white.svg"
              className="logo-dark"
              alt="logo"
            />
          </div>

          {/* TITLE */}
          <h1 className="login-title">
            Welcome to <span className="brand">Suntec.ai</span>
          </h1>

          {/* FORM */}
          <form onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                style={{ marginBottom: 0 }}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
              </button>
            </div>

            <p className="terms-text">
              You agree with our <span>terms</span>
            </p>

            <button type="submit" className="login-btn">
              Log In
            </button>

            <p 
              className="forgot" 
              onClick={() => navigate("/forgot-password")}
              style={{ cursor: "pointer" }}
            >
              Forgot Password
            </p>

            <button type="button" onClick={() => navigate("/signup")} className="signup-btn">
              Don’t have an account? Sign up.
            </button>

          </form>

        </div>

      </div>

    </main>
  );
};

export default Login;