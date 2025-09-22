import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { RideCard } from "../components/RideCard";
import axios from "axios";
import "./RequestHistory.css";

export function RequestHistory() {
  const [rides, setRides] = useState([]);
  const passengerId = localStorage.getItem("userId"); // current user as passenger

  useEffect(() => {
    const fetchRides = async () => {
      try {
        if (!passengerId) return;

        // Fetch all rides for this passenger
        const res = await axios.get(`/api/rides?passengerId=${passengerId}`);
        console.log("Rides:", res.data);
        const ridesWithRatings = await Promise.all(
          res.data.map(async (ride) => {
            if (ride.status === "completed") {
              // Fetch rating for this ride
              const ratingRes = await axios.get(
                `/api/ratings?rideId=${ride.id}&passengerId=${passengerId}`
              );
              if (ratingRes.data.length > 0) {
                ride.rating = ratingRes.data[0].rating;
                ride.comment = ratingRes.data[0].comment;
              } else {
                ride.rating = null;
                ride.comment = "";
              }
            }
            return ride;
          })
        );

        setRides(ridesWithRatings);
      } catch (err) {
        console.error("Failed to fetch rides for passenger", err);
      }
    };

    fetchRides();
  }, [passengerId]);

  return (
    <>
      <Header />
      <div className="rides-section">
        <div className="container">
          <div className="rides-header">
            <h1>All Your Rides</h1>
            <Link to="/account" className="back-btn">Back to Account</Link>
          </div>
          <div className="rides-grid">
            {rides.map((ride, i) => (
              <RideCard
                key={i}
                ride={ride}
                showRequest={false}
                showStatus={true} // show ride status like pending/accepted/rejected/completed
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
