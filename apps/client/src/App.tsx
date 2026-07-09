import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { fetchCareers, loginStudent, registerStudent } from './api'
import { CareerCard } from './components/CareerCard'
import { DashboardSavedCareersWidget } from './components/DashboardSavedCareersWidget'
import { SavedCareersPage } from './components/SavedCareersPage'
import { SaveCareerButton } from './components/SaveCareerButton'
import { useSavedCareers } from './hooks/useSavedCareers'
import type { Career } from './types'
import './App.css'

function AppShell() {
  const location = useLocation()
  const [careers, setCareers] = useState<Career[]>([])
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('career-token')))
  const [authMessage, setAuthMessage] = useState<string | null>(null)
  const { savedCareers, recent, dashboard, loading, error, statusMessage, isSaved, toggleSave, remove, clearStatus } = useSavedCareers()

  useEffect(() => {
    void fetchCareers().then(setCareers).catch(() => undefined)
  }, [])

  const handleAuthSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      if (authMode === 'register') {
        await registerStudent(name, email, password)
      } else {
        await loginStudent(email, password)
      }
      setIsAuthenticated(true)
      setAuthMessage(authMode === 'register' ? 'Account created. You can start saving careers.' : 'Signed in successfully.')
    } catch (error) {
      setAuthMessage(error instanceof Error ? error.message : 'Unable to authenticate')
    }
  }

  const careerDetail = useMemo(() => {
    const match = location.pathname.match(/^\/careers\/(.+)$/)
    if (!match) {
      return null
    }
    return careers.find((career) => career.id === match[1]) ?? null
  }, [careers, location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('career-token')
    setIsAuthenticated(false)
    setAuthMessage('Signed out successfully.')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:flex-row">
          <div className="flex-1">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Career counselling</p>
            <h1 className="mb-4 text-4xl font-semibold">Save careers you love and revisit them anytime.</h1>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              Create an account or sign in to start building your personalized shortlist for the future.
            </p>
          </div>
          <form onSubmit={handleAuthSubmit} className="w-full max-w-md rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-4 flex gap-2 rounded-full bg-white p-1">
              <button type="button" onClick={() => setAuthMode('login')} className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold ${authMode === 'login' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}>
                Login
              </button>
              <button type="button" onClick={() => setAuthMode('register')} className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold ${authMode === 'register' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}>
                Register
              </button>
            </div>
            {authMode === 'register' ? (
              <label className="mb-3 block text-sm font-medium text-slate-700">
                Name
                <input value={name} onChange={(event) => setName(event.target.value)} required className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2" />
              </label>
            ) : null}
            <label className="mb-3 block text-sm font-medium text-slate-700">
              Email
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2" />
            </label>
            <label className="mb-3 block text-sm font-medium text-slate-700">
              Password
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2" />
            </label>
            <button type="submit" className="w-full rounded-full bg-sky-600 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-700">
              {authMode === 'register' ? 'Create account' : 'Sign in'}
            </button>
            {authMessage ? <p className="mt-4 text-sm text-slate-600">{authMessage}</p> : null}
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Career counselling</p>
            <h1 className="text-3xl font-semibold">Saved careers hub</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <nav className="flex gap-2 rounded-full bg-slate-100 p-1">
              <NavLink to="/" className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-semibold ${isActive ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}>
                Dashboard
              </NavLink>
              <NavLink to="/saved-careers" className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-semibold ${isActive ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}>
                Saved careers
              </NavLink>
            </nav>
            <button type="button" onClick={handleLogout} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Logout
            </button>
          </div>
        </header>

        {statusMessage ? (
          <div className="mb-4 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <span>{statusMessage}</span>
            <button type="button" onClick={clearStatus} className="font-semibold">Dismiss</button>
          </div>
        ) : null}

        <Routes>
          <Route
            path="/"
            element={
              <div className="space-y-6">
                <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Career discovery</p>
                        <h2 className="text-2xl font-semibold text-slate-900">Explore careers</h2>
                      </div>
                      <a href="/saved-careers" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
                        View saved
                      </a>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {careers.map((career) => (
                        <CareerCard key={career.id} career={career} isSaved={isSaved(career.id)} onToggleSave={toggleSave} />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <DashboardSavedCareersWidget summary={dashboard} loading={loading} onToggleSave={toggleSave} isSaved={isSaved} />
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Quick access</p>
                      <h2 className="text-xl font-semibold text-slate-900">Recent picks</h2>
                      <div className="mt-4 space-y-3">
                        {recent.map((entry) => (
                          <div key={entry.id} className="rounded-2xl bg-slate-50 p-3">
                            <p className="font-semibold text-slate-900">{entry.career?.title ?? entry.careerId}</p>
                            <p className="text-sm text-slate-600">Saved {new Date(entry.createdAt).toLocaleDateString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            }
          />
          <Route
            path="/saved-careers"
            element={<SavedCareersPage careers={savedCareers.map((entry) => ({ ...entry.career!, createdAt: entry.createdAt }))} loading={loading} error={error} onRemove={remove} onToggleSave={toggleSave} isSaved={isSaved} />}
          />
          <Route
            path="/careers/:careerId"
            element={
              <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                {careerDetail ? (
                  <>
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Career details</p>
                        <h2 className="text-3xl font-semibold text-slate-900">{careerDetail.title}</h2>
                      </div>
                      <SaveCareerButton career={careerDetail} isSaved={isSaved(careerDetail.id)} onToggle={toggleSave} />
                    </div>
                    {careerDetail.image ? <img src={careerDetail.image} alt="" className="mb-5 h-60 w-full rounded-3xl object-cover" /> : null}
                    <p className="mb-4 text-lg leading-8 text-slate-600">{careerDetail.description}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {careerDetail.skills.map((skill) => (
                        <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-slate-600">Salary: {careerDetail.salary}</div>
                  </>
                ) : (
                  <p>Career not found.</p>
                )}
              </section>
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
