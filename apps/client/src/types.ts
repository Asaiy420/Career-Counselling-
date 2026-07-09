export type Career = {
  id: string
  title: string
  category: string
  description: string
  salary: string
  skills: string[]
  image?: string
}

export type SavedCareerRecord = {
  id: string
  studentId: string
  careerId: string
  createdAt: string
  career?: Career
}

export type DashboardSavedCareersSummary = {
  count: number
  recent: SavedCareerRecord[]
}

export type AuthUser = {
  id: string
  name: string
  email: string
}
