import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuChevronDown, LuUser, LuSettings, LuLogOut } from "react-icons/lu";
import { useModal } from "../../context/ModalContext";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { theme, setTheme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
    document.body.style.overflow = isSidebarOpen ? "" : "hidden";
  };

  // ✅ Handle outside click for user dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout with confirmation
  const handleLogout = () => {
    showModal({
      title: "Logout",
      message: "Are you sure you want to end your session?",
      confirmText: "Logout",
      onConfirm: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    });
  };

  return (
    <>
      <nav className="topnav">
        {/* LOGO */}
        <Link className="logo" to="/">
          <div className="logo-icon">
            <img
              src="https://www.suntec.ai/img/logo-top-header-nw.svg"
              className="logo-light"
              alt="logo"
              width={60}
            />
            <img
              src="https://www.suntec.ai/img/logo-top-header-white.svg"
              className="logo-dark"
              alt="logo"
              width={60}
            />
          </div>
        </Link>

        {/* NAV LINKS */}
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""
              }`}
          >
            Documents
          </Link>

          <Link
            to="/automation"
            className={`nav-link ${location.pathname === "/automation" ? "active" : ""
              }`}
          >
            Automation
          </Link>

          <Link
            to="/extensions"
            className={`nav-link ${location.pathname === "/extensions" ? "active" : ""
              }`}
          >
            Extensions
          </Link>

          <Link
            to="/statistics"
            className={`nav-link ${location.pathname === "/statistics" ? "active" : ""
              }`}
          >
            Statistics
          </Link>
        </div>

        {/* RIGHT SECTION */}
        <div className="nav-right">
          {/* SEARCH */}
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <img
              src="https://www.suntec.ai/img/header_search.svg"
              alt=""
              className="invert-img"
            />
          </div>

          {/* NOTIFICATION */}
          <button className="icon-btn notif">
            <img
              src="https://www.suntec.ai/img/header_notification.svg"
              alt=""
              className="invert-img"
            />
            <span className="notif-badge">2</span>
          </button>

          {/* HELP */}
          <button className="icon-btn">
            <img
              src="https://www.suntec.ai/img/header_question.svg"
              alt=""
              className="invert-img"
            />
          </button>

          {/* SETTINGS */}
          <button className={`icon-btn settings ${location.pathname === "/settings" ? "active" : ""}`} onClick={() => navigate("/settings")}>
            <img
              src="https://www.suntec.ai/img/header_setting.svg"
              alt=""
              className="invert-img"
            />
          </button>

          {/* THEME TOGGLE */}
          <button className="theme-toggle" onClick={toggleTheme}>
            <img
              src="https://www.suntec.ai/img/header_light.svg"
              className="sun-icon"
              alt=""
            />
            <img
              src="https://www.suntec.ai/img/header_dark.svg"
              className="moon-icon"
              alt=""
            />
          </button>

          {/* USER */}
          <div className="user-wrapper" ref={userMenuRef}>
            <div
              className={`user-pill ${isUserMenuOpen ? "active" : ""}`}
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <div className="user-avatar">JS</div>
              <span className="user-name">John Smith</span>
              <LuChevronDown className={`user-chevron ${isUserMenuOpen ? "rotated" : ""}`} />
            </div>

            {/* DROPDOWN MENU */}
            {isUserMenuOpen && (
              <div className="user-dropdown">
                <div className="dropdown-header">
                  <p className="user-email">john.smith@suntec.ai</p>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={() => { navigate("/profile"); setIsUserMenuOpen(false); }}>
                  <LuUser className="dropdown-icon" />
                  <span>My Profile</span>
                </button>
                <button className="dropdown-item" onClick={() => { navigate("/settings"); setIsUserMenuOpen(false); }}>
                  <LuSettings className="dropdown-icon" />
                  <span>Settings</span>
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout" onClick={handleLogout}>
                  <LuLogOut className="dropdown-icon" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>

          {/* HAMBURGER */}
          <button className="hamburger" onClick={toggleSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          id="sidebarOverlay"
          className="overlay visible"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Header;