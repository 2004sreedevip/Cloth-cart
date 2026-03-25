import { useState } from "react";
import "./App.css";

const productsData = [
  ...Array.from({ length: 50 }, (_, i) => {
    const categories = ["Western", "Traditional", "Kurta"];
    const category = categories[i % 3];

    const westernImages = [
      "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg",
      "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
      "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg"
    ];

    const traditionalImages = [
      "https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg",
      "https://images.pexels.com/photos/1820575/pexels-photo-1820575.jpeg",
      "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg"
    ];

    const kurtaImages = [
      "https://images.pexels.com/photos/1760900/pexels-photo-1760900.jpeg",
      "https://images.pexels.com/photos/1918443/pexels-photo-1918443.jpeg",
      "https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg"
    ];

    let image;

    if (category === "Western") {
      image = westernImages[i % westernImages.length];
    } else if (category === "Traditional") {
      image = traditionalImages[i % traditionalImages.length];
    } else {
      image = kurtaImages[i % kurtaImages.length];
    }

    return {
      id: i + 1,
      name: `${category} Outfit ${i + 1}`,
      price: 800 + i * 40,
      category,
      image
    };
  })
];


function App() {
  const [user, setUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  if (!user) {
    return (
      <Auth
        setUser={setUser}
        isSignup={isSignup}
        setIsSignup={setIsSignup}
      />
    );
  }

  return <MainApp user={user} setUser={setUser} />;
}

function Auth({ setUser, isSignup, setIsSignup }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    phone: ""
  });

  const handleSubmit = () => {
    if (!form.email) return alert("Enter email");

    if (isSignup) {
      localStorage.setItem("user", JSON.stringify(form));
      setUser(form);
    } else {
      const saved = JSON.parse(localStorage.getItem("user"));
      if (saved && saved.email === form.email) {
        setUser(saved);
      } else {
        alert("User not found");
      }
    }
  };

  return (
    <div className="auth">
      <h2>{isSignup ? "Create Account" : "Sign In"}</h2>

      {isSignup && (
        <>
          <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
          <input placeholder="Age" onChange={e => setForm({...form, age: e.target.value})} />
          <input placeholder="Gender" onChange={e => setForm({...form, gender: e.target.value})} />
          <input placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} />
        </>
      )}

      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />

      <button onClick={handleSubmit}>
        {isSignup ? "Create Account" : "Sign In"}
      </button>

      <p onClick={() => setIsSignup(!isSignup)} className="link">
        {isSignup ? "Already have an account? Sign in" : "New user? Create account"}
      </p>
    </div>
  );
}

function MainApp({ user, setUser }) {
  const [view, setView] = useState("Home");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (product) => {
    const exists = cart.find(item => item.id === product.id);
    if (!exists) {
      setCart([...cart, product]);
    }
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find(item => item.id === product.id);

    if (exists) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const filteredProducts = productsData
    .filter(p => filter === "All" || p.category === filter)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="app">

      <div className="sidebar">
        <h2>Cloth Cart</h2>

        <p onClick={() => setView("Home")} className={view === "Home" ? "active-nav" : ""}>Home</p>
        <p onClick={() => setView("About")} className={view === "About" ? "active-nav" : ""}>About</p>
        <p onClick={() => setView("Cart")} className={view === "Cart" ? "active-nav" : ""}>Cart</p>
        <p onClick={() => setView("Wishlist")} className={view === "Wishlist" ? "active-nav" : ""}>Wishlist</p>
        <p onClick={() => setView("Orders")} className={view === "Orders" ? "active-nav" : ""}>My Orders</p>
        <p onClick={() => setView("Account")} className={view === "Account" ? "active-nav" : ""}>Account</p>

        <p onClick={() => setUser(null)}>Logout</p>
      </div>

      <div className="main">

        {view === "Home" && (
          <>
            <h1 className="logo">Cloth Cart</h1>

            <input
              className="search"
              placeholder="Search products..."
              onChange={e => setSearch(e.target.value)}
            />

            <div className="filters">
              {["All", "Western", "Traditional", "Kurta"].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={filter === cat ? "active-btn" : ""}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid">
              {filteredProducts.map(product => {
                const isWishlisted = wishlist.some(i => i.id === product.id);

                return (
                  <div className="card" key={product.id}>
                    <img src={product.image} alt="" />

                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                    <p>₹{product.price}</p>

                    <div className="actions">
                      <button onClick={() => addToCart(product)}>
                        Add to Cart
                      </button>

                      <button onClick={() => toggleWishlist(product)}>
                        {isWishlisted ? "Remove" : "Wishlist"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {view === "Cart" && (
          <>
            <h2>Cart</h2>
            {cart.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              <div className="grid">
                {cart.map(item => (
                  <div className="card" key={item.id}>
                    <img src={item.image} alt="" />
                    <h3>{item.name}</h3>
                    <p>₹{item.price}</p>

                    <button onClick={() =>
                      setCart(cart.filter(i => i.id !== item.id))
                    }>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {view === "Wishlist" && (
          <>
            <h2>Wishlist</h2>
            {wishlist.length === 0 ? (
              <p>No items in wishlist</p>
            ) : (
              <div className="grid">
                {wishlist.map(item => (
                  <div className="card" key={item.id}>
                    <img src={item.image} alt="" />
                    <h3>{item.name}</h3>
                    <p>₹{item.price}</p>

                    <button onClick={() => toggleWishlist(item)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {view === "Account" && (
          <div>
            <h2>User Details</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <p>Phone: {user.phone}</p>
          </div>
        )}

        {view === "About" && <p>This is a clothing store.</p>}
        {view === "Orders" && <p>No orders yet.</p>}
      </div>
    </div>
  );
}

export default App;