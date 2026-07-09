import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchDashboardSavedCareers, fetchSavedCareers, removeSavedCareer, saveCareer } from '../api'
import type { Career, DashboardSavedCareersSummary, SavedCareerRecord } from '../types'

export function useSavedCareers() {
  const [savedCareers, setSavedCareers] = useState<SavedCareerRecord[]>([])
  const [dashboard, setDashboard] = useState<DashboardSavedCareersSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const token = typeof window !== 'undefined' ? localStorage.getItem('career-token') : null

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const [saved, summary] = await Promise.all([fetchSavedCareers(), fetchDashboardSavedCareers()])
      setSavedCareers(saved)
      setDashboard(summary)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load saved careers')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!token) {
      setSavedCareers([])
      setDashboard(null)
      setLoading(false)
      return
    }

    void refresh()
  }, [refresh, token])

  const isSaved = useCallback(
    (careerId: string) => savedCareers.some((entry) => entry.careerId === careerId),
    [savedCareers],
  )

  const toggleSave = useCallback(async (career: Career) => {
    if (isSaved(career.id)) {
      try {
        await removeSavedCareer(career.id)
        setStatusMessage(`${career.title} removed from saved careers`)
        await refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to remove saved career')
      }
      return
    }

    try {
      await saveCareer(career.id)
      setStatusMessage(`${career.title} saved to your list`) 
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save career')
    }
  }, [isSaved, refresh])

  const remove = useCallback(async (careerId: string) => {
    try {
      await removeSavedCareer(careerId)
      setStatusMessage('Saved career removed')
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to remove saved career')
    }
  }, [refresh])

  const recent = useMemo(() => savedCareers.slice(0, 3), [savedCareers])

  return {
    savedCareers,
    recent,
    dashboard,
    loading,
    error,
    statusMessage,
    isSaved,
    toggleSave,
    remove,
    refresh,
    clearStatus: () => setStatusMessage(null),
  }
}
