import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSearch, LuLayoutTemplate, LuPlus, LuChevronDown, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useUpload } from "../context/UploadContext";

const data = [
  { status: "To Review", file: "[SAMPLE]_credit-note.pdf", type: "Suntec > Credit Notes", date: "10 Mar 2025", statusType: "review" },
  { status: "Confirmed", file: "delivery-note.pdf", type: "Suntec > Delivery Notes", date: "10 Mar 2025", statusType: "confirmed" },
  { status: "To Review", file: "[SAMPLE]_tax_invoice_us_2.pdf", type: "Suntec > Tax Invoices (US)", date: "10 Mar 2025", statusType: "review" },
  { status: "Rejected", file: "[SAMPLE]_tax_invoice_eu.pdf", type: "Suntec > Tax Invoices (EU)", date: "10 Mar 2025", statusType: "rejected" },
  { status: "To Review", file: "[SAMPLE]_purchase_order_3.pdf", type: "Suntec > Purchase Orders", date: "10 Mar 2025", statusType: "review" },
  { status: "To Review", file: "[SAMPLE]_tax_invoice_uk_3.pdf", type: "Suntec > Tax Invoices (UK)", date: "10 Mar 2025", statusType: "review" },
  { status: "To Review", file: "[SAMPLE]_tax_invoice_us_4.pdf", type: "Suntec > Tax Invoices (US)", date: "10 Mar 2025", statusType: "review" },
  { status: "To Review", file: "[SAMPLE]_tax_invoice_eu_2.pdf", type: "Suntec > Tax Invoices (EU)", date: "10 Mar 2025", statusType: "review" },
  { status: "To Review", file: "[SAMPLE]_purchase_order_4.pdf", type: "Suntec > Purchase Orders", date: "10 Mar 2025", statusType: "review" },
  { status: "To Review", file: "[SAMPLE]_credit-note.pdf", type: "Suntec > Credit Notes", date: "10 Mar 2025", statusType: "review" },
];

