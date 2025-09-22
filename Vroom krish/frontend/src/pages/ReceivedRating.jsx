import { useState, useEffect } from "react";
import { Link } from "react-router"; // Correct import
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { RatingCard } from "../components/RatingCard";
import axios from "axios";
import "./ReceivedRating.css";

export function ReceivedRating() {
    const [ratingsData, setRatings] = useState([]);  // Renamed state variable to avoid conflict
    const passengerId = localStorage.getItem("userId"); // current user as passenger

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                if (!passengerId) return;
                const ratingRes = await axios.get(`/receiver/${passengerId}`);
                
                if (Array.isArray(ratingRes.data)) {
                    setRatings(ratingRes.data);  // Only set if data is an array
                } else {
                    console.error("API response is not an array:", ratingRes.data);
                    setRatings([]);  // Fallback to empty array if not an array
                }
            }
            catch (err) {
                console.error("Failed to fetch ratings for rides", err);
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
                        <h1>All Received Ratings</h1>
                        <Link to="/account" className="back-btn">Back to Account</Link>
                    </div>
                    <div className="rides-grid">
                        {Array.isArray(ratingsData) && ratingsData.length > 0 ? (
                            ratingsData.map((rating) => (  // Using the correct variable name
                                <RatingCard
                                    key={rating.rtId}
                                    rating={rating}
                                />
                            ))
                        ) : (
                            <p>Not rated yet.</p>  // Fallback if no ratings exist
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
