import axios from 'axios'
import type {
  Assessment,
  AssessmentAnswer,
  Career,
  RecommendationsResponse,
  SavedCareerRecord,
} from './types'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_BASE,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export async function fetchSavedCareers() {
  const response = await api.get<{ savedCareers: SavedCareerRecord[] }>('/careers/saved')
  return response.data.savedCareers
}

export async function saveCareer(careerId: string) {
  const response = await api.post<{ saved: SavedCareerRecord }>('/careers/saved', {
    careerId,
  })
  return response.data.saved
}

export async function removeSavedCareer(careerId: string) {
  const response = await api.delete<{ removed: boolean; careerId: string }>(
    `/careers/saved/${careerId}`
  )
  return response.data
}

export async function fetchCareerById(careerId: string) {
  const response = await api.get<{ career: Career }>(`/careers/${careerId}`)
  return response.data.career
}

export async function fetchActiveAssessment() {
  const response = await api.get<{ assessment: Assessment }>('/assessments/active')
  return response.data.assessment
}

export async function submitAssessment(assessmentId: string, answers: AssessmentAnswer[]) {
  const response = await api.post<
    RecommendationsResponse & { submissionId: string }
  >('/assessments/submit', { assessmentId, answers })
  return response.data
}

export async function fetchLatestRecommendations() {
  const response = await api.get<RecommendationsResponse>('/assessments/recommendations')
  return response.data
}

export default api
