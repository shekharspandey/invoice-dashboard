import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  LuArrowLeft, LuEllipsisVertical, LuZoomIn, LuZoomOut,
  LuMaximize, LuRotateCcw, LuRotateCw, LuSearch, LuBell,
  LuCircleHelp, LuSettings, LuMoon, LuCircleCheck, LuChevronDown,
  LuChevronRight, LuSettings2, LuFileText, LuPencil, LuDownload, LuTrash2,
  LuSkipForward, LuX, LuClock
} from "react-icons/lu";

const DocumentEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [openBasic, setOpenBasic] = useState(true);
  const [openSupplier, setOpenSupplier] = useState(true);
  const [openLineItems, setOpenLineItems] = useState(false);
  const [openOthers, setOpenOthers] = useState(false);

  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const canvasRef = React.useRef(null);

  const [formData, setFormData] = useState({
    issueDate: "8/23/2025",
    customerNumber: "000-318",
    orderNumber: "000-078-356",
    docType: "Other",
    docLang: "English",
    supplierName: "Contoso Ltd",
    supplierAddress: "215 E Tasman Dr\nPo Box 65502\nSan Jose, California, 96134",
    customerName: "John Doe",
    customerAddress: "4998 Fancher Drive\nCleveland, Ohio\n44193"
  });

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.1, 2));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.1, 0.5));
  const handleRotateCcw = () => setRotation(r => r - 90);
  const handleRotateCw = () => setRotation(r => r + 90);
  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (canvasRef.current) canvasRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const displayFileName = id ? `${id}.pdf` : 'Delivery-Note.pdf';

  return (
    <div className="document-editor" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg)', color: 'var(--text-primary)', fontFamily: 'Roboto, sans-serif' }}>
      <style>{`
        .editor-topnav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 56px;
          padding: 0 20px;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .topnav-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .icon-btn-editor {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          transition: 0.2s;
        }
        .icon-btn-editor:hover {
          background: var(--surface3);
          color: var(--text-primary);
        }
        .editor-sidebar {
          width: 340px;
          background: var(--surface2);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .editor-canvas {
          flex: 1;
          background: transparent;
          overflow: auto;
          padding: 30px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }
        .pdf-page {
          width: 800px;
          height: 1050px;
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          border-radius: 4px;
          position: relative;
          color: #000;
        }
        .tool-pill {
          background: var(--surface3);
          border: 1px solid var(--border);
          border-radius: 8px;
          display: flex;
          padding: 4px;
          margin: 16px;
          justify-content: space-between;
        }
        .acc-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border);
        }
        .acc-header:hover {
          background: var(--surface3);
        }
        .acc-body {
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .field-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          font-size: 12px;
        }
        .field-label {
          color: var(--text-secondary);
          flex: 1;
          padding-top: 8px;
        }
        .field-input-wrapper {
          flex: 1.5;
          position: relative;
        }
        .field-input {
          width: 100%;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 6px 8px;
          color: var(--text-primary);
          font-size: 12px;
          outline: none;
        }
        .field-input:focus, .field-input.active {
          border-color: var(--accent);
        }
        .check-icon {
          position: absolute;
          left: -20px;
          top: 8px;
          color: #22c55e;
        }
        .bottom-bar-editor {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 16px;
          background: var(--surface2);
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .confirm-btn {
          background: var(--btn1);
          color: #fff;
          border: none;
          padding: 8px 24px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }
        
        /* OVERLAYS ON CANVAS */
        .highlight-yellow {
          background: rgba(253, 224, 71, 0.4);
          position: absolute;
        }
        .highlight-green {
          background: rgba(134, 239, 172, 0.4);
          position: absolute;
        }
        .bounding-box {
          border: 2px solid #f97316;
          position: absolute;
          background: rgba(249, 115, 22, 0.05);
        }
        .bb-handle {
          width: 6px;
          height: 6px;
          background: #f97316;
          border-radius: 50%;
          position: absolute;
        }
        .tooltip-dark {
          position: absolute;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 12px;
          color: var(--text-primary);
          font-size: 12px;
          width: 200px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          z-index: 100;
        }
      `}</style>

      {/* TOPNAV */}
      <div className="editor-topnav">
        <div className="topnav-section" style={{ flex: 1 }}>
          <button className="icon-btn-editor" onClick={() => navigate('/')}>
            <LuArrowLeft size={18} />
          </button>
          <span style={{ fontWeight: '600', fontSize: '14px', marginLeft: '8px' }}>{displayFileName}</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '12px', marginLeft: '8px' }}>1/24</span>
          <button className="icon-btn-editor" style={{ marginLeft: '8px' }}>
            <LuEllipsisVertical size={16} />
          </button>
        </div>

        <div className="topnav-section" style={{ background: 'var(--surface3)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <div style={{ padding: '0 12px', fontSize: '12px', color: 'var(--text-secondary)', borderRight: '1px solid var(--border)' }}>{Math.round(zoom * 100)}%</div>
          <button className="icon-btn-editor" style={{ width: '28px', height: '28px' }} onClick={handleZoomOut}><LuZoomOut size={14} /></button>
          <button className="icon-btn-editor" style={{ width: '28px', height: '28px' }} onClick={handleZoomIn}><LuZoomIn size={14} /></button>
          <button className="icon-btn-editor" style={{ width: '28px', height: '28px' }} onClick={handleFullScreen}><LuMaximize size={14} /></button>
          <div style={{ width: '1px', height: '16px', background: 'var(--border)', margin: '0 4px' }}></div>
          <button className="icon-btn-editor" style={{ width: '28px', height: '28px' }} onClick={handleRotateCcw}><LuRotateCcw size={14} /></button>
          <button className="icon-btn-editor" style={{ width: '28px', height: '28px' }} onClick={handleRotateCw}><LuRotateCw size={14} /></button>
        </div>

        <div className="topnav-section" style={{ flex: 1 }}>
          {/* Empty right section to keep middle controls perfectly centered */}
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* LEFT SIDEBAR */}
        <div className="editor-sidebar">
          <div className="tool-pill">
            <button className="icon-btn-editor"><LuSettings2 size={16} /></button>
            <button className="icon-btn-editor"><LuFileText size={16} /></button>
            <button className="icon-btn-editor"><LuPencil size={16} /></button>
            <button className="icon-btn-editor"><LuDownload size={16} /></button>
            <button className="icon-btn-editor"><LuTrash2 size={16} /></button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '80px' }}>
            {/* BASIC INFO */}
            <div>
              <div className="acc-header" onClick={() => setOpenBasic(!openBasic)}>
                {openBasic ? <LuChevronDown size={14} /> : <LuChevronRight size={14} />}
                Basic Information
              </div>
              {openBasic && (
                <div className="acc-body">
                  <div className="field-row">
                    <div className="field-label">Issue Date</div>
                    <div className="field-input-wrapper">
                      <LuCircleCheck size={12} className="check-icon" />
                      <input className="field-input" value={formData.issueDate} onChange={(e) => handleFieldChange("issueDate", e.target.value)} />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field-label">Customer Number</div>
                    <div className="field-input-wrapper">
                      <LuCircleCheck size={12} className="check-icon" />
                      <input className="field-input" value={formData.customerNumber} onChange={(e) => handleFieldChange("customerNumber", e.target.value)} />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field-label">Order Number</div>
                    <div className="field-input-wrapper">
                      <input className="field-input" value={formData.orderNumber} onChange={(e) => handleFieldChange("orderNumber", e.target.value)} />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field-label">Document Type</div>
                    <div className="field-input-wrapper">
                      <select className="field-input" style={{ appearance: 'none' }} value={formData.docType} onChange={(e) => handleFieldChange("docType", e.target.value)}>
                        <option>Other</option>
                        <option>Invoice</option>
                      </select>
                      <LuChevronDown size={12} style={{ position: 'absolute', right: 8, top: 10, color: 'var(--text-secondary)', pointerEvents: 'none' }} />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field-label">Document Language</div>
                    <div className="field-input-wrapper">
                      <select className="field-input" style={{ appearance: 'none' }} value={formData.docLang} onChange={(e) => handleFieldChange("docLang", e.target.value)}>
                        <option>English</option>
                        <option>Spanish</option>
                      </select>
                      <LuChevronDown size={12} style={{ position: 'absolute', right: 8, top: 10, color: 'var(--text-secondary)', pointerEvents: 'none' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SUPPLIER & CUSTOMER */}
            <div>
              <div className="acc-header" onClick={() => setOpenSupplier(!openSupplier)}>
                {openSupplier ? <LuChevronDown size={14} /> : <LuChevronRight size={14} />}
                Supplier & Customer
              </div>
              {openSupplier && (
                <div className="acc-body">
                  <div className="field-row">
                    <div className="field-label">Supplier Name</div>
                    <div className="field-input-wrapper">
                      <input className="field-input" value={formData.supplierName} onChange={(e) => handleFieldChange("supplierName", e.target.value)} />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field-label">Supplier Address</div>
                    <div className="field-input-wrapper">
                      <LuCircleCheck size={12} className="check-icon" />
                      <textarea className="field-input active" rows={3} value={formData.supplierAddress} onChange={(e) => handleFieldChange("supplierAddress", e.target.value)} style={{ resize: 'none' }}></textarea>
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field-label">Customer Name</div>
                    <div className="field-input-wrapper">
                      <input className="field-input" value={formData.customerName} onChange={(e) => handleFieldChange("customerName", e.target.value)} />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field-label">Customer Address</div>
                    <div className="field-input-wrapper">
                      <textarea className="field-input" rows={3} value={formData.customerAddress} onChange={(e) => handleFieldChange("customerAddress", e.target.value)} style={{ resize: 'none' }}></textarea>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* LINE ITEMS */}
            <div>
              <div className="acc-header" onClick={() => setOpenLineItems(!openLineItems)}>
                {openLineItems ? <LuChevronDown size={14} /> : <LuChevronRight size={14} />}
                Line Items
              </div>
            </div>

            {/* OTHERS */}
            <div>
              <div className="acc-header" onClick={() => setOpenOthers(!openOthers)}>
                {openOthers ? <LuChevronDown size={14} /> : <LuChevronRight size={14} />}
                Others
              </div>
            </div>
          </div>

          {/* BOTTOM BAR EDITOR */}
          <div className="bottom-bar-editor">
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="icon-btn-editor"><LuEllipsisVertical size={16} /></button>
              <button className="icon-btn-editor"><LuSkipForward size={16} /></button>
              <button className="icon-btn-editor"><LuX size={16} /></button>
              <button className="icon-btn-editor"><LuClock size={16} /></button>
            </div>
            <button className="confirm-btn">Confirm</button>
          </div>
        </div>

        {/* RIGHT AREA (PDF CANVAS) */}
        <div className="editor-canvas" ref={canvasRef} style={{ background: document.fullscreenElement ? 'var(--bg)' : undefined }}>
          <div className="pdf-page" style={{ transform: `scale(${zoom}) rotate(${rotation}deg)`, transition: 'transform 0.3s ease', transformOrigin: 'top center' }}>

            <div style={{ padding: '60px' }}>
              <h1 style={{ color: '#00A896', fontSize: '56px', fontWeight: 'bold', margin: '0 0 40px 0' }}>Delivery Note</h1>
              <div style={{ borderTop: '2px solid #00A896', marginBottom: '40px' }}></div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '60px' }}>
                <div>
                  <div className="highlight-yellow" style={{ top: '232px', left: '60px', width: '110px', height: '24px' }}></div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Contoso Ltd</div>

                  {/* BOUNDING BOX FOR SUPPLIER ADDRESS */}
                  <div className="bounding-box" style={{ top: '260px', left: '56px', width: '180px', height: '65px' }}>
                    <div className="bb-handle" style={{ top: '-3px', left: '-3px' }}></div>
                    <div className="bb-handle" style={{ top: '-3px', right: '-3px' }}></div>
                    <div className="bb-handle" style={{ bottom: '-3px', left: '-3px' }}></div>
                    <div className="bb-handle" style={{ bottom: '-3px', right: '-3px' }}></div>
                  </div>

                  {/* FLOATING TOOLTIP */}
                  <div className="tooltip-dark" style={{ top: '260px', left: '250px', transform: `rotate(${-rotation}deg)` }}>
                    <div style={{ fontSize: '13px', marginBottom: '8px', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}>{formData.supplierAddress}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                      <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Supplier Address</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <LuTrash2 size={14} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
                        <LuCircleCheck size={14} color="#22c55e" style={{ cursor: 'pointer' }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '14px', color: '#444', fontStyle: 'italic', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}>
                    {formData.supplierAddress}<br />
                    Phone: (555) 555-1234
                  </div>
                </div>

                <div style={{ width: '300px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Recipient</div>
                  <div className="highlight-yellow" style={{ top: '232px', right: '235px', width: '70px', height: '20px' }}></div>
                  <div className="highlight-yellow" style={{ top: '252px', right: '140px', width: '165px', height: '40px' }}></div>

                  <div style={{ fontSize: '14px', color: '#444', fontStyle: 'italic', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}>
                    {formData.customerName}<br />
                    {formData.customerAddress}<br />
                    Phone: (214) 318-0670
                  </div>
                </div>
              </div>

              <div style={{ background: '#f4f4f5', padding: '30px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '150px', color: '#666' }}>Reference Number:</div>
                  <div>000-078-376</div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '150px', color: '#666' }}>Date:</div>
                  <div style={{ position: 'relative' }}>
                    <div className="highlight-green" style={{ top: '-2px', left: '-4px', width: '80px', height: '22px' }}></div>
                    {formData.issueDate}
                  </div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '150px', color: '#666' }}>Location:</div>
                  <div>San Jose, CA</div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '150px', color: '#666' }}>Order Number:</div>
                  <div>1 of 1</div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '150px', color: '#666' }}>Client number:</div>
                  <div style={{ position: 'relative' }}>
                    <div className="highlight-green" style={{ top: '-2px', left: '-4px', width: '65px', height: '22px' }}></div>
                    {formData.customerNumber}
                  </div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '150px', color: '#666' }}>Carrier:</div>
                  <div>Delivery company</div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '150px', color: '#666' }}>Delivery Method:</div>
                  <div>Air Freight/Courier</div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DocumentEditor;
