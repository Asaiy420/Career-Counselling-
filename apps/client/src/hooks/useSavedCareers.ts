import { useEffect, useState } from "react";

const STORAGE_KEY = "savedCareers";

export function useSavedCareers() {
  const [savedCareerIds, setSavedCareerIds] = useState<string[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setSavedCareerIds(JSON.parse(raw));
      } catch {
        setSavedCareerIds([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedCareerIds));
  }, [savedCareerIds]);

  const saveCareer = (careerId: string) => {
    setSavedCareerIds((current) => {
      if (current.includes(careerId)) {
        return current;
      }
      return [...current, careerId];
    });
  };

  const removeSaved = (careerId: string) => {
    setSavedCareerIds((current) => current.filter((id) => id !== careerId));
  };

  const toggleSaved = (careerId: string) => {
    setSavedCareerIds((current) =>
      current.includes(careerId) ? current.filter((id) => id !== careerId) : [...current, careerId],
    );
  };

  return { savedCareerIds, saveCareer, removeSaved, toggleSaved };
}
