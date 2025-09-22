import { useEffect, useState } from "react";
import axios from "axios";
import "./RideCard.css";
import { getDate, getTime } from "../utils/DateTime";

export function RideCard({ ride, onToggle, showRequest = true, showStatus = false, proposal }) {
    const [vehicle, setVehicle] = useState({});
    const [requestId, setRequestId] = useState(null);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const res = await axios.get(`/api/vehicles/${ride.vehicle.id}`);
                setVehicle(res.data);
            } catch (err) {
                console.error("Error fetching vehicle data:", err);
            }
        };

        if (ride.vehicle?.id) {
            fetchVehicle();
        }
    }, [ride.vehicle?.id]);

    useEffect(() => {
        const fetchUserRequest = async () => {
            if (!userId || !ride.rideId) return;
            try {
                const res = await axios.get(`/api/booking/rdrRide?rideId=${ride.rideId}&riderId=${userId}`);
                if (res.data.length > 0) {
                    setRequestId(res.data[0].id);
                }
            } catch (err) {
                console.error("Error fetching user request:", err);
            }
        };
        fetchUserRequest();
    }, [ride.rideId, userId]);

    const handleRequestToggle = async () => {
        if (!userId) {
            alert("Please login first.");
            return;
        }

        try {
            if (!requestId) {
                const res = await axios.post("/api/booking", {
                    ridePay: { rideId: ride.rideId },
                    requester: { id: userId },
                    driver: { id: ride.driver.id },
                    status: "PENDING",
                    locFrom: proposal?.locFrom || ride.locFrom,
                    locTo: proposal?.locTo || ride.locTo,
                    fare: proposal?.fare || ride.fare
                });
                setRequestId(res.data.bookingId);
            } else {
                await axios.delete(`/api/cancel/${requestId}`);
                setRequestId(null);
            }

            if (onToggle) onToggle();
        } catch (err) {
            console.error("Error toggling request:", err);
            alert("Failed to update request. Try again.");
        }
    };

    return (
        <div className="ride-card">
            <div className="ride-header">
                <div className="route">
                    <div className="location-dot"></div>
                    <div className="location-info">
                        <p className="location-label">From</p>
                        <p className="location-name">{ride.locFrom || "-"}</p>
                    </div>
                </div>
                <div className="route">
                    <div className="location-dot"></div>
                    <div className="location-info">
                        <p className="location-label">To</p>
                        <p className="location-name">{ride.locTo || "-"}</p>
                    </div>
                </div>
            </div>

            <div className="ride-details">
                <div className="detail-item">
                    <p className="detail-label">Date</p>
                    <p className="detail-value">{getDate(ride.rideTime) || "-"}</p>
                </div>
                <div className="detail-item">
                    <p className="detail-label">Time</p>
                    <p className="detail-value">{getTime(ride.rideTime) || "-"}</p>
                </div>
                <div className="detail-item">
                    <p className="detail-label">Vehicle</p>
                    <p className="detail-value">{vehicle?.model || "-"}</p>
                </div>
                <div className="detail-item">
                    <p className="detail-label">Fare</p>
                    <p className="detail-value price">৳{ride.fare || "-"}</p>
                </div>
            </div>

            {showStatus && (
                <div className="ride-status">
                    <p>Status: <span className={`status ${ride.status?.toLowerCase()}`}>{ride.status || "Pending"}</span></p>
                </div>
            )}

            {showRequest && (
                <button
                    className={`request-btn ${requestId ? "cancel" : ""}`}
                    onClick={handleRequestToggle}
                >
                    {requestId ? "Cancel Request" : "Send Request"}
                </button>
            )}
        </div>
    );
}
