import { useState } from "react";
import "./App.css";

import {
  RiHeartLine,
  RiShoppingCartLine,
  RiShoppingBagLine,
  RiUserLine,
  RiMenuLine,
  RiCloseLine,
  RiStarFill,
  RiStarLine,
  RiLogoutBoxRLine,
  RiCheckLine,
  RiMapPinLine,
  RiBankCardLine,
  RiTruckLine,
} from "react-icons/ri";

/* ── Image imports ───────────────────────────────────────── */
const menImages = Object.values(
  import.meta.glob("./assets/images/img*", { eager: true })
).map((m) => m.default);

const womenImages = Object.values(
  import.meta.glob("./assets/images/wimg*", { eager: true })
).map((m) => m.default);

const kidsImages = Object.values(
  import.meta.glob("./assets/images/kim*", { eager: true })
).map((m) => m.default);

/* ── Data ────────────────────────────────────────────────── */
const reviewsList = [
  "Very good quality",
  "Worth the price",
  "Excellent product",
  "Nice fabric",
  "Highly recommended",
];

let id = 1;

const products = [
  ...menImages.map((img) => ({
    id: id++,
    name: "Men Wear",
    price: 1000 + Math.floor(Math.random() * 2000),
    desc: "Stylish men's fashion",
    category: "Men",
    image: img,
    rating: (Math.random() * 2 + 3).toFixed(1),
    review: reviewsList[Math.floor(Math.random() * reviewsList.length)],
  })),
  ...womenImages.map((img) => ({
    id: id++,
    name: "Women Wear",
    price: 1500 + Math.floor(Math.random() * 3000),
    desc: "Elegant women's fashion",
    category: "Women",
    image: img,
    rating: (Math.random() * 2 + 3).toFixed(1),
    review: reviewsList[Math.floor(Math.random() * reviewsList.length)],
  })),
  ...kidsImages.map((img) => ({
    id: id++,
    name: "Kids Wear",
    price: 800 + Math.floor(Math.random() * 1500),
    desc: "Cute kids collection",
    category: "Kids",
    image: img,
    rating: (Math.random() * 2 + 3).toFixed(1),
    review: reviewsList[Math.floor(Math.random() * reviewsList.length)],
  })),
];

/* ── Root ────────────────────────────────────────────────── */
export default function App() {
  const [user, setUser] = useState(null);
  return !user ? (
    <Auth setUser={setUser} />
  ) : (
    <MainApp user={user} setUser={setUser} />
  );
}

/* ── Star Rating ─────────────────────────────────────────── */
function StarRating({ rating }) {
  const filled = Math.round(parseFloat(rating));
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((s) =>
        s <= filled ? (
          <RiStarFill key={s} className="star filled" />
        ) : (
          <RiStarLine key={s} className="star" />
        )
      )}
      <span className="rating-num">{rating}</span>
    </div>
  );
}

