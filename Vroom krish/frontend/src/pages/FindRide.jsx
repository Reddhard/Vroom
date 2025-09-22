import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { RideSearch } from "../components/SearchRide";
import { RideCard } from "../components/RideCard";
import axios from "axios";
import './FindRide.css';

export function FindRide() {
    const [rides, setRides] = useState([]);
    const [filteredRides, setFilteredRides] = useState([]);
    const [proposal, setProposal] = useState({ locFrom: "", locTo: "", fare: "" });
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) return;

        const checkOngoingRide = async () => {
            try {
                const res = await axios.get(`/api/ridepay/rdrStatus?riderId=${userId}&status=ON_GOING`);
                if (res.data.length > 0) {
                    navigate("/rating");
                }
            } catch (err) {
                console.error("Failed to check ongoing ride", err);
            }
        };
        checkOngoingRide();
    }, [userId, navigate]);

    useEffect(() => {
        const fetchPendingRides = async () => {
            try {
                const res = await axios.get("/api/ridepays");
                const otherRides = res.data.filter(ride => String(ride.driver.id) !== String(userId));
                setRides(otherRides);
                setFilteredRides(otherRides);
            } catch (err) {
                console.error("Failed to fetch rides", err);
            }
        };

        fetchPendingRides();
    }, [userId]);

    useEffect(() => {
        if (!userId) return;

        const checkAcceptedRequests = async () => {
            try {
                const res = await axios.get(`/api/booking/rdrStatus?riderId=${userId}&status=ACCEPTED`);
                for (const req of res.data) {
                    const rideRes = await axios.get(`/api/ridepay/${req.rideId}`);
                    const ride = rideRes.data;
                    if (ride.status === "ON_GOING") {
                        const allReqs = await axios.get(`/api/booking/rdrStatus?riderId=${userId}&status=PENDING`);
                        for (const r of allReqs.data) {
                            if (r.bookingId !== ride.rideId && r.status === "PENDING") {
                                await axios.patch(`/api/booking-u/${r.bookingId}`, { status: "REJECTED" });
                            }
                        }
                        navigate("/rating");
                        break;
                    }
                }
            } catch (err) {
                console.error("Failed to check accepted requests", err);
            }
        };

        const interval = setInterval(checkAcceptedRequests, 3000);
        return () => clearInterval(interval);
    }, [userId, navigate]);

    const handleProposalChange = (e) => {
        const { name, value } = e.target;
        setProposal((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <Header />
            <div className="find-ride-page">
                <div className="container">
                    <h1 className="page-title">Find a Ride</h1>
                    <p className="page-subtitle">Search for available rides and propose your own terms.</p>

                    <div className="search-container">
                        <RideSearch rides={rides} onFilter={setFilteredRides} />
                    </div>

                    {!!userId && (
                        <div className="proposal-section">
                            <h2>Propose a Ride</h2>
                            <div className="proposal-form">
                                <input
                                    type="text"
                                    name="locFrom"
                                    placeholder="From"
                                    className="proposal-input"
                                    value={proposal.locFrom}
                                    onChange={handleProposalChange}
                                />
                                <input
                                    type="text"
                                    name="locTo"
                                    placeholder="To"
                                    className="proposal-input"
                                    value={proposal.locTo}
                                    onChange={handleProposalChange}
                                />
                                <input
                                    type="number"
                                    name="fare"
                                    placeholder="Proposed Fare"
                                    className="proposal-input"
                                    value={proposal.fare}
                                    onChange={handleProposalChange}
                                />
                            </div>
                        </div>
                    )}

                    <div className="rides-grid">
                        {filteredRides.map((ride) => (
                            <RideCard
                                key={ride.rideId}
                                ride={ride}
                                showRequest={!!userId}
                                showStatus={false}
                                proposal={proposal}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
