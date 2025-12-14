import "./header.css";
import { useNavigate } from "react-router-dom";

function Header({ username, onSearch }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="top-header">
      <div className="logo">
        🍬 <span>Sweet Shop Management</span>
      </div>

      <input
        type="text"
        placeholder="Search sweets..."
        className="search-box"
        onChange={(e) => onSearch(e.target.value)}
      />

      <div className="profile">
        <span className="username">👤 {username}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Header;
