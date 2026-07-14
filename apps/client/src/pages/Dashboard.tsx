import { useLocation, Navigate } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const userName = location.state?.userName ?? "there";

  if (!location.state?.userName) {
    return <Navigate to="/register" replace />;
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Welcome, {userName}!</h1>
      <p>Your account has been created successfully.</p>
    </div>
  );
}

export default Dashboard;
