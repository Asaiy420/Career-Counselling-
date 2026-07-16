import { Link, Navigate } from "react-router-dom";
import { SaveCareerButton } from "../components/SaveCareerButton";
import { useSavedCareers } from "../hooks/useSavedCareers";

function SavedCareers() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("career-token")
      : null;
  const { savedCareers, loading, error, isSaved, toggleSave } =
    useSavedCareers();

  if (!token) {
    return <Navigate to="/register" replace />;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Saved careers</h1>
        <Link to="/dashboard" className="text-sm font-semibold text-sky-600 hover:text-sky-700">
          ← Back to dashboard
        </Link>
      </div>

      {error ? (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-20 rounded-2xl bg-slate-100" />
          ))}
        </div>
      ) : savedCareers.length ? (
        <div className="space-y-3">
          {savedCareers.map((entry) => (
            <div
              key={entry._id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
            >
              <div>
                <p className="font-semibold text-slate-900">
                  {entry.career?.title ?? entry.careerId}
                </p>
                <p className="text-sm text-slate-600">
                  {entry.career?.category ?? "Saved career"}
                </p>
              </div>
              {entry.career ? (
                <SaveCareerButton
                  career={entry.career}
                  isSaved={isSaved(entry.career._id)}
                  onToggle={toggleSave}
                />
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
          You haven't saved any careers yet.{" "}
          <Link to="/careers" className="font-semibold text-sky-600 hover:text-sky-700">
            Browse careers
          </Link>{" "}
          to get started.
        </div>
      )}
    </div>
  );
}

export default SavedCareers;
