import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { RideCard } from "../components/RideCard";
import axios from "axios";
import "./RideHistory.css";

export function RideHistory() {
  const [rides, setRides] = useState([]);
  const userId = localStorage.getItem("userId"); // current user as driver

  useEffect(() => {
    const fetchRides = async () => {
      try {
        if (!userId) return;

        // Fetch all rides posted by this user (as driver)
        const res = await axios.get(`/api/ridepay/driver/${userId}`);
        setRides(res.data);
        // const ridesWithRatings = await Promise.all(
        //   res.data.map(async (ride) => {
        //     // Fetch ratings for each ride
        //     const ratingRes = await axios.get(`/api/ratings?rideId=${ride.id}`);
        //     return {
        //       ...ride,
        //       rating: ratingRes.data.length > 0 ? ratingRes.data[0].rating : null,
        //       comment: ratingRes.data.length > 0 ? ratingRes.data[0].comment : "",
        //     };
        //   })
        // );

        // setRides(ridesWithRatings);
      } catch (err) {
        console.error("Failed to fetch ride history", err);
      }
    };

    fetchRides();
  }, [userId]);

  return (
    <>
      <Header />
      <div className="rides-section">
        <div className="container">
          <div className="rides-header">
            <h1>All Ride Posts</h1>
            <Link to="/account" className="back-btn">
              Back to Account
            </Link>
          </div>
          <div className="rides-grid">
            {rides.map((r) => (
              <RideCard
                key={r.rideId}
                ride={r}
                showRequest={false}
                showStatus={true} // show status: Completed / Pending / Cancelled
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
