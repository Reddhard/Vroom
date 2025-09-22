import { useState, useEffect } from "react";
import axios from "axios";
import "./PersonalInfo.css";

//
//done
//

export function PersonalInfo() {
  const [activeTab, setActiveTab] = useState("current");
  const [userinfo, setUserinfo] = useState({
    name: "",
    phone: "",
    email: "",
    nid: "",
    role: "PASSENGER",
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    nid: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    async function fetchUser() {
      try {
        const res = await axios.get(`/api/users/${userId}`);
        setUserinfo(res.data);
        setFormData({
          name: res.data.name,
          phone: res.data.phone,
          email: res.data.email || null,
          nid: res.data.nid,
        });
      } catch (err) {
        console.error(err);
        alert("Failed to fetch user data");
      }
    }

    fetchUser();
  }, []);

  async function handleUpdate(e) {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    try {
      // Send updated info to backend using PATCH
      await axios.patch(`/api/users/${userId}`, { name: formData.name, phone: formData.phone, email: formData.email, nid: formData.nid });
      const ures = await axios.get(`/api/users/${userId}`);
      // Update local state with returned data
      setUserinfo(ures.data);

      alert("Info updated successfully!");
      setActiveTab("current");
    } catch (err) {
      console.error(err);
      alert("Failed to update info");
    }
  }

  return (
    <div className="container">
      <h1>Personal Info</h1>
      <div className="tab-buttons">
        <button
          className={activeTab === "current" ? "active" : ""}
          onClick={() => setActiveTab("current")}
        >
          Current Info
        </button>
        <button
          className={activeTab === "update" ? "active" : ""}
          onClick={() => setActiveTab("update")}
        >
          Update Info
        </button>
      </div>

      {/* Current Info Tab */}
      {activeTab === "current" && (
        <div id="currentInfo" className="tab-content active">
          <div className="info-card">
            <div className="info-row">
              <span>Full Name:</span>
              <span>{userinfo.name}</span>
            </div>
            <div className="info-row">
              <span>Phone:</span>
              <span>{userinfo.phone}</span>
            </div>
            <div className="info-row">
              <span>Email:</span>
              <span>{userinfo.email}</span>
            </div>
            <div className="info-row">
              <span>NID:</span>
              <span>{userinfo.nid}</span>
            </div>
            <div className="info-row">
              <span>Role:</span>
              <span>{userinfo.role === "RIDER" ? "RIDER" : "PASSENGER"}</span>
            </div>
          </div>
          <button
            className="btn-secondary"
            onClick={() => (window.location.href = "/account")}
          >
            Back to Account
          </button>
        </div>
      )}

      {/* Update Info Tab */}
      {activeTab === "update" && (
        <div id="updateInfo" className="tab-content active">
          <form id="updateForm" onSubmit={handleUpdate}>
            <div className="info-card">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Email (optional)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value === "" ? null : e.target.value
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>NID</label>
                <input
                  type="text"
                  name="nid"
                  value={formData.nid}
                  onChange={(e) =>
                    setFormData({ ...formData, nid: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn-primary">
              Update Info
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
