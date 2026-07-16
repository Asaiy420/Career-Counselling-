import { Link, useLocation, Navigate } from "react-router-dom";
import { DashboardSavedCareersWidget } from "../components/DashboardSavedCareersWidget";
import { useSavedCareers } from "../hooks/useSavedCareers";

function Dashboard() {
  const location = useLocation();
  const userName = location.state?.userName ?? "there";
  const { dashboard, loading, isSaved, toggleSave } = useSavedCareers();

  if (!location.state?.userName) {
    return <Navigate to="/register" replace />;
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Welcome, {userName}!</h1>
      <p>Your account has been created successfully.</p>

      <div style={{ marginTop: "2rem", maxWidth: "480px" }}>
        <Link
          to="/recommendations"
          style={{
            display: "block",
            marginBottom: "1.5rem",
            padding: "1rem 1.25rem",
            borderRadius: "1rem",
            background: "#0f172a",
            color: "#fff",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Get personalized career recommendations →
        </Link>
        <DashboardSavedCareersWidget
          summary={dashboard}
          loading={loading}
          onToggleSave={toggleSave}
          isSaved={isSaved}
        />
      </div>
    </div>
  );
}

export default Dashboard;