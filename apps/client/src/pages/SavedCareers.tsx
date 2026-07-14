import { SavedCareersPage } from "../components/SavedCareersPage";
import { useSavedCareers } from "../hooks/useSavedCareers";

function SavedCareers() {
  const { savedCareers, loading, error, isSaved, toggleSave, remove } =
    useSavedCareers();

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <SavedCareersPage
          careers={savedCareers.map(record => ({
            ...record.career,
            createdAt: record.savedAt
          }))}
          loading={loading}
          error={error}
          onRemove={remove}
          onToggleSave={toggleSave}
          isSaved={isSaved}
        />
      </div>
    </div>
  );
}

export default SavedCareers;
