import React, { useState, useRef, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import MarPhoto from "./assets/mar.jpg";
import LapPhoto from "./assets/lap.jpg";
import WhatsPhoto from "./assets/call.png";
import EmailPhoto from "./assets/email.png";
import TrollyPhoto from "./assets/trolly.jpeg";

function Header({ onmenuClick, aboutRef, contactRef, homeRef, goToNextPage, goToNextPage3, goToNextPage4, handlepopup, handleLogout }) {
  return (
    <div>
      <div className="main-back" ref={homeRef}>

       <div className="background-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
    </div>

        {/* Heading components */}
        <div className="heading">
          <div className="head-ing">
            <button className="menu-bar" id="menu-btn" onClick={onmenuClick}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </button>
            <div className="main-head">
              <h1 id="tit">Web Requesting Platform</h1>
            </div>
          </div>

           <div className="abt6">
            <button id="abt-us6" onClick={() => window.scrollTo({ top: 0, behavior: "instant" })} >Home</button>
          </div>

            <div className="abt7">
            <button id="abt-us7" onClick={goToNextPage4} >
              Signup
            </button>
          </div>


          <div className="abt">
            <button
              id="abt-us"
              onClick={() =>
                aboutRef.current &&
                aboutRef.current.scrollIntoView({ behavior: "smooth" })
              }
            >
              about us
            </button>
          </div>
          <div className="abt2">
            <button
              id="abt-us2"
              onClick={() =>
                contactRef.current &&
                contactRef.current.scrollIntoView({ behavior: "smooth" })
              }
            >
              contact us
            </button>
          </div>
          <div className="abt3">
            <button id="abt-us3" onClick={goToNextPage3} >
              Login
            </button>
          </div>

          <div className="abt4">
            <button id="abt-u4" onClick={goToNextPage}>
              Web Registration
            </button>
          </div>

         
        </div>

        {/* Images */}
        <div className="img">
          <img src="Market.jpg" alt="Description" id="back-img" />
        </div>
        <div className="img2">
          <img src={MarPhoto} alt="Description" id="back-img2" />
        </div>
        <div className="img3">
          <img src={LapPhoto} alt="Description" id="back-img3" />
        </div>

        {/* Main Content */}
        <div className="main-cont">
          <div className="pag-cont">
            <h1 id="cont">
              Welcome To Web <br />
              <span id="con-t">Requesting Platform</span>
            </h1>

            <div className="par-cont">
              <p id="par">
                The Web Requesting Platform is a web-based system designed <br />
                to handle online requests and automate communication between <br /> users
                and servers.
              </p>
              <p id="par2">
                This requesting platform helps you get a website <br />
                for your business, school, college, or any other purpose. <br />
                You just need to register and specify the type of website you need.
              </p>
              <p id="par3">
                Get a professional website for your business in just a few clicks.
              </p>
            </div>
          </div>

          <div className="check-sts">
            <button id="check" onClick={handlepopup}>
              <div className="trolly">
                <img src={TrollyPhoto} alt="Description" id="trolly-img" />
              </div>
              Check Status
            </button>
          </div>

          <div className="box">
            <h2 id="type-cont">Description</h2>
            <hr id="border" />
            <div className="point">
              <ul id="list">
                <li id="lis">New Business Web</li>
                <li id="lis">E-Commerce Web</li>
                <li id="lis">School And College Web</li>
              </ul>
            </div>
          </div>

          <div className="box2">
            <h2 id="type-cont2">What We Do</h2>
            <hr id="border2" />
            <div className="point2">
              <ul id="list2">
                <li id="lis2">
                  Build responsive websites that look great on all devices.
                </li>
                <li id="lis2">
                  Design creative UI/UX interfaces for a smooth user experience.
                </li>
                <li id="lis2">
                  Integrate advanced features like chatbots, API automation, and dashboards.
                </li>
              </ul>
            </div>
          </div>

          <div className="about-box" ref={aboutRef}>
            <h2 id="about-title">About Us</h2>
            <hr id="about-line" />
            <div className="about-content">
              <p>
                <strong id="hed">
                  Welcome to web requesting platform — Your Virtual Web Creation Hub!
                </strong>
              </p>
              <p>
                We are a passionate team of developers helping anyone create their
                own custom website easily. Whether you're launching a{" "}
                <span>business</span>, building an <span>e-commerce store</span>, or
                managing a <span>school or college website</span>, our platform makes
                it fast and simple.
              </p>
              <p>
                Just tell us what kind of website you need — we'll handle the design,
                development, and hosting, so you can focus on growing your idea.
              </p>
              <h3 className="sub-head">Our Mission</h3>
              <p>
                To make website creation simple, affordable, and accessible for
                everyone.
              </p>
              <h3 className="sub-head">Our Vision</h3>
              <p>
                Empowering students, startups, and small businesses to go digital with
                confidence.
              </p>
            </div>
          </div>

          <div className="about-box1" ref={contactRef}>
            <div className="about1">
              <h2 id="about-title1">Contact Us</h2>
            </div>

            <hr id="about-line1" />
            <div className="about-content1">
              <p>
                <strong id="hed1">We'd love to hear from you!</strong>
              </p>
              <p> Have any questions, feedback, or any other</p>
              <div className="img4">
                <img src={WhatsPhoto} alt="Description" id="back-img4" />
              </div>
              <div className="phe-num">
                <p id="num">+91 8778445875</p>
              </div>
              <div className="img5">
                <img src={EmailPhoto} alt="Description" id="back-img5" />
              </div>
              <div className="e-mail">
                <p id="email">webrequesting@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-nav">
        <div className="check-sts1">
            <button id="check1" onClick={handlepopup}>
                Check Status
            </button>
        </div>
    </div>
      </div>
    </div>
  );
}

function Menubar({ visible, handleClose, aboutRef, contactRef, goToNextPage, goToNextPage3, goToNextPage4 }) {
  if (!visible) return null;

  return (
    <div className="main-box1 show1">
      <div className="close-btn">
        <button onClick={handleClose}>
          <div id="closebtn1"></div>
        </button>
      </div>

      <div className="navi-tio">
        <div className="home1">
          <button
            id="home-us1"
            onClick={() => {
              handleClose();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            home
          </button>
        </div>
        <div className="web2">
          <button id="web-us2" onClick={goToNextPage}>
            Web Registration
          </button>
        </div>
        <div className="contact3">
          <button
            id="contact-us3"
            onClick={() => {
              handleClose();
              contactRef.current &&
                contactRef.current.scrollIntoView({ behavior: "smooth" });
            }}
          >
            contact us
          </button>
        </div>
        <div className="aout4">
          <button
            id="abt-us4"
            onClick={() => {
              handleClose();
              aboutRef.current &&
                aboutRef.current.scrollIntoView({ behavior: "smooth" });
            }}
          >
            about us
          </button>
        </div>


        <div className="log1">
          <button id="log-out" onClick={goToNextPage3}> Login </button>
        </div>


      <div className="login1">
          <button id="log-in" onClick={goToNextPage4}> Signup </button>
        </div>

      </div>
    </div>
  );
}


function Status({ show, handleClose2, goToNextPage2 }) {
  return (
    <div>
      <div className="container" style={{ display: show ? "block" : "none" }}>
        <div className="header">
          <h1>🚚 Check Your Site Status</h1>
          <div className="order-info">
            <div className="info-item">
              <div className="info-label">Order ID</div>
              <div className="info-value">#ORD789456123</div>
            </div>
            <div className="info-item">
              <div className="info-label">Placed On</div>
              <div className="info-value">Nov 28, 2024</div>
            </div>
            <div className="info-item">
              <div className="info-label">Total Amount</div>
              <div className="info-value">₹2,499</div>
            </div>
          </div>
        </div>

        <div className="close-btn2">
          <button onClick={handleClose2}>
            <div id="closebtn2"></div>
          </button>
        </div>

        <div className="content">
          <div className="tracking-timeline">
            <div className="timeline-item completed">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-title">✓ Registration Confirmed</div>
                <div className="timeline-desc">Your data has been placed successfully</div>
                <span className="status-badge status-completed">Completed</span>
              </div>
            </div>

            <div className="timeline-item completed">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-title">✓ In progress</div>
                <div className="timeline-desc">Your site developing right now</div>
                <span className="status-badge status-completed">Completed</span>
              </div>
            </div>

            <div className="timeline-item completed">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-title">✓ Testing</div>
                <div className="timeline-desc">Your site testing right now</div>
                <span className="status-badge status-completed">Completed</span>
              </div>
            </div>

            <div className="timeline-item active">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-title">🚚 Finished</div>
                <div className="timeline-desc">Your site is functioning correctly during testing</div>
                <span className="status-badge status-active">In Progress</span>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-title">Now you can going to purchas</div>
                <div className="timeline-desc">Package will be delivered to your address</div>
              </div>
            </div>
          </div>

          <div className="estimated-delivery">
            <button id="purchas" onClick={goToNextPage2}>🎉 Purchasing </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}





function Profile({ handleLogout }) {

  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleViewProfile = () => {
    setShowProfile(true);
    setIsOpen(false);
  };



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://appsail-50036846539.development.catalystappsail.in/users");
        setUsers(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  const user = users.length > 0 ? users[0] : { Name: "", Email: "" };
  const firstLetter = user.Name ? user.Name.charAt(0).toUpperCase() : "👤";

  return(
    <div className="profile-wrapper" >
      <div className="profile-button" ref={dropdownRef}>
        <div className="profile-pic" onClick={handleProfileClick}>
          {firstLetter}
        </div>
        <div className={`dropdown-menu ${isOpen ? 'active' : ''}`}>
          <div className="menu-header">
            <h3>{user.Name}</h3>
          </div>
          <div className="menu-item" onClick={handleViewProfile}>
            <span className="menu-icon"></span>
            <button>View profile</button>
          </div>
          <div className="menu-item" onClick={handleLogout}>
            <span className="menu-icon"></span>
            <button>Logout</button>
          </div>
        </div>
      </div>

      <div className={`overlay ${showProfile ? 'active' : ''}`} onClick={() => setShowProfile(false)}></div>
      
      <div className={`profile-container ${showProfile ? 'active' : ''}`}>
        <div className="close-button" onClick={() => setShowProfile(false)}>×</div>
        <div className="profile-header">
          <div className="profile-avatar">{firstLetter}</div>
        </div>
        <div className="profile-info">
          <div className="profile-field">
            <div className="profile-label">Name</div>
            <div className="profile-value">{user.Name}</div>
          </div>
          <div className="profile-field">
            <div className="profile-label">Email</div>
            <div className="profile-value">{user.Email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  
  const [menuVisible, setMenuVisible] = useState(false);
  const [show, setShowpopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMenuClick = () => setMenuVisible(!menuVisible);
  const handleCloseMenu = () => setMenuVisible(false);

  const initial = {name:{required:false}} 

  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate("/reg");
  };

  const goToNextPage2 = () => {
    navigate("/pay");
  };

  const goToNextPage3 = () => {
    navigate("/Login");
  };

  const goToNextPage4 = () => {
    navigate("/Sign");
  };

  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const homeRef = useRef(null);

  const handlepopup = () => {
    setShowpopup(!show);
  };

  const handleCloseStatus = () => {
    setShowpopup(false);
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm(
    "WARNING: Logging out will DELETE your account and all data permanently. Are you sure?"
    );
    
    if (!confirmLogout) return;

    const token = sessionStorage.getItem("authToken");
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");

    if (!token) {
      alert("No active session found");
      navigate("/Login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://appsail-50036846539.development.catalystappsail.in/delete-account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id || user._id,
          email: user.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account deleted successfully!");
        sessionStorage.clear();
        localStorage.clear();
        navigate("/Sign");
        window.location.reload();
      } else {
        alert("Error: " + (data.message || "Could not delete account"));
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Network error. Please try again.");
    }

    setLoading(false);
  };


  return (
    <div>
      <div className={`main-back ${show ? 'dimmed' : ''}`}>
        <Header
          onmenuClick={handleMenuClick}
          aboutRef={aboutRef}
          contactRef={contactRef}
          homeRef={homeRef}
          goToNextPage={goToNextPage}
          handlepopup={handlepopup}
          goToNextPage3={goToNextPage3}
          goToNextPage4={goToNextPage4}
          handleLogout={handleLogout}
        />
      </div>
      <Menubar
        visible={menuVisible}
        handleClose={handleCloseMenu}
        aboutRef={aboutRef}
        contactRef={contactRef}
        goToNextPage={goToNextPage}
        goToNextPage3={goToNextPage3}
        goToNextPage4={goToNextPage4}
      />
      <div>
        <Status 
          show={show} 
          handleClose2={handleCloseStatus}
          handlepopup={handlepopup}
          goToNextPage2={goToNextPage2}
        />
      </div>
      <div className={`main-back ${show ? 'dimmed' : ''}`}>
        <Profile handleLogout={handleLogout}/>
        </div>
    </div>
  );
}

export default App;