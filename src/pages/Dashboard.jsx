import { useState } from "react";

const data = [
  {
    status: "Confirmed",
    file: "invoice.pdf",
    ref: "-",
    type: "Credit Notes",
    source: "Email",
    extra: "-",
    date: "10 Mar"
  }
];

const Dashboard = () => {
  const [selectedCount, setSelectedCount] = useState(1);

  return (
    <>
      {/* HEADER */}
      <div className="main-header">
        <div className="main-title-row">
          <button className="sidebar-toggle" id="sidebarToggle">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path d="M16.0664 0H1.93359C0.86741 0 0 0.86741 0 1.93359V16.0664C0 17.1326 0.86741 18 1.93359 18H16.0664C17.1326 18 18 17.1326 18 16.0664V1.93359C18 0.86741 17.1326 0 16.0664 0Z" />
            </svg>
          </button>
          <h1 className="main-title">All Documents</h1>
        </div>

        <div className="main-actions">
          <button className="icon-btn">Search</button>
          <button className="icon-btn">View</button>
          <button className="upload-btn" id="openUpload">Upload</button>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="tablesec" style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        {/* FILTER */}
        <div className="filter-row">
          <button className="filter-btn">Add Filter</button>
        </div>

        {/* ACTION BAR */}
        <div id="actionBar" className="action-bar">
          <span id="selectedCount">{selectedCount} Selected</span>
          <div className="actions">
            <button className="btn_option">Review</button>
            <button className="btn_option">Download</button>
            <button className="btn_option">Postpone</button>
            <button className="btn_option">Label</button>
            <button className="btn_option">Move</button>
            <button className="btn_option">Re-extract</button>
            <button className="btn_option">Delete</button>
          </div>
          <button id="closeSelection">✕</button>
        </div>

        {/* TABLE */}
        <div className="table-container">
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th><input type="checkbox" className="cb" /></th>
                  <th>Status</th>
                  <th>Document Name</th>
                  <th>Details</th>
                  <th>Queue</th>
                  <th>Source</th>
                  <th>Labels</th>
                  <th>Received at</th>
                </tr>
              </thead>
              <tbody id="tableBody">
                {Array(20).fill(0).map((_, i) => (
                  <tr key={i} className={i === 0 ? "selected" : ""}>
                    <td><input type="checkbox" className="cb" checked={i === 0} /></td>
                    <td>{data[0].status}</td>
                    <td>{data[0].file}</td>
                    <td>{data[0].ref}</td>
                    <td>{data[0].type}</td>
                    <td>{data[0].source}</td>
                    <td>{data[0].extra}</td>
                    <td>{data[0].date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* BOTTOM BAR */}
          <div className="bottom-bar">
            <div className="pagination" id="pagination"></div>
            <div className="bottom-right">
              <div className="ipp-wrap">
                <span className="ipp-label">Items Per Page</span>
                <div className="ipp-select" id="ippSelect">
                  <span id="ippLabel">10</span>
                </div>
              </div>
              <button className="nav-pg-btn" id="backBtn">Back</button>
              <button className="nav-pg-btn" id="nextBtn">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* PREVIEW SIDEBAR */}
      <div id="previewSidebar" className="preview-sidebar">
        <div className="preview-content">
          <div className="preview-box">PDF Preview</div>
          <h4 id="previewName">file.pdf</h4>
          <p id="pageLength">1 Page</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;