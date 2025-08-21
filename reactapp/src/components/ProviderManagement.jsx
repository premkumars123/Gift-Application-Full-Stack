import React, { useEffect, useMemo, useState } from "react";
import "../styles/ProviderManagement.css";

function ProviderManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("https://8080-becebdeeecebfeacfffeefcfffbafabfbdcaeedf.premiumproject.examly.io/getAllGifts", { headers: { "Content-Type": "application/json" } })
      .then((r) => r.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      [i.name, i.giftCategories, i.specialization]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [items, query]);

  const byCategory = useMemo(() => {
    const map = new Map();
    filtered.forEach((g) => {
      const key = g.giftCategories || "Uncategorized";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(g);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="prov-container card">
      <h2>Provider Management</h2>
      <div className="prov-toolbar">
        <input
          className="prov-search"
          placeholder="Search providers by name, category, specialization"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="prov-count">Providers: {filtered.length}</div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="prov-groups">
          {byCategory.map(([cat, list]) => (
            <div className="prov-group" key={cat}>
              <h3>{cat}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Experience</th>
                    <th>Specialization</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((g, idx) => (
                    <tr key={idx}>
                      <td>{g.name}</td>
                      <td>{g.experience}</td>
                      <td>{g.specialization}</td>
                      <td>{g.phoneNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          {byCategory.length === 0 && <p>No providers found.</p>}
        </div>
      )}
    </div>
  );
}

export default ProviderManagement;


