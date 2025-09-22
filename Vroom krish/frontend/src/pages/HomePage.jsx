import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { RideCard } from "../components/RideCard";
import './HomePage.css';

export function HomePage() {
    const [rides, setRides] = useState([]);

    useEffect(() => {
        const fetchPendingRides = async () => {
            try {
                const res = await axios.get("/api/rides?status=pending");
                setRides(res.data);
            } catch (err) {
                console.error("Failed to fetch rides", err);
            }
        };

        fetchPendingRides();
    }, []);

    return (
        <>
            <Header />

            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">The Future of Ride-Sharing</h1>
                        <p className="hero-subtitle">Safe, reliable, and affordable rides at your fingertips.</p>
                        <div className="hero-buttons">
                            <Link to="/postride" className="modern-button">Post a Ride</Link>
                            <Link to="/findride" className="modern-button">Find a Ride</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="available-rides">
                <div className="container">
                    <div className="section-header">
                        <h2>Available Rides</h2>
                        <Link to="/findride" className="view-more">View More &rarr;</Link>
                    </div>

                    <div className="rides-grid">
                        {rides.slice(0, 3).map((ride, i) => (
                            <RideCard
                                key={i}
                                ride={ride}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
