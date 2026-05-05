import { useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import MainApp from "./components/MainApp";

export default function App() {
  const [user, setUser] = useState(null);

  return !user ? <Auth setUser={setUser} /> : <MainApp user={user} setUser={setUser} />;
}
