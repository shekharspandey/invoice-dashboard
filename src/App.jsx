import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes/AppRoutes";
import { ModalProvider } from "./context/ModalContext";
import ConfirmModal from "./components/common/ConfirmModal";

function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <AppRoutes />
        <ConfirmModal />
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;