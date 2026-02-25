import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import StationTimeTable from "./pages/StationTimeTable";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Mobile Toggle Button */}
        <button className="hamburger-btn" onClick={toggleSidebar}>
          ☰
        </button>

        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div className="sidebar-overlay" onClick={closeSidebar}></div>
        )}

        {/* 左方固定導覽列 */}
        <nav className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div onClick={closeSidebar}>
            <Sidebar />
          </div>
        </nav>

        {/* 右側動態內容區 */}
        <main className="main-content">
          <Routes>
            {/* root route */}
            <Route path="/" element={<Home />} />
            {/* routes */}
            <Route
              path="/motc-tdx/rail/metro/station-time-table"
              element={<StationTimeTable />}
            />
            {/* catch-all route for undefined paths */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
