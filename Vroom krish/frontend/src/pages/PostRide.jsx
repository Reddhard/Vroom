import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import './PostRide.css';

export function PostRide() {
    const [formData, setFormData] = useState({
        locFrom: "",
        locTo: "",
        rideTime: "",
        vehicleId: "", // Corrected field name
        fare: "", // Corrected field name
    });

    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) return;

                const userRes = await axios.get(`/api/users/${userId}`);
                const userRole = userRes.data.role;

                if (userRole.toLowerCase() === "passenger") {
                    alert("You must register a vehicle to post a ride.");
                    navigate("/register");
                    return;
                }

                const rideResp = await axios.get(`/api/ridepay/drvStatus?driverId=${userId}&status=ON_GOING`);
                if (rideResp.data.length > 0) {
                    navigate("/confirm");
                }

                const rideRes = await axios.get(`/api/ridepay/drvStatus?driverId=${userId}&status=PENDING`);
                if (rideRes.data.length > 0) {
                    navigate("/track");
                }

                const vehicleRes = await axios.get(`/api/vehicles/${userId}`);
                setVehicles(vehicleRes.data);
            } catch (err) {
                console.error("Failed to load user/vehicles", err);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.locFrom === formData.locTo) {
            alert("Departure and destination cannot be the same.");
            return;
        }

        if (!formData.locFrom || !formData.locTo || !formData.rideTime || !formData.vehicleId || !formData.fare) {
            alert("Please fill all required fields.");
            return;
        }

        try {
            const userId = localStorage.getItem("userId");
            const rideData = {
                locFrom: formData.locFrom,
                locTo: formData.locTo,
                rideTime: formData.rideTime,
                fare: formData.fare,
                vehicle: { id: formData.vehicleId },
                driver: { id: userId },
                status: "PENDING",
            };

            await axios.post("/api/ridepay", rideData);
            navigate("/track");
        } catch (err) {
            console.error(err);
            alert("Failed to post ride. Please try again.");
        }
    };

    return (
        <>
            <Header />
            <div className="post-ride-page">
                <div className="container">
                    <h1 className="page-title">Post a New Ride</h1>
                    <p className="page-subtitle">Share your journey and earn by offering a ride.</p>

                    <form className="post-ride-form" onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>From</label>
                                <input
                                    type="text"
                                    name="locFrom"
                                    value={formData.locFrom}
                                    onChange={handleChange}
                                    placeholder="Enter departure city"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>To</label>
                                <input
                                    type="text"
                                    name="locTo"
                                    value={formData.locTo}
                                    onChange={handleChange}
                                    placeholder="Enter destination city"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Date & Time</label>
                                <input
                                    type="datetime-local"
                                    name="rideTime"
                                    value={formData.rideTime}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Select Vehicle</label>
                                <select name="vehicleId" value={formData.vehicleId} onChange={handleChange} required>
                                    <option value="" disabled>Choose your vehicle</option>
                                    {vehicles.map(v => (
                                        <option key={v.id} value={v.id}>
                                            {v.model} ({v.license})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Fare</label>
                                <input
                                    type="number"
                                    name="fare"
                                    value={formData.fare}
                                    onChange={handleChange}
                                    required
                                    step="1"
                                    min="1"
                                    placeholder="Enter ride fare"
                                />
                            </div>
                        </div>

                        <button type="submit" className="modern-button">Post Ride</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
