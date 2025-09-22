import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./VehicleInfo.css";

//
//done
//

export function VehicleInfo() {
  const [activeTab, setActiveTab] = useState("current");
  const [vehicleinfo, setVehicleinfo] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("No user logged in.");
      return;
    }

    async function fetchUserAndVehicles() {
      try {
        const userRes = await axios.get(`/api/users/${userId}`);
        const role = userRes.data.role;
        setUserRole(role);

        if (role.toLowerCase() === "passenger") {
          navigate("/register"); // redirect passenger to register page
        } else if (role.toLowerCase() === "rider") {
          const res = await axios.get(`/api/vehicles/${userId}`);
          setVehicleinfo(Array.isArray(res.data) ? res.data : []);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user or vehicle data.");
      }
    }

    fetchUserAndVehicles();
  }, [navigate]);

  function updateVehicle(index, field, value) {
    const updated = [...vehicleinfo];
    updated[index][field] = value;
    setVehicleinfo(updated);
  }

  async function deleteVehicle(index) {
  const vehicleId = vehicleinfo[index]?.id;
  if (!vehicleId) return alert("Vehicle ID not found.");
  if (!window.confirm("Are you sure you want to delete this vehicle?")) return;

  try {
    await axios.delete(`/api/vehicles/${vehicleId}`);
    const updatedVehicles = vehicleinfo.filter((_, i) => i !== index);
    setVehicleinfo(updatedVehicles);

    // If no vehicles remain, update user role to "passenger"
    if (updatedVehicles.length === 0) {
      const userId = localStorage.getItem("userId");
      if (userId) {
        await axios.patch(`/api/users/${userId}`, { role: "PASSENGER" });
        setUserRole("PASSENGER");
        navigate("/register"); // redirect to register page
      }
    }
  } catch (err) {
    console.error(err);
    alert("Failed to delete vehicle");
  }
}


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const promises = vehicleinfo
        .filter((v) => v.id)
        .map((v) =>
          axios.patch(`/api/vUpdate/${v.id}`, { license: v.license, fitnessExpiry: v.fitnessExpiry })
        );
      await Promise.all(promises);
      alert("Vehicles updated successfully!");
      setActiveTab("current");
    } catch (err) {
      console.error(err);
      alert("Failed to update vehicles");
    }
  }

  if (error) return <p>{error}</p>;

  if (userRole && userRole !== "RIDER") {
    return (
      <div className="container">
        <h1>Vehicle Info</h1>
        <p>Only drivers can manage vehicles.</p>
        <button
          className="btn-secondary"
          onClick={() => (window.location.href = "/account")}
        >
          Back to Account
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Vehicle Info</h1>
      <div className="tab-buttons">
        <button
          className={activeTab === "current" ? "active" : ""}
          onClick={() => setActiveTab("current")}
        >
          Current Vehicles
        </button>
        <button
          className={activeTab === "update" ? "active" : ""}
          onClick={() => setActiveTab("update")}
        >
          Update Vehicles
        </button>
      </div>

      {activeTab === "current" && (
        <div id="currentVehicles" className="tab-content active">
          {vehicleinfo.length === 0 ? (
            <p>No vehicles added yet.</p>
          ) : (
            <div id="currentVehicleList">
              {vehicleinfo.map((v, i) => (
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
              ))}
            </div>
          )}
          <button
            className="btn-secondary"
            onClick={() => (window.location.href = "/account")}
          >
            Back to Account
          </button>
        </div>
      )}

      {activeTab === "update" && (
        <div id="updateVehicles" className="tab-content active">
          {vehicleinfo.length === 0 ? (
            <p>No vehicles to update.</p>
          ) : (
            <form id="updateVehicleForm" onSubmit={handleSubmit}>
              {vehicleinfo.map((v, i) => (
                <div key={i} className="vehicle-card">
                  <div className="form-group">
                    <label>Model</label>
                    <input type="text" value={v.model} disabled />
                  </div>
                  <div className="form-group">
                    <label>Registration Number</label>
                    <input
                      type="text"
                      value={v.license}
                      onChange={(e) => updateVehicle(i, "license", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Fitness Expiry</label>
                    <input
                      type="date"
                      value={v.fitnessExpiry}
                      onChange={(e) => updateVehicle(i, "fitnessExpiry", e.target.value)}
                    />
                  </div>
                  {/*<button
                    type="button"
                    className="btn-primary"
                    onClick={() => deleteVehicle(i)}
                  >
                    Delete Vehicle
                  </button>*/}
                </div>
              ))}
              <button type="submit" className="btn-primary">
                Update Vehicles
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
