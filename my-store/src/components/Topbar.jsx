import {
  RiMenuLine,
  RiSearchLine,
  RiHeartLine,
  RiShoppingCartLine,
  RiShoppingBagLine,
  RiUserLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";

export default function Topbar({
  active,
  navItems,
  search,
  setSearch,
  wishlistCount,
  cartCount,
  navigate,
  setSidebarOpen,
  setUser,
}) {
  return (
    <header className="topbar">
      <button className="hamburger" onClick={() => setSidebarOpen(true)}>
        <RiMenuLine size={24} />
      </button>

      <div className="search-container">
        <RiSearchLine className="search-icon" />
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="topbar-logo">Cloth Cart</div>

      <nav className="topbar-nav">
        {navItems.map((item) => (
          <span
            key={item}
            className={`nav-item ${active === item ? "nav-active" : ""}`}
            onClick={() => navigate(item)}
          >
            {item}
          </span>
        ))}
      </nav>

      <div className="topbar-actions">
        <button
          className={`icon-btn ${active === "Wishlist" ? "icon-active" : ""}`}
          onClick={() => navigate("Wishlist")}
          title="Wishlist"
        >
          {wishlistCount > 0 && <span className="icon-badge">{wishlistCount}</span>}
          <RiHeartLine size={20} />
        </button>

        <button
          className={`icon-btn ${active === "Cart" ? "icon-active" : ""}`}
          onClick={() => navigate("Cart")}
          title="Cart"
        >
          {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
          <RiShoppingCartLine size={20} />
        </button>

        <button
          className={`icon-btn ${active === "Orders" ? "icon-active" : ""}`}
          onClick={() => navigate("Orders")}
          title="Orders"
        >
          <RiShoppingBagLine size={20} />
        </button>

        <button
          className={`icon-btn ${active === "Profile" ? "icon-active" : ""}`}
          onClick={() => navigate("Profile")}
          title="Profile"
        >
          <RiUserLine size={20} />
        </button>

        <button className="logout-btn" onClick={() => setUser(null)}>
          <RiLogoutBoxRLine size={15} style={{ marginRight: 6 }} />
          Logout
        </button>
      </div>
    </header>
  );
}
