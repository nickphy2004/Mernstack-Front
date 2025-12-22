import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ visible = true, onClose }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
    email: "",
    webType: "",
    description: "",
    success: false,
  });

  
  useEffect(() => {
    const verifyToken = async () => {
      const token = sessionStorage.getItem("authToken");

      if (!token) {
        setCheckingAuth(false);
        setIsAuthenticated(false);
        alert(" Please login first to access web registration.");
        navigate("/reg");
        return;
      }

      try {
        const response = await fetch("/verify-token", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          sessionStorage.removeItem("authToken");
          alert(" Session expired. Please login again.");
          navigate("/reg");
        }
      } catch (error) {
        console.error("Token verification error:", error);
        setIsAuthenticated(false);
        sessionStorage.removeItem("authToken");
        alert(" Authentication failed. Please login again.");
        navigate("/reg");
      } finally {
        setCheckingAuth(false);
      }
    };

    verifyToken();
  }, [navigate]);

  const handleChange = (e) => {
    const field = e.target.id.replace(/[0-9]/g, "");
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("authToken");

    if (!token) {
      alert("⚠️ Please login first.");
      navigate("/reg");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/reqst", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        alert("" + (data.message || "Session expired. Please login again."));
        sessionStorage.removeItem("authToken");
        navigate("/reg");
        return;
      }

      if (response.ok && data.success) {
        setFormData({
          ...formData,
          success: true,
        });

        setTimeout(() => {
          setFormData({
            name: "",
            phonenumber: "",
            email: "",
            webType: "",
            description: "",
            success: false,
          });
          setLoading(false);
        }, 2000);
        return;
      } else {
        alert("Server error: " + (data.message || "Please try again"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert(" Network error. Please check your connection and try again.");
    }

    setLoading(false);
  };


  if (checkingAuth) {
    return (
      <div className="back">
        <div className="background-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <div className="flex-container">
          <div className="reg-box show">
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <div className="loader"></div>
              <p>Verifying authentication...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !visible) return null;

  return (
    <div>
      <div className="back">
        <div className="background-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        <div className="flex-container">
          <div className="reg-box show">
            {onClose && (
              <div className="close-btn1">
                <button onClick={onClose}>
                  <div id="closebtn"></div>
                </button>
              </div>
            )}

            <h2 id="type-cont1">Web Registration Form</h2>
            <hr id="border1" />

            <div className="point1">
              <form id="form-list1" onSubmit={handleSubmit}>

                <div className="form-field1">
                  <label htmlFor="name1">Your Name (with initial)</label>
                  <input
                    type="text"
                    id="name1"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-field1">
                  <label htmlFor="phonenumber1">Phone Number</label>
                  <input
                    type="tel"
                    id="phonenumber1"
                    placeholder="Enter your phone number"
                    value={formData.phonenumber}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-field1">
                  <label htmlFor="email1">E-mail Address</label>
                  <input
                    type="email"
                    id="email1"
                    placeholder="Enter your e-mail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-field1">
                  <label htmlFor="webType1">Website Type</label>
                  <select
                    id="webType1"
                    value={formData.webType}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  >
                    <option value="">Select type</option>
                    <option>Business Website</option>
                    <option>E-Commerce Website</option>
                    <option>College Website</option>
                    <option>School Website</option>
                  </select>
                </div>

                <div className="form-field1">
                  <label htmlFor="description1">Description</label>
                  <textarea
                    id="description1"
                    placeholder="Write a short description..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn1" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </button>

              </form>
            </div>
          </div>
        </div>

        {loading && (
          <div className="popup-overlay">
            <div className="popup-box">

              {!formData.success ? (
                <>
                  <div className="loader"></div>
                  <p>Processing your request...</p>
                </>
              ) : (
                <>
                  <div className="success-check">✓</div>
                  <p>Request Submitted Successfully!</p>
                </>
              )}

            </div>
          </div>
        )}

        <div className="main-thing1">
          <div className="main-thing">
            <div className="main">
              <h2 id="hding">Web requesting platform</h2>
              <p id="pding">
                This is a web-requesting platform where people who wants their <br /> website can easily request one and <br />receive a responsive website.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container3">
        <div className="lab-card2">
          <ul>
            <h3 id="not">Note :</h3>
            <li>On this website, if you need a custom web solution for your business, we will develop it for you. We handle the hosting and will also set up a domain name using your preferred custom name.</li>
            <li>You only need to register; if anything else is required, we will contact you personally.</li>
            <li>On this site, you can check the status of your website—what stage it is currently in. Once you make the payment, your official link and domain name will be sent to your email.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}