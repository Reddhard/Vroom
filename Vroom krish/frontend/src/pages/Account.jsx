import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import './Account.css';

//
//done
//

export function Account() {
    const navigate = useNavigate();
    const [userRole, setRole] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) return;
                //console.log("User ID:", userId);
                // Fetch role
                const userRes = await axios.get(`/api/users/${userId}`);
                const userRole = userRes.data.role;
                //console.log("User:", userRes.data);
                setRole(String(userRole));

            } catch (err) {
                console.error("Failed to load user", err);
            }
        };

        fetchUserData();
    }, [navigate]);

    function handleLogout() {
        localStorage.removeItem('userId');
        navigate('/login');
    }

    return (
        <>
            <Header />
            <section className="account-section">
                <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>My Account</h2>

                <div className="dashboard-grid">
                    <Link to="/personalinfo" className="card">
                        <h3>Personal Info</h3>
                        <p>View and edit your personal details</p>
                    </Link>

                    {userRole.toUpperCase() === "RIDER" && (
                        <Link to="/vehicleinfo" className="card">
                            <h3>Vehicle Info</h3>
                            <p>View your registered vehicles</p>
                        </Link>
                    )}

                    <Link to="/register" className="card">
                        <h3>Register a New Vehicle</h3>
                        <p>Add a new vehicle to your account</p>
                    </Link>

                    {userRole.toUpperCase() === "RIDER" && (
                        <Link to="/allrides" className="card">
                            <h3>All Ride Posts</h3>
                            <p>See all your posted rides</p>
                        </Link>
                    )}

                    <Link to="/allrequests" className="card">
                        <h3>All Ride Requests</h3>
                        <p>Check all ride requests you received</p>
                    </Link>

                    <Link to="/givenrating" className="card">
                        <h3>All Given Ratings</h3>
                        <p>Check all ride ratings you given</p>
                    </Link>

                    {userRole.toUpperCase() === "RIDER" && (
                        <Link to="/receivedrating" className="card">
                            <h3>All Received Rating</h3>
                            <p>Check all ride ratings you received</p>
                        </Link>
                    )}

                    <div className="card" onClick={handleLogout} style={{ cursor: "pointer" }}>
                        <h3>Logout</h3>
                        <p>Sign out from your account</p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
