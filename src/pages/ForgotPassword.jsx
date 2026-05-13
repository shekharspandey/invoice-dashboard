import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSuccess(true);
    }
  };

  return (
    <main className="main">
      <div className="login-wrapper">
        <div className="login-card">
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

          {!success ? (
            <>
              <h1 className="login-title">Forgot Password?</h1>
              <p className="terms-text">
                Enter your registered email address to receive a password reset link.
              </p>

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  required
                />

                <button type="submit" className="login-btn">
                  Reset Password
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="signup-btn"
                >
                  Back to Login
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="success-icon">✔</div>
              <h1 className="login-title">Check Your Email</h1>
              <p className="terms-text">
                Success! We've sent a password reset link to <br />
                <strong>{email}</strong>
              </p>
              <p className="terms-text small">
                If you don't see it within a few minutes, please check your spam folder.
              </p>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="login-btn"
                style={{ marginTop: "20px" }}
              >
                Return to Login
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
