import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { RideCard } from "../components/RideCard";
import { ContactCard } from "../components/ContactCard";
import axios from "axios";
import './Rating.css';

export function Rating() {
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);
  const [driver, setDriver] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchOngoingRide = async () => {
      try {
        const passengerId = localStorage.getItem("userId");
        if (!passengerId) return;

        // Fetch ongoing ride where this user is passenger
        const res = await axios.get(`/api/rides?passengerId=${passengerId}&status=ongoing`);
        if (res.data.length === 0) {
          alert("No ongoing ride found.");
          navigate("/");
          return;
        }

        const ongoingRide = res.data[0];
        setRide(ongoingRide);

        // Fetch driver info
        const driverRes = await axios.get(`/api/users/${ongoingRide.userId}`);
        console.log("Driver:", driverRes.data);
        setDriver(driverRes.data);
      } catch (err) {
        console.error("Failed to fetch ongoing ride or driver info", err);
      }
    };

    fetchOngoingRide();
  }, [navigate]);

  const handleSubmit = async () => {
    if (!rating) {
      alert("Please select a star rating.");
      return;
    }

    try {
      const passengerId = localStorage.getItem("userId");

      // Submit rating to DB
      await axios.post("/api/ratings", {
        rideId: ride.id,
        passengerId,
        rating: parseInt(rating, 10),
        comment: comment || ""
      });

      // Mark the ride as completed
      await axios.patch(`/api/rides/${ride.id}`, { status: "completed" });

      alert("Rating submitted successfully!");
      navigate("/"); // redirect to home after submission
    } catch (err) {
      console.error("Failed to submit rating or complete ride", err);
      alert("Failed to submit rating. Try again.");
    }
  };

  if (!ride || !driver) return null;

  return (
    <>
      <Header />

      {/* Ride Details Section */}
      <section className="track-ride-section" style={{ paddingTop: "100px" }}>
        <div className="container">
          <h1>Ride Details</h1>

          <RideCard
            ride={ride}
            showRequest={false}
            showStatus={false}
          />

          {/* Side-by-side Contact & Rating */}
          <div className="info-section">
            {/* Contact Info Card */}
            <div className="info-card contact-card">
              <ContactCard person={driver} type="Rider" />
            </div>

            {/* Rating Info Card */}
            <div className="info-card">
              <h2>Rate Your Ride</h2>
              <form className="rating-form" onSubmit={e => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="rating">Star Rating</label>
                  <select
                    id="rating"
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select rating</option>
                    <option value="5">★★★★★</option>
                    <option value="4">★★★★</option>
                    <option value="3">★★★</option>
                    <option value="2">★★</option>
                    <option value="1">★</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="comment">Comment</label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    rows="4"
                    placeholder="Write your feedback..."
                  />
                </div>

                <button type="button" className="btn-primary" onClick={handleSubmit}>
                  Submit Rating
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
