import { useState } from "react";
import "./App.css";

const menImages = Object.values(
  import.meta.glob("./assets/images/img*", { eager: true })
).map((m) => m.default);

const womenImages = Object.values(
  import.meta.glob("./assets/images/wimg*", { eager: true })
).map((m) => m.default);

const kidsImages = Object.values(
  import.meta.glob("./assets/images/kim*", { eager: true })
).map((m) => m.default);

const reviewsList = [
  "Very good quality",
  "Worth the price",
  "Excellent product",
  "Nice fabric",
  "Highly recommended"
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
    review: reviewsList[Math.floor(Math.random() * reviewsList.length)]
  })),
  ...womenImages.map((img) => ({
    id: id++,
    name: "Women Wear",
    price: 1500 + Math.floor(Math.random() * 3000),
    desc: "Elegant women's fashion",
    category: "Women",
    image: img,
    rating: (Math.random() * 2 + 3).toFixed(1),
    review: reviewsList[Math.floor(Math.random() * reviewsList.length)]
  })),
  ...kidsImages.map((img) => ({
    id: id++,
    name: "Kids Wear",
    price: 800 + Math.floor(Math.random() * 1500),
    desc: "Cute kids collection",
    category: "Kids",
    image: img,
    rating: (Math.random() * 2 + 3).toFixed(1),
    review: reviewsList[Math.floor(Math.random() * reviewsList.length)]
  })),
];

export default function App() {
  const [user, setUser] = useState(null);
  return !user ? <Auth setUser={setUser} /> : <MainApp user={user} setUser={setUser} />;
}

function Auth({ setUser }) {
  const [signup, setSignup] = useState(false);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleLogin = () => {
    if (!form.email) return setMessage("Email is required");
    if (!form.password) return setMessage("Password is required");
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

    setUser(form);
  };

  const handleForgot = () => {
    if (!resetEmail) return setMessage("Enter your email");
    setMessage("Password reset link sent to your email");
    setShowForgot(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>FASHION THAT <span>DEFINES YOU</span></h1>
        <p>Discover your style with the latest trends</p>
      </div>

      <div className="auth-box">
        <h2>{signup ? "Create Account" : "Login"}</h2>

        {signup && (
          <>
            <input placeholder="Username" onChange={(e)=>setForm({...form,name:e.target.value})}/>
            <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
            <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
            <input placeholder="Mobile Number" onChange={(e)=>setForm({...form,mobile:e.target.value})}/>
            <select onChange={(e)=>setForm({...form,gender:e.target.value})}>
              <option>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            <input placeholder="Age" onChange={(e)=>setForm({...form,age:e.target.value})}/>
          </>
        )}

        {!signup && !showForgot && (
          <>
            <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
            <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
          </>
        )}

        {!signup && showForgot && (
          <>
            <input
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e)=>setResetEmail(e.target.value)}
            />
            <button className="login-btn" onClick={handleForgot}>
              Send Reset Link
            </button>
          </>
        )}

        {!showForgot && (
          <button className="login-btn" onClick={signup ? handleSignup : handleLogin}>
            {signup ? "Create Account" : "Login"}
          </button>
        )}

        {message && (
          <p style={{ color: "lightgreen", textAlign: "center" }}>{message}</p>
        )}

        {!signup && !showForgot && (
          <p className="forgot" onClick={()=>setShowForgot(true)}>
            Forgot password?
          </p>
        )}

        {showForgot && (
          <p className="forgot" onClick={()=>setShowForgot(false)}>
            Back to Login
          </p>
        )}

        <p className="link" onClick={()=>{setSignup(!signup); setMessage("");}}>
          {signup ? "Already have account? Sign in" : "New user? Sign up"}
        </p>
      </div>
    </div>
  );
}

function MainApp({ user, setUser }) {
  const [active, setActive] = useState("Home");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [buyItem, setBuyItem] = useState(null);

  const filtered = products.filter(
    (p) => active === "Home" || p.category === active
  );

  return (
    <>
      <div className="navbar">
        <h2>Cloth Cart</h2>

        <div className="nav-links">
          {["Home","Men","Women","Kids","Wishlist","Cart","Orders","Profile"].map(item=>(
            <span key={item}
              onClick={()=>{setActive(item); setBuyItem(null)}}
              className={active===item ? "active-nav":""}>
              {item}
            </span>
          ))}
        </div>

        <button onClick={()=>setUser(null)}>Logout</button>
      </div>

      {buyItem && (
        <div className="buy-page">
          <div className="buy-card">
            <img src={buyItem.image}/>
            <h2>{buyItem.name}</h2>
            <p>{buyItem.desc}</p>
            <h3>₹{buyItem.price}</h3>

            <h4>Customer Reviews</h4>
            <p>Rating: {buyItem.rating} / 5</p>
            <p>{buyItem.review}</p>

            <textarea placeholder="Enter address" className="address"></textarea>

            <div className="payment">
              <label><input type="radio" name="pay"/> Cash on Delivery</label>
              <label><input type="radio" name="pay"/> UPI</label>
              <label><input type="radio" name="pay"/> Card</label>
            </div>

            <button className="place-order">Place Order</button>
            <button onClick={()=>setBuyItem(null)}>Cancel</button>
          </div>
        </div>
      )}

      {active==="Cart" && (
        <Section
          title="Cart"
          items={cart}
          onRemove={(id)=>setCart(cart.filter(i=>i.id!==id))}
          onBuy={(item)=>setBuyItem(item)}
        />
      )}

      {active==="Wishlist" && (
        <Section
          title="Wishlist"
          items={wishlist}
          onRemove={(id)=>setWishlist(wishlist.filter(i=>i.id!==id))}
        />
      )}

      {active==="Profile" && (
        <div className="profile">
          <h2>User Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Mobile: {user.mobile}</p>
          <p>Gender: {user.gender}</p>
          <p>Age: {user.age}</p>
        </div>
      )}

      {!buyItem && !["Cart","Wishlist","Profile"].includes(active) && (
        <div className="grid">
          {filtered.map(p=>(
            <div className="card" key={p.id}>
              <img src={p.image}/>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <p>₹{p.price}</p>
              <p>Rating: {p.rating} / 5</p>

              <div className="actions">
                <button onClick={()=>setCart([...cart,p])}>Cart</button>
                <button onClick={()=>setWishlist([...wishlist,p])}>Wishlist</button>
                <button onClick={()=>setBuyItem(p)}>Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function Section({ title, items, onRemove, onBuy }) {
  return (
    <div>
      <h2 style={{ padding: "20px" }}>{title}</h2>
      <div className="grid">
        {items.map(i=>(
          <div className="card" key={i.id}>
            <img src={i.image}/>
            <h3>{i.name}</h3>

            <button onClick={()=>onRemove(i.id)}>Remove</button>

            {onBuy && (
              <button onClick={()=>onBuy(i)}>Buy Now</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}