import React, { useState } from "react";
import { LuChevronDown, LuSearch, LuFileText } from "react-icons/lu";

const Sidebar = () => {
  const [openQueues, setOpenQueues] = useState(true);
  const [openUsers, setOpenUsers] = useState(true);
  const [selectedQueues, setSelectedQueues] = useState(["Credit Notes", "Debit Notes", "Delivery Notes", "Pro Forma Invoices"]);
  const [selectedUsers, setSelectedUsers] = useState(["Giorgi Shartava", "Giorgi", "Joao Morais", "Test User"]);

  const queues = [
    "Credit Notes", "Debit Notes", "Delivery Notes", "Pro Forma Invoices", 
    "Purchase Orders", "Tax Invoices (EU)", "Tax Invoices (UK)", "Tax Invoices (US)"
  ];

  const users = ["Giorgi Shartava", "Giorgi", "Joao Morais", "Test User"];

  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-inner">
        {/* QUEUES SECTION */}
        <div className="sidebar-group">
          <div className="group-header" onClick={() => setOpenQueues(!openQueues)}>
            <span className="group-label">
              <LuChevronDown className={`chevron-icon ${openQueues ? "open" : ""}`} /> 
              Queues
            </span>
            <span className="select-all">Select all <span className="count">4/8</span></span>
          </div>
          
          {openQueues && (
            <div className="group-content">
              <div className="search-mini">
                <input type="text" placeholder="Search" />
                <LuSearch />
              </div>
              <div className="tree-root">
                <div className="tree-item parent has-icon">
                  <div className="item-label-group">
                    <LuFileText className="tree-icon" />
                    <span>Suntec</span>
                  </div>
                  <input type="checkbox" checked readOnly />
                </div>
                <div className="tree-children">
                  {queues.map(q => (
                    <label key={q} className="tree-item">
                      <span>{q}</span>
                      <input 
                        type="checkbox" 
                        checked={selectedQueues.includes(q)} 
                        onChange={() => {}}
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="divider-line"></div>

        {/* USERS SECTION */}
        <div className="sidebar-group">
          <div className="group-header" onClick={() => setOpenUsers(!openUsers)}>
            <span className="group-label">
              <LuChevronDown className={`chevron-icon ${openUsers ? "open" : ""}`} /> 
              Users
            </span>
            <span className="select-all">Select all <span className="count">4/4</span></span>
          </div>

          {openUsers && (
            <div className="group-content">
              <div className="search-mini">
                <input type="text" placeholder="Search" />
                <LuSearch />
              </div>
              <div className="user-list">
                {users.map(u => (
                  <label key={u} className="tree-item">
                    <span>{u}</span>
                    <input 
                      type="checkbox" 
                      checked={selectedUsers.includes(u)} 
                      onChange={() => {}}
                    />
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="divider-line"></div>

        {/* FOOTER ITEM */}
        <div className="sidebar-footer-item">
          <label className="tree-item">
            <span>Include Deleted Users</span>
            <input type="checkbox" />
          </label>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;