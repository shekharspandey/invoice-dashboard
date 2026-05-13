import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const isDashboardOrStats = location.pathname === "/" || location.pathname === "/statistics";

  return (
    <div id="main-app">
      <Header />

      <div className="sidebar-overlay" id="sidebarOverlay"></div>

      <div className="app">
        {isDashboardOrStats && <Sidebar />}

        <main className="main">
          <div className="main-inner" style={{ paddingLeft: isDashboardOrStats ? "20px" : "0" }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;