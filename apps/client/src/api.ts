import axios from 'axios'
import type { Career, DashboardSavedCareersSummary, SavedCareerRecord } from './types'

const api = axios.create({
  baseURL: 'http://localhost:4000',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('career-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export async function loginStudent(email: string, password: string) {
  const response = await api.post<{ token: string; student: { id: string; name: string; email: string } }>('/auth/login', {
    email,
    password,
  })
  localStorage.setItem('career-token', response.data.token)
  return response.data
}

export async function registerStudent(name: string, email: string, password: string) {
  const response = await api.post<{ token: string; student: { id: string; name: string; email: string } }>('/auth/register', {
    name,
    email,
    password,
  })
  localStorage.setItem('career-token', response.data.token)
  return response.data
}

export async function fetchCareers() {
  const response = await api.get<Career[]>('/careers')
  return response.data
}

export async function fetchSavedCareers() {
  const response = await api.get<SavedCareerRecord[]>('/saved-careers')
  return response.data
}

export async function saveCareer(careerId: string) {
  const response = await api.post<{ saved: boolean; record: SavedCareerRecord }>('/saved-careers', {
    careerId,
  })
  return response.data
}

export async function removeSavedCareer(careerId: string) {
  const response = await api.delete<{ removed: boolean; careerId: string }>(`/saved-careers/${careerId}`)
  return response.data
}

export async function fetchDashboardSavedCareers() {
  const response = await api.get<DashboardSavedCareersSummary>('/dashboard/saved-careers')
  return response.data
}
