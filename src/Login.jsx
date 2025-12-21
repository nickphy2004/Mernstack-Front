import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const initialStateError = {
    email: { required: false, invalid: false },
    password: { required: false, invalid: false },
    custom_error: ""
  };

  const [error, setError] = useState(initialStateError);

  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    
    setError(initialStateError);
    
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let errors = { ...initialStateError };
    let hasError = false;

    if (input.email === "") {
      errors.email.required = true;
      hasError = true;
    }
    if (input.password === "") {
      errors.password.required = true;
      hasError = true;
    }

    if (hasError) {
      setError(errors);
      return;
    }

    setLoading(true);
    setShowSuccess(false);

    try {
      const response = await fetch("/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: input.email,
          password: input.password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log("Login successful:", data);
        
        // Store token and user info
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        
        console.log("Token stored successfully:", data.token);

        setTimeout(() => {
          setLoading(false);
          setShowSuccess(true);
        }, 100);

        // Navigate to home
        setTimeout(() => {
          navigate("/");
        }, 1500);

      } else {
        // Handle login errors
        setLoading(false);
        
        errors = { ...initialStateError };
        
        const errorMsg = data.message ? data.message.toLowerCase() : "";
        
        // Check for "already logged in" error
        if (errorMsg.includes("already logged in") || 
            errorMsg.includes("another device") || 
            errorMsg.includes("another session") ||
            response.status === 403) {
          errors.custom_error = "⚠️ You are already logged in from another device/session.\nPlease logout first to login again.";
        }
        // Check for email not found
        else if (errorMsg.includes("email not found") || 
            errorMsg.includes("user not found") || 
            errorMsg.includes("user does not exist") ||
            errorMsg.includes("no user found") ||
            response.status === 404) {
          errors.email.invalid = true;
          errors.custom_error = "This email address is not registered.";
        } 
        // Check for incorrect password
        else if (errorMsg.includes("password") && 
                 (errorMsg.includes("incorrect") || 
                  errorMsg.includes("wrong") || 
                  errorMsg.includes("invalid"))) {
          errors.password.invalid = true;
          errors.custom_error = "Incorrect password. Please try again.";
        } 
        else {
          errors.custom_error = data.message || "Invalid email or password. Please try again.";
        }
        
        setError(errors);
      }

    } catch (err) {
      console.error("Login Error:", err);
      setLoading(false);
      
      let errorMessage = "Network error occurred";
      
      if (err.message.includes("Failed to fetch")) {
        errorMessage = "Cannot connect to server. Please check:\n" +
                      "1. Backend server is running on http://10.67.97.244:8000\n" +
                      "2. MongoDB is running\n" +
                      "3. Check the terminal for errors";
      } else {
        errorMessage = err.message;
      }
      
      setError({
        ...initialStateError,
        custom_error: errorMessage
      });
    }
  };

  return (
    <div>
      <div className="background-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
    
      <div className="main-wrapper">
        <div className="login-container">
          <div className="avatar">
            <div className="avatar-icon"></div>
          </div>

          <form onSubmit={handleSubmit}>
          
            {error.custom_error && (
              <div className="error-message" style={{
                backgroundColor: '#fee',
                border: '1px solid #fcc',
                padding: '12px',
                borderRadius: '5px',
                marginBottom: '15px',
                color: '#c33',
                textAlign: 'center',
                whiteSpace: 'pre-line',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                {error.custom_error}
              </div>
            )}

            <div className="input-group">
              <div className={`input-wrapper ${error.email.invalid ? 'input-error' : ''}`}>
                <div className="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <input 
                  type="email" 
                  name="email" 
                  value={input.email}
                  onChange={handleInput} 
                  placeholder="Email ID"
                  disabled={loading || showSuccess}
                  className={error.email.invalid ? 'input-error' : ''}
                />
              </div>
              {error.email.required && (
                <span className="reg1">Email is required.</span>
              )}
              {error.email.invalid && (
                <span className="reg1">This email address is not registered.</span>
              )}
            </div>

            <div className="input-group">
              <div className={`input-wrapper ${error.password.invalid ? 'input-error' : ''}`}>
                <div className="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  value={input.password}
                  onChange={handleInput} 
                  placeholder="Password"
                  disabled={loading || showSuccess}
                  className={error.password.invalid ? 'input-error' : ''}
                />
                <button 
                  type="button" 
                  className="eye-icon" 
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading || showSuccess}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
              {error.password.required && (
                <span className="reg1">Password is required.</span>
              )}
              {error.password.invalid && (
                <span className="reg1">The password you entered is incorrect.</span>
              )}
            </div>

            <div className="options">
              <label className="remember-me">
                <input type="checkbox" name="remember" disabled={loading || showSuccess}/>
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button 
              type="submit" 
              className="login-btn" 
              disabled={loading || showSuccess}
            >
              {loading ? (
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  <svg 
                    style={{
                      animation: 'spin 1s linear infinite',
                      width: '20px',
                      height: '20px',
                    }}
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      style={{ opacity: 0.25 }} 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      style={{ opacity: 0.75 }} 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Logging in...
                </span>
              ) : showSuccess ? (
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  <svg 
                    style={{
                      width: '20px',
                      height: '20px',
                      animation: 'checkmark 0.6s ease-in-out',
                      strokeDasharray: '100'
                    }}
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Success!
                </span>
              ) : (
                <span>LOGIN</span>
              )}
            </button>

            <div className="signup-link">
              <p>Don't have an account? <a href="/Sign">Sign up</a></p>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes checkmark {
          0% {
            stroke-dasharray: 0, 100;
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            stroke-dasharray: 100, 100;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}