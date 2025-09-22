import { Navigate } from "react-router";

//
//done
//

export function ProtectedRoute({ children }) {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  // Logged in → render the page
  return children;
}
