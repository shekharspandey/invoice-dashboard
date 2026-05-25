import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes/AppRoutes";
import { ModalProvider } from "./context/ModalContext";
import ConfirmModal from "./components/common/ConfirmModal";
import { UploadProvider } from "./context/UploadContext";
import UploadModal from "./components/common/UploadModal";

function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <UploadProvider>
          <AppRoutes />
          <ConfirmModal />
          <UploadModal />
        </UploadProvider>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;