import { useState } from "react";
import { LuUser, LuMail, LuPhone, LuCamera, LuShield, LuBell, LuEye, LuEyeOff } from "react-icons/lu";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [showPass, setShowPass] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const togglePass = (key) => {
    setShowPass(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="profile-container">
      <div className="main-header">
        <h1 className="main-title">My Profile</h1>
      </div>

      <div className="profile-content">
        {/* Profile Sidebar/Card */}
        <div className="profile-card">
          <div className="avatar-section">
            <div className="avatar-wrapper">
              <div className="profile-avatar">JS</div>
              <button className="avatar-edit-btn">
                <LuCamera />
              </button>
            </div>
            <h2 className="profile-name">John Smith</h2>
            <p className="profile-role">Administrator</p>
          </div>

          <div className="profile-nav">
            <button 
              className={`profile-nav-item ${activeTab === "personal" ? "active" : ""}`}
              onClick={() => setActiveTab("personal")}
            >
              <LuUser className="nav-icon" />
              <span>Personal Info</span>
            </button>
            <button 
              className={`profile-nav-item ${activeTab === "security" ? "active" : ""}`}
              onClick={() => setActiveTab("security")}
            >
              <LuShield className="nav-icon" />
              <span>Security</span>
            </button>
            <button 
              className={`profile-nav-item ${activeTab === "notifications" ? "active" : ""}`}
              onClick={() => setActiveTab("notifications")}
            >
              <LuBell className="nav-icon" />
              <span>Notifications</span>
            </button>
          </div>
        </div>

        {/* Profile Details Area */}
        <div className="profile-details-card">
          {activeTab === "personal" && (
            <div className="tab-content">
              <h3 className="tab-title">Personal Information</h3>
              <p className="tab-desc">Update your personal details and how others see you.</p>

              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <div className="input-wrapper">
                    <LuUser className="input-icon" />
                    <input type="text" defaultValue="John Smith" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-wrapper">
                    <LuMail className="input-icon" />
                    <input type="email" defaultValue="john.smith@suntec.ai" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <div className="input-wrapper">
                    <LuPhone className="input-icon" />
                    <input type="tel" defaultValue="+1 (555) 000-0000" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <div className="input-wrapper">
                    <input type="text" defaultValue="New York, USA" />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button className="upload-btn">Save Changes</button>
                <button className="filter-btn">Cancel</button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="tab-content">
              <h3 className="tab-title">Security Settings</h3>
              <p className="tab-desc">Manage your password and account security.</p>

              <div className="form-stack">
                <div className="form-group">
                  <label>Current Password</label>
                  <div className="password-wrapper">
                    <input type={showPass.current ? "text" : "password"} placeholder="••••••••" />
                    <button type="button" className="password-toggle" onClick={() => togglePass("current")}>
                      {showPass.current ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <div className="password-wrapper">
                    <input type={showPass.new ? "text" : "password"} placeholder="••••••••" />
                    <button type="button" className="password-toggle" onClick={() => togglePass("new")}>
                      {showPass.new ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <div className="password-wrapper">
                    <input type={showPass.confirm ? "text" : "password"} placeholder="••••••••" />
                    <button type="button" className="password-toggle" onClick={() => togglePass("confirm")}>
                      {showPass.confirm ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button className="upload-btn">Update Password</button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="tab-content">
              <h3 className="tab-title">Notification Preferences</h3>
              <p className="tab-desc">Choose what notifications you want to receive.</p>

              <div className="notification-list">
                <div className="notif-item">
                  <div className="notif-info">
                    <h4>Email Notifications</h4>
                    <p>Receive updates about your documents via email.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notif-item">
                  <div className="notif-info">
                    <h4>Push Notifications</h4>
                    <p>Receive real-time alerts in your browser.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notif-item">
                  <div className="notif-info">
                    <h4>Weekly Summary</h4>
                    <p>A weekly digest of your workspace activity.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
