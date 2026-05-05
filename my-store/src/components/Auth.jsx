import { useState } from "react";

export default function Auth({ setUser }) {
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
      return setMessage("Mobile number must be 10 digits");
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
            onClick={() => {
              setSignup(false);
              setMessage("");
            }}
          >
            Sign In
          </span>
          <span
            className={signup ? "tab active-tab" : "tab"}
            onClick={() => {
              setSignup(true);
              setMessage("");
            }}
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
