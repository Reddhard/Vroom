import "./RatingCard.css";

export function RatingCard({
  rating
}) {
  //const userId = localStorage.getItem("userId");

  return (
    <div className="ride-card">
        <div className="rating-comment">
          <p>
            <strong>Rating:</strong>{" "}
            {"⭐".repeat(rating.score)}
          </p>
          <p>
            <strong>Review:</strong>{" "}
            {rating.review || "No reviews"}
          </p>
        </div>
    </div>
  );
}
