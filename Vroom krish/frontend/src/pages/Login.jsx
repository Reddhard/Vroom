import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "./Login.css";

//
//done
//

export function Login() {
  const [activeTab, setActiveTab] = useState("login"); // "login" or "signup"
  const [role, setRole] = useState("PASSENGER"); // "passenger" or "both"
  const navigate = useNavigate();

  // Check if already logged in
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem("userId");
    if (savedUser && location.pathname !== "/account") {
      navigate("/account");
    }
  }, [location.pathname, navigate]);

  async function handleLoginSubmit(e) {
    e.preventDefault();

    const countryCode = e.target.countryCode.value;
    const phone = countryCode + e.target.loginPhone.value;
    const password = e.target.loginPassword.value;

    try {
      const res = await axios.get(`/api/login?phone=${phone}&password=${password}`);
      console.log(res.data);

      const user = res.data;


      //Example: backend returns { token, user }
      if (user) {
        localStorage.setItem("userId", user.id);
        navigate("/account");
      } else {
        alert("Invalid phone number or password");
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        // Server responded with error (e.g. 400, 401)
        alert(err.response.data.error || "Login failed");
      } else {
        alert("Network error");
      }
    }
  }



  async function handleSignupSubmit(e) {
    e.preventDefault();
    // Accessing form values and checking if each field has a value
  const countryCode = e.target.countryCode ? e.target.countryCode.value : null;
  const phone = countryCode && e.target.phone ? countryCode + e.target.phone.value : null;
  const confirmPassword = e.target.confirmPassword ? e.target.confirmPassword.value : null;

  // Prepare newUser object with null checks
  const newUser = {
    name: e.target.fullName ? e.target.fullName.value.trim() || null : null,
    phone: phone,
    mail: e.target.email ? e.target.email.value.trim() || null : null,
    nid: e.target.nid ? e.target.nid.value.trim() || null : null,
    password: e.target.password ? e.target.password.value.trim() || null : null,
    role: role,
  };

  // Prepare newVehicle object with null checks
  const newVehicle = {
    owner: { id: "" },  // The ID will be updated after user creation
    model: e.target.vehicleModel ? e.target.vehicleModel.value.trim() || null : null,
    license: e.target.licenseNo ? e.target.licenseNo.value.trim() || null : null,
    fitnessExpiry: e.target.fitnessExpiry ? e.target.fitnessExpiry.value || null : null,
  };

    if (newUser.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("/api/signup", newUser);
      if (newUser.role === "RIDER") {
        const ures = await axios.get(`/api/login?phone=${newUser.phone}&password=${newUser.password}`);
        newVehicle.owner.id = ures.data.id;
        await axios.post("/api/vehicle", newVehicle);
      }

      const createdUser = res.data;
      localStorage.setItem("userId", createdUser.id);

      navigate("/account");
    } catch (err) {
      console.error(err);
      if (err.response) {
        alert(err.response.data.error || "Signup failed");
      } else {
        alert("Network error");
      }
    }
  }


  return (
    <>
      <Header />
      <section className="auth-section">
        <div className="container">
          <div className="auth-container">
            <div className="auth-card">
              {/* Tab Buttons */}
              <div className="tab-buttons">
                <button
                  className={activeTab === "login" ? "active" : ""}
                  onClick={() => setActiveTab("login")}
                >
                  Login
                </button>
                <button
                  className={activeTab === "signup" ? "active" : ""}
                  onClick={() => setActiveTab("signup")}
                >
                  Sign Up
                </button>
              </div>

              {/* Login Form */}
              {activeTab === "login" && (
                <div id="loginForm" className="tab-content active">
                  <div className="auth-header">
                    <h2>Welcome Back</h2>
                    <p>Log in to continue sharing rides</p>
                  </div>
                  <form onSubmit={handleLoginSubmit}>
                    <div className="form-group phone-input-group">
                      <label htmlFor="loginPhone">Phone Number</label>
                      <div className="phone-input-wrapper">
                        <select name="countryCode" id="countryCode" defaultValue="880">
                          <option value="880">+880</option>
                        </select>
                        <input
                          type="tel"
                          id="loginPhone"
                          name="loginPhone"
                          placeholder="1XXX-XXXXXX"
                          required
                        />
                      </div>
                    </div>


                    <div className="form-group">
                      <label htmlFor="loginPassword">Password</label>
                      <input type="password" id="loginPassword" name="loginPassword" required />
                    </div>
                    <button type="submit" className="btn-primary">
                      Login
                    </button>
                  </form>
                  <p style={{ marginTop: "1rem" }}>
                    Don't have an account? Click Sign Up
                  </p>
                </div>
              )}

              {/* Signup Form */}
              {activeTab === "signup" && (
                <div id="signupForm" className="tab-content active">
                  <div className="auth-header">
                    <h2>Join Vroom</h2>
                    <p>Create your account to start sharing rides</p>
                  </div>
                  <form id="fullSignupForm" onSubmit={handleSignupSubmit}>
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name</label>
                      <input type="text" id="fullName" name="fullName" required />
                    </div>
                    <div className="form-group phone-input-group">
                      <label htmlFor="phone">Phone Number</label>
                      <div className="phone-input-wrapper">
                        <select name="countryCode" id="countryCode" defaultValue="880">
                          <option value="880">+880</option>
                        </select>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="1XXX-XXXXXX"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email (optional)</label>
                      <input type="email" id="email" name="email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="nid">Bangladeshi NID</label>
                      <input type="text" id="nid" name="nid" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" id="password" name="password" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input type="password" id="confirmPassword" name="confirmPassword" required />
                    </div>

                    {/* Role Radio Buttons */}
                    <div className="form-group">
                      <label>Role</label>
                      <div className="radio-group">
                        <div className="radio-option">
                          <input
                            type="radio"
                            id="passengerRole"
                            name="role"
                            value="PASSENGER"
                            checked={role === "PASSENGER"}
                            onChange={() => setRole("PASSENGER")}
                          />
                          <label htmlFor="passengerRole">PASSENGER</label>
                        </div>
                        <div className="radio-option">
                          <input
                            type="radio"
                            id="bothRole"
                            name="role"
                            value="RIDER"
                            checked={role === "RIDER"}
                            onChange={() => setRole("RIDER")}
                          />
                          <label htmlFor="bothRole">RIDER</label>
                        </div>
                      </div>
                    </div>

                    {/* Extra fields only for "both" */}
                    {role === "RIDER" && (
                      <div className="both-fields" id="bothFields">
                        <div className="form-group">
                          <label htmlFor="vehicleModel">Vehicle Model</label>
                          <input type="text" id="vehicleModel" name="vehicleModel" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="licenseNo">License Number</label>
                          <input type="text" id="licenseNo" name="licenseNo" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="fitnessExpiry">Fitness Expiry Date</label>
                          <input type="date" id="fitnessExpiry" name="fitnessExpiry" />
                        </div>
                      </div>
                    )}

                    <button type="submit" className="btn-primary">
                      Create Account
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
