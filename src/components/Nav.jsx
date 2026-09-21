import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService.js";

export default function Nav() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout(); // backend clears the access_token cookie
    } catch {
      // Even if the call fails, send the user back to login.
    }
    navigate("/login");
  }

  return (
    <nav className="nav">
      <Link to="/messages" className="brand">
        Honestly
      </Link>
      <Link to="/messages">Inbox</Link>
      <Link to="/login">Log in</Link>
      <Link to="/register">Sign up</Link>
      <button className="secondary" onClick={handleLogout}>
        Log out
      </button>
    </nav>
  );
}
