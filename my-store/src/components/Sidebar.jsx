import { RiCloseLine, RiLogoutBoxRLine } from "react-icons/ri";

export default function Sidebar({
  active,
  cartCount,
  wishlistCount,
  sidebarOpen,
  navItems,
  sideItems,
  navigate,
  setSidebarOpen,
  setUser,
}) {
  return (
    <div className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
      <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
        <RiCloseLine size={22} />
      </button>
      <div className="sidebar-brand">Cloth Cart</div>

      <nav className="sidebar-nav">
        {[...navItems.map((l) => ({ label: l, icon: null })), ...sideItems].map(
          ({ label, icon }) => (
            <span
              key={label}
              className={`sidebar-link ${active === label ? "sidebar-active" : ""}`}
              onClick={() => navigate(label)}
            >
              <span className="sidebar-link-inner">
                {icon && <span className="sidebar-icon">{icon}</span>}
                {label}
              </span>
              {label === "Cart" && cartCount > 0 && (
                <span className="badge">{cartCount}</span>
              )}
              {label === "Wishlist" && wishlistCount > 0 && (
                <span className="badge">{wishlistCount}</span>
              )}
            </span>
          )
        )}
      </nav>

      <button className="sidebar-logout" onClick={() => setUser(null)}>
        <RiLogoutBoxRLine size={16} style={{ marginRight: 8 }} />
        Logout
      </button>
    </div>
  );
}
