import { useState } from "react";
import "./Signup.css";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const initial = {
    name: "",
    email: "",
    password: ""
  };

  const initialState = {
    name: { required: false },
    email: { required: false },
    password: { required: false }
  };

  const [errors, setErrors] = useState(initialState);
  const [input, setInput] = useState(initial);

  const handleInput1 = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let error = { ...initialState };
    let hasError = false;

    if (input.name === "") {
      error.name.required = true;
      hasError = true;
    }
    if (input.email === "") {
      error.email.required = true;
      hasError = true;
    }
    if (input.password === "") {
      error.password.required = true;
      hasError = true;
    }

    setErrors(error);

    if (hasError) return;

    setIsLoading(true);
    setShowSuccess(false);

    try {
      const response = await fetch("https://appsail-50036846539.development.catalystappsail.in/Signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: input.name,
          email: input.email,
          password: input.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error("Server Error:", data.message);
        alert(data.message || "Signup failed");
        setIsLoading(false);
        return;
      }

      console.log("Signup Success:", data);

    
      setTimeout(() => {
        setIsLoading(false);
        setShowSuccess(true);
      }, 100);
      
      setInput(initial);
      setErrors(initialState);

      setTimeout(() => {
        window.location.href = "/"; 
      }, 1500);

    } catch (err) {
      console.error("Signup Error:", err);
      alert("Signup failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="main-wrapper5">
        <div className="singup-container">
          <div className="avatar5">
            <div className="avatar5-icon"></div>
          </div>

          <form onSubmit={handleSubmit}>
      
            <div className="input-group5">
              <div className="input-wrapper5">
                <div className="input-icon5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleInput1}
                  placeholder="User Name"
                />
              </div>
              {errors.name.required && <span className="error-text5">Name is required</span>}
            </div>

          
            <div className="input-group5">
              <div className="input-wrapper5">
                <div className="input-icon5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={handleInput1}
                  placeholder="Email ID"
                />
              </div>
              {errors.email.required && <span className="error-text5">Email is required</span>}
            </div>

          
            <div className="input-group5">
              <div className="input-wrapper5">
                <div className="input-icon5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={input.password}
                  onChange={handleInput1}
                  placeholder="Password"
                />
                <button 
                  type="button" 
                  className="eye-icon5" 
                  onClick={() => setShowPassword(!showPassword)}
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
              {errors.password.required && <span className="error-text5">Password is required</span>}
            </div>

            <button 
              type="submit" 
              className="singup-btn5" 
              disabled={isLoading || showSuccess}
            >
              {isLoading ? (
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
                      height: '20px'
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
                  Signing up...
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
                "Signup"
              )}
            </button>
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