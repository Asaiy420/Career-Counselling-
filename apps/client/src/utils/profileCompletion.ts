import type { Profile } from "../types/profile";

export function calculateCompletion(profile: Profile): number {
  const values = Object.values(profile);

  const completed = values.filter(
    (value) => value.trim() !== ""
  ).length;

  return Math.round((completed / values.length) * 100);
}