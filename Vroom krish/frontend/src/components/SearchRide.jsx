import { useState } from "react";
import "./SearchRide.css";
import { getDate } from "../utils/DateTime";

export function RideSearch({ rides, onFilter, searchOpen, setSearchOpen }) {
  const [search, setSearch] = useState({ from: "", to: "", date: "" });

  const handleSearch = () => {
    const filtered = rides.filter(r =>
      (!search.from || r.locFrom === search.from) &&
      (!search.to || r.locTo === search.to) &&
      (!search.date || getDate(r.rideTime) === search.date)
    );
    onFilter(filtered);   // send filtered rides back to parent
    setSearchOpen(false);
  };

  return (
    <>
      <div className={`search-menu ${searchOpen ? "active" : ""}`}>
        <h3>Search Rides</h3>

        <label>From</label>
        <select value={search.from} onChange={e => setSearch({ ...search, from: e.target.value })}>
          <option value="" disabled>Select departure city</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chittagong">Chittagong</option>
          <option value="Sylhet">Sylhet</option>
          <option value="Rajshahi">Rajshahi</option>
          <option value="Khulna">Khulna</option>
          <option value="Barisal">Barisal</option>
          <option value="Rangpur">Rangpur</option>
        </select>

        <label>To</label>
        <select value={search.to} onChange={e => setSearch({ ...search, to: e.target.value })}>
          <option value="" disabled>Select destination city</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chittagong">Chittagong</option>
          <option value="Sylhet">Sylhet</option>
          <option value="Rajshahi">Rajshahi</option>
          <option value="Khulna">Khulna</option>
          <option value="Barisal">Barisal</option>
          <option value="Rangpur">Rangpur</option>
        </select>

        <label>Date</label>
        <input
          type="date"
          value={search.date}
          onChange={e => setSearch({ ...search, date: e.target.value })}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Overlay */}
      <div
  className={`overlay ${searchOpen ? "active" : ""}`}
  onClick={() => setSearchOpen(false)}
></div>
    </>
  );
}
