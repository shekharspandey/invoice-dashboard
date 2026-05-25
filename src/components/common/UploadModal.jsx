import { useState, useRef } from "react";
import { LuX, LuCloudUpload, LuFile } from "react-icons/lu";
import { useUpload } from "../../context/UploadContext";

const UploadModal = () => {
  const { isOpen, closeUpload } = useUpload();
  const [dragOver, setDragOver] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [invoiceDoc, setInvoiceDoc] = useState(true);
  const [erpPosting, setErpPosting] = useState(false);
  const [targetQueue, setTargetQueue] = useState("");
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    setUploadFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
  };

  const handleBrowse = (e) => {
    setUploadFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const removeFile = (idx) => {
    setUploadFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleClose = () => {
    closeUpload();
    setUploadFiles([]);
    setDragOver(false);
    setTargetQueue("");
    setInvoiceDoc(true);
    setErpPosting(false);
  };

  return (
    <div className="modal-overlay active" onClick={handleClose}>
      <div
        className="upload-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title" style={{ fontSize: "18px" }}>Upload Files</h2>
          <button className="modal-close" onClick={handleClose}><LuX /></button>
        </div>

        {/* Drop zone */}
        <div
          className={`upload-dropzone ${dragOver ? "drag-active" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="upload-cloud-icon">
            <LuCloudUpload size={28} />
          </div>
          <p className="upload-drop-title">
            {dragOver ? "Release to drop files" : "Drag & Drop your files here"}
          </p>
          <p className="upload-drop-or">or</p>
          <button
            className="upload-browse-btn"
            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
          >
            Browse Files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={handleBrowse}
          />
        </div>

        {/* File list */}
        {uploadFiles.length > 0 && (
          <div className="upload-file-list">
            {uploadFiles.map((f, i) => (
              <div key={i} className="upload-file-item">
                <LuFile size={16} style={{ color: "#a78bfa", flexShrink: 0 }} />
                <span className="upload-file-item-name">{f.name}</span>
                <span className="upload-file-size">
                  {(f.size / 1024).toFixed(0)} KB
                </span>
                <button className="upload-file-remove" onClick={() => removeFile(i)}>
                  <LuX size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Options row */}
        <div className="upload-options-row">
          <label className="upload-check-label">
            <input
              type="checkbox"
              className="upload-checkbox"
              checked={invoiceDoc}
              onChange={(e) => setInvoiceDoc(e.target.checked)}
            />
            Invoice Document
          </label>
          <label className="upload-check-label">
            <input
              type="checkbox"
              className="upload-checkbox"
              checked={erpPosting}
              onChange={(e) => setErpPosting(e.target.checked)}
            />
            ERP Posting Required
          </label>
          <div className="upload-queue-group">
            <span className="upload-queue-label">Target Queue</span>
            <select
              className="upload-queue-select"
              value={targetQueue}
              onChange={(e) => setTargetQueue(e.target.value)}
            >
              <option value="">Select Queue</option>
              <option value="credit_notes">Credit Notes</option>
              <option value="delivery_notes">Delivery Notes</option>
              <option value="tax_invoices_us">Tax Invoices (US)</option>
              <option value="tax_invoices_eu">Tax Invoices (EU)</option>
              <option value="purchase_orders">Purchase Orders</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="upload-actions-row">
          <button className="modal-btn outline" onClick={handleClose}>Cancel</button>
          <button
            className="upload-submit-btn"
            disabled={uploadFiles.length === 0}
            onClick={handleClose}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
