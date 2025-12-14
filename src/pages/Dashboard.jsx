import { useState } from "react";
import sweetsData from "../data/sweets";
import "../styles/dashboard.css";

function Dashboard() {
  const [sweets, setSweets] = useState(sweetsData);
  const [cart, setCart] = useState({});

  const addToCart = (sweet) => {
    if (sweet.stock <= 0) return;

    setCart((prev) => ({
      ...prev,
      [sweet.id]: (prev[sweet.id] || 0) + 1,
    }));

    setSweets((prev) =>
      prev.map((s) =>
        s.id === sweet.id ? { ...s, stock: s.stock - 1 } : s
      )
    );
  };

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const sweet = sweetsData.find((s) => s.id === Number(id));
    return sum + sweet.price * qty;
  }, 0);

  return (
    <div className="dashboard">
      {/* SWEETS GRID */}
      <div className="sweets-grid">
        {sweets.map((sweet) => (
          <div className="sweet-card" key={sweet.id}>
            <img src={sweet.image} alt={sweet.name} />
            <h3>{sweet.name}</h3>
            <p>₹ {sweet.price}</p>
            <p className="stock">
              Stock: {sweet.stock > 0 ? sweet.stock : "Out"}
            </p>
            <button
              disabled={sweet.stock <= 0}
              onClick={() => addToCart(sweet)}
            >
              Add
            </button>
          </div>
        ))}
      </div>

      {/* BILLING PANEL */}
      <div className="billing">
        <h2>🧾 Billing</h2>

        {Object.entries(cart).map(([id, qty]) => {
          const sweet = sweetsData.find((s) => s.id === Number(id));
          return (
            <div key={id} className="bill-row">
              <span>{sweet.name} × {qty}</span>
              <span>₹ {sweet.price * qty}</span>
            </div>
          );
        })}

        <hr />
        <h3>Total: ₹ {total}</h3>
        <button className="pay-btn">Pay</button>
      </div>
    </div>
  );
}

export default Dashboard;
