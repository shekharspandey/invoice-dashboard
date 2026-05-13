import { createContext, useContext, useState, useCallback } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
    confirmText: "Confirm",
    cancelText: "Cancel",
    type: "confirm", // 'confirm' or 'alert'
  });

  const showModal = useCallback((config) => {
    setModalConfig({
      isOpen: true,
      title: config.title || "Confirmation",
      message: config.message || "Are you sure?",
      onConfirm: config.onConfirm || null,
      confirmText: config.confirmText || "Confirm",
      cancelText: config.cancelText || "Cancel",
      type: config.type || "confirm",
    });
  }, []);

  const hideModal = useCallback(() => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const handleConfirm = useCallback(() => {
    if (modalConfig.onConfirm) {
      modalConfig.onConfirm();
    }
    hideModal();
  }, [modalConfig, hideModal]);

  return (
    <ModalContext.Provider value={{ showModal, hideModal, modalConfig, handleConfirm }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
