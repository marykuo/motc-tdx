import { NavLink } from "react-router-dom";

function HomepageLink() {
  return (
    <h2>
      <NavLink to="/" className="sidebar-homepage">
        首頁
      </NavLink>
    </h2>
  );
}

function SidebarItem({ path, title }) {
  return (
    <NavLink
      to={path}
      className="sidebar-item"
      style={({ isActive }) => ({
        backgroundColor: isActive ? "#e7f3ff" : "transparent",
        color: isActive ? "#007bff" : "#555",
      })}
    >
      {title}
    </NavLink>
  );
}

function Sidebar() {
  return (
    <aside>
      <HomepageLink />
      <hr />
      <SidebarItem
        path="/motc-tdx/rail/metro/station-time-table"
        title="捷運時刻表"
      />
    </aside>
  );
}

export default Sidebar;
