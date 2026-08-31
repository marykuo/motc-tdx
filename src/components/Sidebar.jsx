import { NavLink } from "react-router";

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

export function SidebarItems() {
  return (
    <>
      <SidebarItem path="/rail/metro/station-time-table" title="捷運時刻表" />
    </>
  );
}

function Sidebar() {
  return (
    <aside>
      <HomepageLink />
      <hr />
      <SidebarItems />
    </aside>
  );
}

export default Sidebar;
