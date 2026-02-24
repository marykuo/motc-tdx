import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import StationTimeTable from "./pages/StationTimeTable";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* 左方固定導覽列 */}
        <nav className="sidebar">
          <Sidebar />
        </nav>

        {/* 右側動態內容區 */}
        <main style={{ flex: 1, padding: "2rem" }}>
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
