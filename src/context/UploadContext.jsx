import { createContext, useContext, useState, useCallback } from "react";

const UploadContext = createContext();

export const UploadProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openUpload = useCallback(() => setIsOpen(true), []);
  const closeUpload = useCallback(() => setIsOpen(false), []);

  return (
    <UploadContext.Provider value={{ isOpen, openUpload, closeUpload }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) throw new Error("useUpload must be used within an UploadProvider");
  return context;
};
