import { useModal } from "../../context/ModalContext";
import { LuCircleAlert, LuX } from "react-icons/lu";

const ConfirmModal = () => {
  const { modalConfig, hideModal, handleConfirm } = useModal();
  const { isOpen, title, message, confirmText, cancelText, type } = modalConfig;

  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={hideModal}>
      <div 
        className="modal-box" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="modal-header">
          <div className="modal-title-row">
            <LuCircleAlert className="modal-icon" />
            <h2 className="modal-title">{title}</h2>
          </div>
          <button className="modal-close" onClick={hideModal}>
            <LuX />
          </button>
        </div>

        {/* CONTENT */}
        <div className="modal-body">
          <p className="modal-message">{message}</p>
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button className="modal-btn outline" onClick={hideModal}>
            {cancelText}
          </button>
          <button 
            className={`modal-btn primary ${type === 'danger' ? 'danger' : ''}`} 
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
