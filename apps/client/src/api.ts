import axios from 'axios'
import type { Career, SavedCareerRecord } from './types'

export const API_BASE = import.meta.env.VITE_API_URL || 'https://skill-hive-digital.onrender.com/api'

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

export default api
