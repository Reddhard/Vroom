import { useState, useEffect } from "react";
import axios from "axios";
import "./RegisterVh.css";

//
//done
//

export function RegisterVh() {
  const [vehicleinfo, setVehicleinfo] = useState([]);
  const [activeTab, setActiveTab] = useState("current");
  const [newVehicle, setNewVehicle] = useState({
    owner: { id: "" },
    model: "",
    license: "",
    fitnessExpiry: "",
  });

  const userId = localStorage.getItem("userId");

  // Fetch existing vehicles on mount
  useEffect(() => {
    if (!userId) return;
    async function fetchVehicles() {
      try {
        const res = await axios.get(`/api/vehicles/${userId}`);
        setVehicleinfo(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch vehicles", err);
      }
    }
    fetchVehicles();
  }, [userId]);

  function handleInputChange(e) {
    setNewVehicle({ ...newVehicle, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (!userId) {
      alert("No user logged in.");
      return;
    }

    try {
      //newVehicle.owner = { id: userId };
      //const res = await axios.post("/api/vehicle", newVehicle);

      const vehicleData = { ...newVehicle, owner: { id: userId } };
      const res = await axios.post("/api/vehicle", vehicleData);

      setVehicleinfo([...vehicleinfo, res.data]);
      alert("Vehicle registered successfully!");
      setNewVehicle({owner: { id: "" }, model: "", license: "", fitnessExpiry: "" });
      setActiveTab("current");

      // Update user role to 'both'
      await axios.patch(`/api/users/${userId}`, { role: "RIDER" });
      localStorage.setItem("userRole");
    } catch (err) {
      console.error(err);
      alert("Failed to register vehicle or update role. Check backend connection.");
    }
  }

  return (
    <div className="container">
      <h1>Register Vehicle</h1>
      <div className="tab-buttons">
        <button
          className={activeTab === "current" ? "active" : ""}
          onClick={() => setActiveTab("current")}
        >
          Current Vehicles
        </button>
        <button
          className={activeTab === "register" ? "active" : ""}
          onClick={() => setActiveTab("register")}
        >
          Register Vehicle
        </button>
      </div>

      {activeTab === "current" && (
        <div id="currentVehicles" className="tab-content active">
          <div id="vehicleList">
            {vehicleinfo.length === 0 ? (
              <p>No vehicles registered yet.</p>
            ) : (
              vehicleinfo.map((v, i) => (
                <div key={i} className="vehicle-card">
                  <div className="vehicle-row">
                    <span>Model:</span> <span>{v.model}</span>
                  </div>
                  <div className="vehicle-row">
                    <span>Registration:</span> <span>{v.license}</span>
                  </div>
                  <div className="vehicle-row">
                    <span>Fitness Expiry:</span> <span>{v.fitnessExpiry}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          <button
            className="btn-secondary"
            onClick={() => (window.location.href = "/account")}
          >
            Back to Account
          </button>
        </div>
      )}

      {activeTab === "register" && (
        <div id="registerVehicle" className="tab-content active">
          <form id="registerVehicleForm" onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="vehicleModel">Vehicle Model</label>
              <input
                type="text"
                id="vehicleModel"
                name="model"
                value={newVehicle.model}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="vehicleReg">License / Registration Number</label>
              <input
                type="text"
                id="vehicleReg"
                name="license"
                value={newVehicle.license}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="fitnessExp">Fitness Expiry Date</label>
              <input
                type="date"
                id="fitnessExp"
                name="fitnessExpiry"
                value={newVehicle.fitnessExpiry}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Register Vehicle
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