/* ── Auth ────────────────────────────────────────────────── */
function Auth({ setUser }) {
  const [signup, setSignup] = useState(false);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    if (!form.email) return setMessage("Email is required");
    if (!form.password) return setMessage("Password is required");
    setMessage("");
    setUser(form);
  };

  const handleSignup = () => {
    if (!form.name) return setMessage("Username is required");
    if (!form.email) return setMessage("Email is required");
    if (!form.password) return setMessage("Password is required");
    if (!form.mobile) return setMessage("Mobile number is required");
    if (!form.gender || form.gender === "Select Gender")
      return setMessage("Gender is required");
    if (!form.age) return setMessage("Age is required");
    if (!/^\d{10}$/.test(form.mobile))
      return setMessage("Mobile number must be exactly 10 digits");
    setMessage("");
    setUser(form);
  };

  return (
    <div className="auth-container">
      <div className="auth-overlay" />

      <div className="auth-left">
        <div className="brand-mark">CC</div>
        <h1 className="auth-headline">
          Fashion
          <br />
          <em>That Defines</em>
          <br />
          You.
        </h1>
        <p className="auth-sub">Curated collections. Timeless style.</p>
        <div className="auth-left-tags">
          <span>Men</span>
          <span>Women</span>
          <span>Kids</span>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-panel-header">
          <span
            className={!signup ? "tab active-tab" : "tab"}
            onClick={() => { setSignup(false); setMessage(""); }}
          >
            Sign In
          </span>
          <span
            className={signup ? "tab active-tab" : "tab"}
            onClick={() => { setSignup(true); setMessage(""); }}
          >
            Create Account
          </span>
        </div>

        <div className="auth-fields">
          {signup && (
            <div className="field-group">
              <input
                className="auth-input"
                placeholder="Full Name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          )}

          <div className="field-group">
            <input
              className="auth-input"
              placeholder="Email Address"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="field-group">
            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {signup && (
            <>
              <div className="field-group">
                <input
                  className="auth-input"
                  placeholder="Mobile Number"
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                />
              </div>
              <div className="field-row">
                <select
                  className="auth-input"
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                >
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <input
                  className="auth-input"
                  placeholder="Age"
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </div>
            </>
          )}

          {message && <p className="auth-message">{message}</p>}

          <button
            className="auth-btn"
            onClick={signup ? handleSignup : handleLogin}
          >
            {signup ? "Create Account" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main App ────────────────────────────────────────────── */
function MainApp({ user, setUser }) {
  const [active, setActive] = useState("Home");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [buyItem, setBuyItem] = useState(null);
  const [orders, setOrders] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const addToCart = (p) => {
    if (cart.find((i) => i.id === p.id)) return showToast("Already in cart");
    setCart([...cart, p]);
    showToast("Added to cart");
  };

  const addToWishlist = (p) => {
    if (wishlist.find((i) => i.id === p.id))
      return showToast("Already in wishlist");
    setWishlist([...wishlist, p]);
    showToast("Added to wishlist");
  };

  const navigate = (page) => {
    setActive(page);
    setBuyItem(null);
    setSidebarOpen(false);
  };

  const filtered = products.filter(
    (p) => active === "Home" || p.category === active
  );

  const navItems = ["Home", "Men", "Women", "Kids"];

  const sideItems = [
    { label: "Wishlist", icon: <RiHeartLine size={18} /> },
    { label: "Cart",     icon: <RiShoppingCartLine size={18} /> },
    { label: "Orders",   icon: <RiShoppingBagLine size={18} /> },
    { label: "Profile",  icon: <RiUserLine size={18} /> },
  ];

  return (
    <div className="app-shell">

      {/* Toast */}
      {toast && (
        <div className="toast">
          <RiCheckLine size={16} style={{ marginRight: 8 }} />
          {toast}
        </div>
      )}

      {/* Sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <button
          className="sidebar-close"
          onClick={() => setSidebarOpen(false)}
        >
          <RiCloseLine size={22} />
        </button>
        <div className="sidebar-brand">Cloth Cart</div>

        <nav className="sidebar-nav">
          {[
            ...navItems.map((l) => ({ label: l, icon: null })),
            ...sideItems,
          ].map(({ label, icon }) => (
            <span
              key={label}
              className={`sidebar-link ${active === label ? "sidebar-active" : ""}`}
              onClick={() => navigate(label)}
            >
              <span className="sidebar-link-inner">
                {icon && <span className="sidebar-icon">{icon}</span>}
                {label}
              </span>
              {label === "Cart" && cart.length > 0 && (
                <span className="badge">{cart.length}</span>
              )}
              {label === "Wishlist" && wishlist.length > 0 && (
                <span className="badge">{wishlist.length}</span>
              )}
            </span>
          ))}
        </nav>

        <button className="sidebar-logout" onClick={() => setUser(null)}>
          <RiLogoutBoxRLine size={16} style={{ marginRight: 8 }} />
          Logout
        </button>
      </div>

      {/* Top bar */}
      <header className="topbar">
        <button className="hamburger" onClick={() => setSidebarOpen(true)}>
          <RiMenuLine size={24} />
        </button>

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
            {wishlist.length > 0 && (
              <span className="icon-badge">{wishlist.length}</span>
            )}
            <RiHeartLine size={20} />
          </button>

          <button
            className={`icon-btn ${active === "Cart" ? "icon-active" : ""}`}
            onClick={() => navigate("Cart")}
            title="Cart"
          >
            {cart.length > 0 && (
              <span className="icon-badge">{cart.length}</span>
            )}
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

      <main className="main-content">

        {/* ── Buy Page ── */}
        {buyItem && (
          <div className="buy-page">
            <div className="buy-layout">
              <div className="buy-image-wrap">
                <img src={buyItem.image} alt={buyItem.name} />
              </div>
              <div className="buy-details">
                <p className="buy-category">{buyItem.category}</p>
                <h1 className="buy-name">{buyItem.name}</h1>
                <p className="buy-desc">{buyItem.desc}</p>
                <div className="buy-price">
                  &#8377;{buyItem.price.toLocaleString()}
                </div>
                <StarRating rating={buyItem.rating} />
                <p className="buy-review">"{buyItem.review}"</p>

                <div className="buy-form">
                  <label className="form-label">
                    <RiMapPinLine size={13} style={{ marginRight: 6 }} />
                    Delivery Address
                  </label>
                  <textarea
                    className="buy-address"
                    placeholder="Enter your full address..."
                  />

                  <label className="form-label">
                    <RiBankCardLine size={13} style={{ marginRight: 6 }} />
                    Payment Method
                  </label>
                  <div className="payment-options">
                    {[
                      { label: "Cash on Delivery", icon: <RiTruckLine size={15} /> },
                      { label: "UPI",              icon: <RiBankCardLine size={15} /> },
                      { label: "Card",             icon: <RiBankCardLine size={15} /> },
                    ].map(({ label, icon }) => (
                      <label key={label} className="pay-opt">
                        <input type="radio" name="pay" value={label} />
                        <span className="pay-opt-icon">{icon}</span>
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="buy-actions">
                    <button
                      className="place-btn"
                      onClick={() => {
                        setOrders([
                          ...orders,
                          { ...buyItem, orderId: Date.now() },
                        ]);
                        setBuyItem(null);
                        setActive("Orders");
                        showToast("Order placed successfully");
                      }}
                    >
                      <RiCheckLine size={16} style={{ marginRight: 8 }} />
                      Place Order
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setBuyItem(null)}
                    >
                      <RiCloseLine size={16} style={{ marginRight: 6 }} />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Cart ── */}
        {!buyItem && active === "Cart" && (
          <Section
            title="Your Cart"
            subtitle={`${cart.length} item${cart.length !== 1 ? "s" : ""}`}
            emptyIcon={<RiShoppingCartLine size={48} />}
            items={cart}
            onRemove={(id) => setCart(cart.filter((i) => i.id !== id))}
            onBuy={(item) => setBuyItem(item)}
          />
        )}

        {/* ── Wishlist ── */}
        {!buyItem && active === "Wishlist" && (
          <Section
            title="Wishlist"
            subtitle={`${wishlist.length} saved item${wishlist.length !== 1 ? "s" : ""}`}
            emptyIcon={<RiHeartLine size={48} />}
            items={wishlist}
            onRemove={(id) =>
              setWishlist(wishlist.filter((i) => i.id !== id))
            }
            onBuy={(item) => setBuyItem(item)}
          />
        )}

        {/* ── Orders ── */}
        {!buyItem && active === "Orders" && (
          <div className="page-section">
            <div className="section-header">
              <h2 className="section-title">Your Orders</h2>
              <span className="section-sub">
                {orders.length} order{orders.length !== 1 ? "s" : ""}
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <RiShoppingBagLine size={48} />
                </div>
                <p>No orders yet. Start shopping!</p>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((o) => (
                  <div key={o.orderId} className="order-card">
                    <img src={o.image} alt={o.name} />
                    <div className="order-info">
                      <p className="order-name">{o.name}</p>
                      <p className="order-cat">{o.category}</p>
                      <p className="order-price">
                        &#8377;{o.price.toLocaleString()}
                      </p>
                      <span className="order-status">
                        <RiCheckLine size={12} style={{ marginRight: 4 }} />
                        Confirmed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Profile ── */}
        {!buyItem && active === "Profile" && (
          <div className="page-section">
            <div className="section-header">
              <h2 className="section-title">Profile</h2>
            </div>
            <div className="profile-card">
              <div className="profile-avatar">
                {(user.name || "U")[0].toUpperCase()}
              </div>
              <h3 className="profile-name">{user.name || "User"}</h3>
              <div className="profile-fields">
                {[
                  ["Email",  user.email],
                  ["Mobile", user.mobile],
                  ["Gender", user.gender],
                  ["Age",    user.age],
                ]
                  .filter(([, v]) => v)
                  .map(([label, value]) => (
                    <div key={label} className="profile-row">
                      <span className="profile-label">{label}</span>
                      <span className="profile-value">{value}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Product Grid ── */}
        {!buyItem &&
          !["Cart", "Wishlist", "Profile", "Orders"].includes(active) && (
            <div className="page-section">
              {active === "Home" && (
                <div className="hero-banner">
                  <h2 className="hero-text">
                    New Season. <em>New You.</em>
                  </h2>
                  <p>
                    Explore the finest collections across Men, Women &amp; Kids
                  </p>
                </div>
              )}

              <div className="section-header">
                <h2 className="section-title">
                  {active === "Home"
                    ? "All Collections"
                    : `${active}'s Collection`}
                </h2>
                <span className="section-sub">{filtered.length} pieces</span>
              </div>

              <div className="product-grid">
                {filtered.map((p) => (
                  <div className="product-card" key={p.id}>
                    <div className="product-img-wrap">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="product-img"
                      />
                      <div className="product-hover-actions">
                        <button
                          onClick={() => addToWishlist(p)}
                          title="Add to Wishlist"
                        >
                          <RiHeartLine size={17} />
                        </button>
                        <button
                          onClick={() => addToCart(p)}
                          title="Add to Cart"
                        >
                          <RiShoppingCartLine size={17} />
                        </button>
                      </div>
                      <span className="product-category-tag">
                        {p.category}
                      </span>
                    </div>
                    <div className="product-info">
                        <h3 className="product-name">{p.name}</h3>
                      <p className="product-desc">{p.desc}</p>
                      <StarRating rating={p.rating} />
                      <div className="product-price">
                        &#8377;{p.price.toLocaleString()}
                      </div>
                      <div className="card-actions">
                        <button
                          className="card-wishlist-btn"
                          onClick={() => addToWishlist(p)}
                          title="Add to Wishlist"
                        >
                          <RiHeartLine size={16} />
                        </button>
                        <button
                          className="card-cart-btn"
                          onClick={() => addToCart(p)}
                          title="Add to Cart"
                        >
                          <RiShoppingCartLine size={16} />
                        </button>
                        <button
                          className="buy-now-btn"
                          onClick={() => setBuyItem(p)}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </main>
    </div>
  );
}

/* ── Section (Cart / Wishlist) ───────────────────────────── */
function Section({ title, subtitle, emptyIcon, items, onRemove, onBuy }) {
  return (
    <div className="page-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <span className="section-sub">{subtitle}</span>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">{emptyIcon}</div>
          <p>Nothing here yet. Keep browsing!</p>
        </div>
      ) : (
        <div className="product-grid">
          {items.map((i) => (
            <div className="product-card" key={i.id}>
              <div className="product-img-wrap">
                <img src={i.image} alt={i.name} className="product-img" />
                <span className="product-category-tag">{i.category}</span>
              </div>
              <div className="product-info">
                <h3 className="product-name">{i.name}</h3>
                <p className="product-price">
                  &#8377;{i.price?.toLocaleString()}
                </p>
                <div className="section-card-actions">
                  {onBuy && (
                    <button
                      className="buy-now-btn"
                      onClick={() => onBuy(i)}
                    >
                      Buy Now
                    </button>
                  )}
                  <button
                    className="remove-btn"
                    onClick={() => onRemove(i.id)}
                  >
                    <RiCloseLine size={14} style={{ marginRight: 4 }} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
