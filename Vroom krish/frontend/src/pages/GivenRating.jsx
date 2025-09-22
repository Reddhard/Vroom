import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { RatingCard } from "../components/RatingCard";
import axios from "axios";
import "./GivenRating.css";

export function GivenRating() {
    const [ratingsData, setRatings] = useState([]);
    const passengerId = localStorage.getItem("userId"); // current user as passenger

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                if (!passengerId) return;
                const ratingRes = await axios.get(`/giver/${passengerId}`);
                if (Array.isArray(ratingRes.data)) {
                    setRatings(ratingRes.data);
                } else {
                    console.error("API response is not an array:", ratingRes.data);
                    setRatings([]); // Ensure ratings is set to an empty array if data isn't an array
                }
            } catch (err) {
                console.error("Failed to fetch ratings for passenger", err);
            }
        };

        fetchRatings();
    }, [passengerId]);

    return (
        <>
            <Header />
            <div className="rides-section">
                <div className="container">
                    <div className="rides-header">
                        <h1>All Given Ratings</h1>
                        <Link to="/account" className="back-btn">Back to Account</Link>
                    </div>
                    <div className="rides-grid">
                        {Array.isArray(ratingsData) && ratingsData.length > 0 ? (
                            ratingsData.map((rating) => (
                                <RatingCard key={rating.rtId} rating={rating} />
                            ))
                        ) : (
                            <p>No ratings yet.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
