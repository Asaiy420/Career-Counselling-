import express from 'express'
import cors from 'cors'
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import jwt from 'jsonwebtoken'

export type Student = {
  id: string
  name: string
  email: string
  passwordHash: string
}

export type SavedCareerRecord = {
  id: string
  studentId: string
  careerId: string
  createdAt: string
}

export type Career = {
  id: string
  title: string
  category: string
  description: string
  salary: string
  skills: string[]
  image?: string
}

const storagePath = process.env.CAREER_STORAGE_PATH ?? join(process.cwd(), 'data', 'career-store.json')
const CAREERS: Career[] = [
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Analytics',
    description: 'Turn business questions into actionable insights with dashboards and reporting.',
    salary: '$72k - $110k',
    skills: ['SQL', 'Excel', 'Visualization'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    category: 'Technology',
    description: 'Design and build reliable products that solve real-world problems.',
    salary: '$95k - $150k',
    skills: ['TypeScript', 'React', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    category: 'Leadership',
    description: 'Align teams around customer needs and ship products people love.',
    salary: '$90k - $140k',
    skills: ['Strategy', 'Communication', 'Roadmapping'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
  },
]

function ensureStore() {
  const directory = dirname(storagePath)
  mkdirSync(directory, { recursive: true })
  if (!existsSync(storagePath)) {
    writeFileSync(storagePath, JSON.stringify({ students: [], savedCareers: [] }, null, 2))
  }
}

function readStore() {
  ensureStore()
  return JSON.parse(readFileSync(storagePath, 'utf8')) as {
    students: Student[]
    savedCareers: SavedCareerRecord[]
  }
}

function writeStore(store: { students: Student[]; savedCareers: SavedCareerRecord[] }) {
  writeFileSync(storagePath, JSON.stringify(store, null, 2))
}

function hashPassword(password: string) {
  return `hashed:${password}`
}

function verifyPassword(password: string, hash: string) {
  return hash === `hashed:${password}`
}

function getToken(student: Student) {
  return jwt.sign({ sub: student.id, email: student.email }, process.env.JWT_SECRET ?? 'dev-secret', {
    expiresIn: '7d',
  })
}

function getStudentFromRequest(req: express.Request) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return null
  }

  const token = header.slice('Bearer '.length)
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET ?? 'dev-secret') as { sub: string }
    const store = readStore()
    return store.students.find((student) => student.id === payload.sub) ?? null
  } catch {
    return null
  }
}

export function createApp() {
  const app = express()
  app.use(cors())
  app.use(express.json())

  app.get('/health', (_req, res) => {
    res.json({ ok: true })
  })

  app.post('/auth/register', (req, res) => {
    const { name, email, password } = req.body as { name?: string; email?: string; password?: string }
    if (!name || !email || !password) {
      res.status(400).json({ message: 'name, email and password are required' })
      return
    }

    const store = readStore()
    if (store.students.some((student) => student.email === email)) {
      res.status(409).json({ message: 'email already registered' })
      return
    }

    const student: Student = {
      id: `student-${Date.now()}`,
      name,
      email,
      passwordHash: hashPassword(password),
    }

    store.students.push(student)
    writeStore(store)

    res.status(201).json({ token: getToken(student), student })
  })

  app.post('/auth/login', (req, res) => {
    const { email, password } = req.body as { email?: string; password?: string }
    if (!email || !password) {
      res.status(400).json({ message: 'email and password are required' })
      return
    }

    const store = readStore()
    const student = store.students.find((entry) => entry.email === email)
    if (!student || !verifyPassword(password, student.passwordHash)) {
      res.status(401).json({ message: 'invalid credentials' })
      return
    }

    res.json({ token: getToken(student), student })
  })

  app.get('/careers', (_req, res) => {
    res.json(CAREERS)
  })

  app.get('/saved-careers', (req, res) => {
    const student = getStudentFromRequest(req)
    if (!student) {
      res.status(401).json({ message: 'authentication required' })
      return
    }

    const store = readStore()
    const savedCareers = store.savedCareers
      .filter((entry) => entry.studentId === student.id)
      .map((entry) => ({
        ...entry,
        career: CAREERS.find((career) => career.id === entry.careerId),
      }))
      .filter((entry): entry is SavedCareerRecord & { career: Career } => Boolean(entry.career))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    res.json(savedCareers)
  })

  app.post('/saved-careers', (req, res) => {
    const student = getStudentFromRequest(req)
    if (!student) {
      res.status(401).json({ message: 'authentication required' })
      return
    }

    const { careerId } = req.body as { careerId?: string }
    if (!careerId) {
      res.status(400).json({ message: 'careerId is required' })
      return
    }

    const store = readStore()
    if (store.savedCareers.some((entry) => entry.studentId === student.id && entry.careerId === careerId)) {
      res.status(409).json({ message: 'career already saved' })
      return
    }

    const record: SavedCareerRecord = {
      id: `saved-${Date.now()}`,
      studentId: student.id,
      careerId,
      createdAt: new Date().toISOString(),
    }

    store.savedCareers.push(record)
    writeStore(store)

    res.status(201).json({ saved: true, record })
  })

  app.delete('/saved-careers/:careerId', (req, res) => {
    const student = getStudentFromRequest(req)
    if (!student) {
      res.status(401).json({ message: 'authentication required' })
      return
    }

    const { careerId } = req.params
    const store = readStore()
    const index = store.savedCareers.findIndex(
      (entry) => entry.studentId === student.id && entry.careerId === careerId,
    )

    if (index === -1) {
      res.status(404).json({ message: 'saved career not found' })
      return
    }

    store.savedCareers.splice(index, 1)
    writeStore(store)

    res.json({ removed: true, careerId })
  })

  app.get('/dashboard/saved-careers', (req, res) => {
    const student = getStudentFromRequest(req)
    if (!student) {
      res.status(401).json({ message: 'authentication required' })
      return
    }

    const store = readStore()
    const savedCareers = store.savedCareers
      .filter((entry) => entry.studentId === student.id)
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((entry) => ({
        ...entry,
        career: CAREERS.find((career) => career.id === entry.careerId),
      }))
      .filter((entry): entry is SavedCareerRecord & { career: Career } => Boolean(entry.career))

    res.json({ count: savedCareers.length, recent: savedCareers.slice(0, 3) })
  })

  return app
}

export default createApp