const Dashboard = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [hoveredDoc, setHoveredDoc] = useState(null);
  const { openUpload } = useUpload();
  const navigate = useNavigate();

  const toggleSelectAll = () => {
    if (selectedItems.length === data.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data.map((_, i) => i));
    }
  };

  const toggleItem = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter(i => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const isAllSelected = selectedItems.length === data.length && data.length > 0;

  return (
    <>
      <style>{`

        .custom-checkbox {
          appearance: none;
          width: 16px;
          height: 16px;
          border: 1px solid var(--text-secondary);
          border-radius: 4px;
          background-color: transparent;
          cursor: pointer;
          position: relative;
          vertical-align: middle;
          transition: all 0.2s;
        }
        .custom-checkbox:checked {
          background-color: transparent;
          border-color: var(--text-primary);
        }
        .custom-checkbox:checked::after {
          content: '';
          position: absolute;
          left: 4px;
          top: 1px;
          width: 4px;
          height: 8px;
          border: solid var(--text-primary);
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        
        .status-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
        }
        /* Light mode defaults */
        .status-badge.review { background-color: #f1f5f9; color: #475569; }
        .status-badge.confirmed { background-color: #dcfce7; color: #16a34a; }
        .status-badge.rejected { background-color: #fee2e2; color: #dc2626; }

        /* Dark mode overrides */
        [data-theme="dark"] .status-badge.review { background-color: rgba(79, 70, 229, 0.2); color: #818cf8; }
        [data-theme="dark"] .status-badge.confirmed { background-color: rgba(22, 163, 74, 0.2); color: #4ade80; }
        [data-theme="dark"] .status-badge.rejected { background-color: rgba(220, 38, 38, 0.2); color: #f87171; }

        .fixed-header-table th {
          position: sticky;
          top: 0;
          background-color: var(--surface4);
          z-index: 10;
          padding: 12px 16px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border);
          text-align: left;
        }
        .fixed-header-table td {
          padding: 14px 16px;
          font-size: 13px;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border);
          background-color: var(--surface);
          transition: background-color 0.2s;
        }
        .fixed-header-table tr:hover td {
          background-color: var(--surface2);
        }
        .fixed-header-table tr.selected-row td {
          background-color: var(--surface3);
        }
        .fixed-header-table {
          width: 100%;
          border-collapse: collapse;
        }
        .th-divider {
          position: relative;
        }
        .th-divider::before {
          content: '';
          position: absolute;
          left: 0;
          top: 30%;
          height: 40%;
          width: 1px;
          background-color: var(--text-muted);
          opacity: 0.3;
        }
        .table-scroll-area {
          overflow-y: auto;
          flex: 1;
        }
        
        .pagination-area {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-top: 1px solid var(--border);
          margin-top: auto;
        }
        .page-num {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          border-radius: 6px;
          color: var(--text-secondary);
          cursor: pointer;
        }
        .page-num.active {
          background-color: var(--surface3);
          color: var(--text-primary);
          font-weight: 500;
        }
        .btn-outline-sm {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-primary);
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.2s;
        }
        .btn-outline-sm:hover {
          background: var(--surface2);
        }
        
        .upload-btn-dynamic {
          background: var(--btn1);
          color: #fff;
          border: none;
          borderRadius: 6px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 6px;
        }
        .upload-btn-dynamic:hover {
          opacity: 0.9;
        }
        
        .ipp-select-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-primary);
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .ipp-select-btn:hover {
          background: var(--surface2);
        }
      `}</style>

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="sidebar-toggle" id="sidebarToggle" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <LuLayoutTemplate size={20} color="var(--text-secondary)" />
          </button>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>All Documents</h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex' }}><LuSearch size={20} color="var(--text-secondary)" /></button>
          <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex' }}><LuLayoutTemplate size={20} color="var(--text-secondary)" /></button>
          <button className="upload-btn-dynamic" onClick={openUpload}>
            Upload
          </button>
        </div>
      </div>

      <div style={{ background: 'var(--surface)', borderRadius: '12px', display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
        {/* FILTER */}
        <div style={{ padding: '20px 20px 16px 20px', flexShrink: 0 }}>
          <button style={{
            background: 'transparent',
            border: '1px solid #CC5500',
            color: '#CC5500',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer'
          }}>
            <LuPlus size={14} /> Add Filter
          </button>
        </div>

        {/* ACTION BAR (Visible when selected) */}
        {selectedItems.length > 0 && (
          <div id="actionBar" className="action-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--surface2)', borderRadius: '8px', margin: '0 20px 16px 20px', border: '1px solid var(--border)' }}>
            <span id="selectedCount" style={{ fontWeight: '600', fontSize: '13px' }}>{selectedItems.length} Selected</span>
            <div className="actions" style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-outline-sm">Review</button>
              <button className="btn-outline-sm">Download</button>
              <button className="btn-outline-sm">Postpone</button>
              <button className="btn-outline-sm">Label</button>
              <button className="btn-outline-sm">Move</button>
              <button className="btn-outline-sm">Re-extract</button>
              <button className="btn-outline-sm" style={{ color: '#dc2626', borderColor: '#fee2e2' }}>Delete</button>
            </div>
            <button id="closeSelection" onClick={() => setSelectedItems([])} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '16px' }}>✕</button>
          </div>
        )}

        {/* TABLE SECTION */}
        <div className="table-scroll-area">
          <table className="fixed-header-table">
            <thead>
              <tr>
                <th style={{ width: '40px', paddingLeft: '20px' }}>
                  <input type="checkbox" className="custom-checkbox" checked={isAllSelected} onChange={toggleSelectAll} />
                </th>
                <th>Status</th>
                <th>Document Name</th>
                <th className="th-divider">Details</th>
                <th className="th-divider">Queue</th>
                <th className="th-divider">Source</th>
                <th className="th-divider">Labels</th>
                <th className="th-divider" style={{ paddingRight: '20px' }}>Received at</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className={selectedItems.includes(i) ? 'selected-row' : ''}>
                  <td style={{ paddingLeft: '20px' }}>
                    <input type="checkbox" className="custom-checkbox" checked={selectedItems.includes(i)} onChange={() => toggleItem(i)} />
                  </td>
                  <td>
                    <span className={`status-badge ${row.statusType}`}>
                      {row.status}
                    </span>
                  </td>
                  <td
                    onMouseEnter={() => setHoveredDoc(row)}
                    onMouseLeave={() => setHoveredDoc(null)}
                    onClick={() => navigate(`/document/${row.file.replace('.pdf', '')}`)}
                    style={{ cursor: 'pointer', position: 'relative' }}
                  >
                    {row.file}
                  </td>
                  <td></td>
                  <td>{row.type}</td>
                  <td></td>
                  <td></td>
                  <td style={{ paddingRight: '20px' }}>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="pagination-area" style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            <div className="page-num active">1</div>
            <div className="page-num">2</div>
            <div className="page-num">3</div>
            <div className="page-num">4</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              Items Per Page
              <div className="ipp-select-btn">
                100 <LuChevronDown size={14} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-outline-sm"><LuChevronLeft size={14} /> Back</button>
              <button className="btn-outline-sm">Next <LuChevronRight size={14} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* PREVIEW SIDEBAR */}
      <div id="previewSidebar" className={`preview-sidebar ${hoveredDoc ? 'active' : ''}`} style={{ pointerEvents: 'none' }}>
        <div className="preview-content">
          <div className="preview-box" style={{ overflow: 'hidden', padding: '20px', display: 'block', backgroundColor: '#fff', border: '1px solid #ccc', color: '#000' }}>
            <div style={{ color: '#00A896', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Delivery Note</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ fontSize: '8px', color: '#666' }}>
                COMPANY<br />123 Main St<br />City, ST 12345
              </div>
              <div style={{ fontSize: '8px', color: '#666', background: '#f5f5f5', padding: '10px' }}>
                <strong>Recipient</strong><br />John Doe<br />456 Second Ave<br />Other City, ST 67890
              </div>
            </div>
            <div style={{ borderBottom: '1px solid #00A896', paddingBottom: '5px', marginBottom: '10px', fontSize: '8px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
              <span>Product Code</span>
              <span>Description</span>
              <span>Quantity</span>
              <span>Price</span>
            </div>
            <div style={{ fontSize: '8px', display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
              <span>SKU-123</span>
              <span>Premium Widget</span>
              <span>2</span>
              <span>$150.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
              <div style={{ fontSize: '8px' }}>
                Sign:<br /><br />______________
              </div>
              <div style={{ fontSize: '8px' }}>
                Date:<br /><br />______________
              </div>
            </div>
          </div>
          <h4 id="previewName">{hoveredDoc ? hoveredDoc.file : 'file.pdf'}</h4>
          <p id="pageLength">1 Page</p>
        </div>
      </div>

    </>
  );
};

export default Dashboard;