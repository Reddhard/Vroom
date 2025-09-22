import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { RideCard } from "../components/RideCard";
import axios from "axios";
import './TrackRide.css';

//
//
//

export function TrackRide() {
  const [rideDetails, setRideDetails] = useState(null);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingRide = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const rideResp = await axios.get(`/api/ridepay/drvStatus?driverId=${userId}&status=ON_GOING`);
        if (rideResp.data.length > 0) {
          navigate("/confirm");
        }

        // Fetch latest pending ride
        const res = await axios.get(`/api/ridepay/drvStatus?driverId=${userId}&status=PENDING`);
        if (res.data.length === 0) {
          alert("No pending rides found.");
          navigate("/");
          return;
        }

        setRideDetails(res.data[0]);
        const rideId = res.data[0].rideId;

        // Fetch ride requests
        const reqRes = await axios.get(`/api/booking-ride/${rideId}`);
        setRequests(reqRes.data || []);
      } catch (err) {
        console.error("Failed to fetch pending ride or requests", err);
      }
    };

    fetchPendingRide();
  }, [navigate]);

  if (!rideDetails) return null;

  const handleAccept = async (acceptedRequestId) => {
    try {
      // Update the accepted request
      const acceptedRequest = requests.find(r => r.bookingId === acceptedRequestId);
      await axios.patch(`/api/booking-u/${acceptedRequestId}`, { status: "ACCEPTED" });

      // Update all other requests to rejected
      const otherRequests = requests.filter(r => r.bookingId !== acceptedRequestId);
      await Promise.all(
        otherRequests.map(r =>
          axios.patch(`/api/booking-u/${r.bookingId}`, { status: "REJECTED" })
        )
      );

      // Update ride status to ongoing
      await axios.patch(`/api/rideUpdate/${rideDetails.rideId}`, { status: "ON_GOING", rider:{id: acceptedRequest.requester.id}, locFrom: acceptedRequest.locFrom, locTo: acceptedRequest.locTo, fare: acceptedRequest.fare });

      // Navigate to confirm page with ride and accepted request
      navigate("/confirm");
    } catch (err) {
      console.error("Failed to accept request or update ride", err);
      alert("Failed to accept request. Try again.");
    }
  };


  return (
    <>
      <Header />

      {/* Ride Details Section */}
      <section className="track-ride-section" style={{ paddingTop: "100px" }}>
        <div className="container">
          <h1>Ride Details</h1>
          <RideCard
            ride={rideDetails}
            showRequest={false}
            showStatus={false}
          />
        </div>
      </section>

      {/* View Requests Section */}
      <section className="view-requests">
        <div className="container">
          <h2>View Requests</h2>
          {requests.length === 0 ? (
            <p>No requests yet.</p>
          ) : (
            requests.map(req => (
              <div key={req.bookingId} className="request-card">
                <span className="request-id">Request Id#{req.bookingId}</span>
                <span className="request-id">From : {req.locFrom}</span>
                <span className="request-id">To : {req.locTo}</span>
                <span className="request-id">Fare : {req.fare}</span>
                <button
                  className="accept-btn"
                  onClick={() => handleAccept(req.bookingId)}
                >
                  Accept
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
