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
  const activeStyle = {
    backgroundColor: "var(--color-blue-light)",
    color: "var(--color-blue)",
  };

  return (
    <NavLink
      to={path}
      className="sidebar-item"
      style={({ isActive }) => (isActive ? activeStyle : undefined)}
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
