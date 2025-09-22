import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { RideCard } from "../components/RideCard";
import { ContactCard } from "../components/ContactCard";
import axios from "axios";
import './ConfirmRide.css';

export function ConfirmRide() {
  const [ride, setRide] = useState(null);
  const [acceptedRequest, setAcceptedRequest] = useState(null);
  const [passenger, setPassenger] = useState(null);
  const [paidAmount, setPaidAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRideAndRequest = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        // Fetch latest pending ride
        const rideRes = await axios.get(`/api/rides?userId=${userId}&status=ongoing`);
        if (rideRes.data.length === 0) {
          alert("No ongoing rides found.");
          navigate("/"); // redirect to homepage if none
          return;
        }
        const latestRide = rideRes.data[0];
        setRide(latestRide);

        // Fetch accepted request for this ride
        const reqRes = await axios.get(`/api/requests?rideId=${latestRide.id}&status=accepted`);
        const acceptedReq = reqRes.data[0] || null;
        setAcceptedRequest(acceptedReq);

        // Fetch passenger info of the accepted request
        if (acceptedReq) {
          const passengerRes = await axios.get(`/api/users/${acceptedReq.userId}`);
          setPassenger(passengerRes.data);
          console.log("Passenger:", passengerRes.data);
        }
      } catch (err) {
        console.error("Failed to fetch ride, request, or passenger info", err);
      }
    };

    fetchRideAndRequest();
  }, [navigate]);

  if (!ride) return null; // or a loading spinner

  const handleConfirmPayment = async () => {
  if (paymentMethod === "mobile" && !transactionId) {
    alert("Please enter transaction ID.");
    return;
  }

  try {
    // Update ride status and payment info
    await axios.patch(`/api/rides/${ride.id}`, {
      status: "completed",
      paidAmount,
      paymentMethod,
      transactionId
    });

    // Navigate to home after successful update
    navigate("/", {
      state: { ride, acceptedRequest, passenger, paidAmount, paymentMethod, transactionId }
    });
  } catch (err) {
    console.error("Failed to update ride payment info", err);
    alert("Payment confirmation failed. Try again.");
  }
};


  return (
    <>
      <Header />
      <section className="track-ride-section" style={{ paddingTop: "100px" }}>
        <div className="container">
          <h1>Ride Details</h1>
          <RideCard ride={ride} showRequest={false} showStatus={false} />

          {acceptedRequest && passenger && (
            <div className="info-section">
              <div className="info-card contact-card">
                <ContactCard person={passenger} type="Passenger" />
              </div>

              <div className="info-card">
                <h2>Payment Info</h2>
                <form className="payment-form">
                  <div className="form-group">
                    <label htmlFor="amount">Paid Amount</label>
                    <input
                      type="text"
                      id="amount"
                      value={paidAmount}
                      onChange={(e) => setPaidAmount(e.target.value)}
                      placeholder="Enter Paid Amount"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="payment">Payment Method</label>
                    <select
                      id="payment"
                      name="payment"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select payment method</option>
                      <option value="cash">Cash</option>
                      <option value="mobile">Mobile Banking</option>
                      <option value="other">Others</option>
                    </select>
                  </div>

                  {paymentMethod === "mobile" && (
                    <div className="form-group">
                      <label htmlFor="transaction">Transaction ID</label>
                      <input
                        type="text"
                        id="transaction"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="Enter transaction ID"
                      />
                    </div>
                  )}

                  <button type="button" className="btn-primary" onClick={handleConfirmPayment}>
  Confirm Payment
</button>

                </form>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
