import { useEffect, useState } from "react";
import { getSweets } from "../services/sweetService";

function Sweets() {
  const [sweets, setSweets] = useState([]);
  // derived filtered list will be computed from `sweets` and filter states

  const [category, setCategory] = useState("all"); // all | indian | foreign
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getSweets();
        // Normalize an internal numeric id for category mapping: use `id` if present, else use array index
        const normalized = data.map((s, i) => ({ ...s, _localId: s.id ?? i + 1 }));
        setSweets(normalized);
      } catch (err) {
        console.error("Failed to load sweets", err);
      }
    };

    fetch();
  }, []);

  const filteredList = (() => {
    let out = sweets.slice();

    if (category === "indian") {
      out = out.filter((s) => s._localId >= 1 && s._localId <= 10);
    } else if (category === "foreign") {
      out = out.filter((s) => s._localId >= 11 && s._localId <= 15);
    }

    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (!Number.isNaN(min)) out = out.filter((s) => s.price >= min);
    if (!Number.isNaN(max)) out = out.filter((s) => s.price <= max);

    if (searchName.trim() !== "") {
      const q = searchName.trim().toLowerCase();
      out = out.filter((s) => (s.name || "").toLowerCase().includes(q));
    }

    return out;
  })();

  const resetFilters = () => {
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setSearchName("");
  };

  return (
    <div>
      <h2>🍬 Available Sweets</h2>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="all">All</option>
            <option value="indian">Indian (1-10)</option>
            <option value="foreign">Foreign (11-15)</option>
          </select>
        </label>

        <label>
          Min Price:
          <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} style={{ width: 100, marginLeft: 8 }} />
        </label>

        <label>
          Max Price:
          <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} style={{ width: 100, marginLeft: 8 }} />
        </label>

        <label style={{ flex: 1 }}>
          Search Name:
          <input value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="Search sweets by name" style={{ marginLeft: 8, width: "100%" }} />
        </label>

        <button onClick={resetFilters}>Reset</button>
      </div>

      {filteredList.length === 0 ? (
        <p>No sweets match the filters.</p>
      ) : (
        filteredList.map((s, idx) => (
          <div key={s._id ?? s._localId ?? idx} style={{ border: "1px solid #ddd", padding: 8, marginBottom: 8 }}>
            <h4>{s.name}</h4>
            <p>₹{s.price} | Stock: {s.stock ?? s.quantity ?? s.available ?? "-"}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Sweets;
