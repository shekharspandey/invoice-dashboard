import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Signup = () => {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    password: "",
    agree: false
  });

  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // API call here
    setSuccess(true); // 🔥 switch UI
  };

  return (
    <main className="main">
      <div className="main-inner">

        <div className="login-wrapper">
          <div className="login-card">

            {/* 🔥 CONDITIONAL UI */}
            {!success ? (
              <>
                <h1 className="login-title">Let’s get started</h1>

                <form onSubmit={handleSubmit}>

                  <input name="name" placeholder="Name" className="input-field" onChange={handleChange} />
                  <input name="company" placeholder="Company" className="input-field" onChange={handleChange} />
                  <input name="phone" placeholder="Phone" className="input-field" onChange={handleChange} />
                  <input name="email" placeholder="Email" className="input-field" onChange={handleChange} />
                  
                  <div className="password-wrapper" style={{ marginBottom: "12px" }}>
                    <input 
                      name="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Password" 
                      className="input-field" 
                      onChange={handleChange} 
                      style={{ marginBottom: 0 }}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                    </button>
                  </div>

                  <label className="terms-checkbox">
                    <input type="checkbox" name="agree" onChange={handleChange} />
                    I agree with <span>Suntec.ai terms</span>
                  </label>

                  <button type="submit" className="login-btn">
                    Get Started
                  </button>

                  <button type="button" onClick={() => navigate("/login")} className="signup-btn">
                    Already have an account? Log In.
                  </button>

                </form>
              </>
            ) : (
              <>
                {/* ✅ THANK YOU STATE */}
                <div className="success-icon">✔</div>

                <h1 className="login-title">
                  Thank you for registering.
                </h1>

                <p className="terms-text">
                  Your account registration has been successfully submitted.
                </p>

                <p className="terms-text small">
                  Our support team will review your details and send your login
                  credentials to the registered email address at the earliest.
                </p>
              </>
            )}

          </div>
        </div>

      </div>
    </main>
  );
};

export default Signup;