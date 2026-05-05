import { useState } from "react";
import { RiHeartLine, RiShoppingCartLine, RiCheckLine } from "react-icons/ri";
import CartSection from "./CartSection";
import WishlistSection from "./WishlistSection";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BuyPage from "./BuyPage";
import ProductGrid from "./ProductGrid";
import OrdersSection from "./OrdersSection";
import ProfileSection from "./ProfileSection";

const menImages = Object.values(
  import.meta.glob("../assets/images/img*", { eager: true })
).map((m) => m.default);

const womenImages = Object.values(
  import.meta.glob("../assets/images/wimg*", { eager: true })
).map((m) => m.default);

const kidsImages = Object.values(
  import.meta.glob("../assets/images/kim*", { eager: true })
).map((m) => m.default);

const reviewsList = [
  "good quality",
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

export default function MainApp({ user, setUser }) {
  const [active, setActive] = useState("Home");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [buyItem, setBuyItem] = useState(null);
  const [orders, setOrders] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [address, setAddress] = useState("");

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

  const placeOrder = () => {
    if (!address.trim()) {
      showToast("Please enter address");
      return;
    }

    setOrders([...orders, { ...buyItem, orderId: Date.now() }]);
    setAddress("");
    setBuyItem(null);
    setActive("Orders");
    showToast("Order placed successfully");
  };

  const filtered = products.filter((product) => {
    const matchCategory = active === "Home" || product.category === active;
    const matchSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.desc.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  const navItems = ["Home", "Men", "Women", "Kids"];

  const sideItems = [
    { label: "Wishlist", icon: <RiHeartLine size={18} /> },
    { label: "Cart", icon: <RiShoppingCartLine size={18} /> },
    { label: "Orders", icon: <RiShoppingBagLine size={18} /> },
    { label: "Profile", icon: <RiUserLine size={18} /> },
  ];

  return (
    <div className="app-shell">
      {toast && (
        <div className="toast">
          <RiCheckLine size={16} style={{ marginRight: 8 }} />
          {toast}
        </div>
      )}

      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar
        active={active}
        navItems={navItems}
        sideItems={sideItems}
        cartCount={cart.length}
        wishlistCount={wishlist.length}
        sidebarOpen={sidebarOpen}
        navigate={navigate}
        setSidebarOpen={setSidebarOpen}
        setUser={setUser}
      />

      <Topbar
        active={active}
        navItems={navItems}
        search={search}
        setSearch={setSearch}
        wishlistCount={wishlist.length}
        cartCount={cart.length}
        navigate={navigate}
        setSidebarOpen={setSidebarOpen}
        setUser={setUser}
      />

      <main className="main-content">
        {buyItem ? (
          <BuyPage
            buyItem={buyItem}
            address={address}
            setAddress={setAddress}
            onPlaceOrder={placeOrder}
            onCancel={() => setBuyItem(null)}
          />
        ) : active === "Cart" ? (
          <CartSection
            cart={cart}
            onRemove={(id) => setCart(cart.filter((item) => item.id !== id))}
            onBuy={(item) => setBuyItem(item)}
          />
        ) : active === "Wishlist" ? (
          <WishlistSection
            wishlist={wishlist}
            onRemove={(id) => setWishlist(wishlist.filter((item) => item.id !== id))}
            onBuy={(item) => setBuyItem(item)}
          />
        ) : active === "Orders" ? (
          <OrdersSection orders={orders} />
        ) : active === "Profile" ? (
          <ProfileSection user={user} />
        ) : (
          <div className="page-section">
            {active === "Home" && (
              <div className="hero-banner">
                <h2 className="hero-text">
                  New Season. <em>New You.</em>
                </h2>
                <p>Explore the finest collections across Men, Women &amp; Kids</p>
              </div>
            )}

            <div className="section-header">
              <h2 className="section-title">
                {active === "Home" ? "All Collections" : `${active}'s Collection`}
              </h2>
              <span className="section-sub">{filtered.length} pieces</span>
            </div>

            <ProductGrid
              products={filtered}
              addToWishlist={addToWishlist}
              addToCart={addToCart}
              setBuyItem={setBuyItem}
            />
          </div>
        )}
      </main>
    </div>
  );
}
