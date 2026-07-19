<div align="center">

# Skill Hive

### AI-Powered Career Counselling Platform

**Discover the career path that fits *you* — guided by Google Gemini AI and a structured, explainable assessment engine.**

[**Live Demo**](#) · [**Report a Bug**](../../issues) · [**Request a Feature**](../../issues)

<br/>

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0--MVP-orange.svg)
![Status](https://img.shields.io/badge/status-in%20development-yellow.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React%2019-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?logo=bun&logoColor=white)

</div>

---

## Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [User Roles & Permissions](#user-roles--permissions)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## About the Project

**Skill Hive** is a full-stack web application that helps students and early-career professionals make informed, data-backed career decisions.

Users complete a structured assessment covering their **education level, interests, skills, and preferred work environment**. Their responses are sent to **Google Gemini AI**, which returns personalized career recommendations with match scores and detailed rationale — not generic advice, but explainable, actionable guidance.

Beyond the assessment, users can browse a curated career library, save careers to a personal shortlist, and view their full recommendation history from a personalized dashboard.

> This project was built as a team capstone for a Software Project Management course, following a complete SDLC: requirements engineering, sprint planning, agile execution, and deployment.

---

## Key Features

| | Feature | Description |
|:---:|---|---|
| 🔐 | **JWT Authentication** | Secure registration, login, and logout with token-based sessions |
| 👤 | **Student Profiles** | Capture education level, skills, and interests linked to each user account |
| 📝 | **Career Assessment** | Structured questionnaire covering skills, interests, and work preferences |
| 🤖 | **Gemini AI Recommendations** | Google Gemini generates top career matches with a match score and detailed reasoning |
| 🔍 | **Career Search & Filter** | Full-text search across the career library, filterable by category |
| 📖 | **Career Detail Pages** | Each career includes description, required skills, salary range, growth outlook, and work environment |
| ⭐ | **Save Careers** | Bookmark careers and revisit them from a dedicated saved careers page |
| 📊 | **Personalized Dashboard** | Overview of profile, latest AI recommendations, and saved careers |
| 🕓 | **Assessment History** | All past assessments and AI recommendations are stored and viewable |
| 📱 | **Responsive UI** | Fully optimized across desktop, tablet, and mobile with Tailwind CSS v4 |

---

## Tech Stack

<table>
<tr>
<td valign="top" width="33%">

**Frontend**
- React 19
- TypeScript 7
- React Router v7
- Tailwind CSS v4
- Zustand (state management)
- React Hook Form + Zod (validation)
- Axios (HTTP client)
- Vite 8 (build tool)

</td>
<td valign="top" width="33%">

**Backend**
- Node.js
- Express 5
- TypeScript
- Mongoose 9 (MongoDB ODM)
- JSON Web Tokens (JWT)
- bcrypt (password hashing)
- tsx (TypeScript runner)

</td>
<td valign="top" width="33%">

**AI & Infrastructure**
- Google Gemini AI (`@google/generative-ai`)
- MongoDB (via MongoDB Atlas)
- Bun (package manager & monorepo runner)
- ESLint (code quality)
- dotenv (environment configuration)

</td>
</tr>
</table>

**Deployment:** Vercel (frontend) · Render (backend) · MongoDB Atlas (database)

---

## Architecture Overview

```
┌──────────────────────┐        ┌──────────────────────┐        ┌──────────────────────┐
│                      │ HTTPS  │                      │        │                      │
│  React SPA (Vite)    │───────▶│  Express REST API    │───────▶│   MongoDB Atlas      │
│  Tailwind CSS v4     │◀───────│  Node.js + JWT Auth  │◀───────│   Mongoose ODM       │
│  Zustand State       │  JSON  │                      │        │                      │
└──────────────────────┘        └──────────┬───────────┘        └──────────────────────┘
                                           │
                                           ▼
                                ┌──────────────────────┐
                                │  Google Gemini AI    │
                                │  Career Recommendations│
                                │  & Roadmap Generation │
                                └──────────────────────┘
```

The system follows a classic **three-tier architecture**:

1. **Presentation Layer** — React 19 SPA served by Vite, using React Router v7 for client-side routing and Zustand for global auth state.
2. **Application Layer** — Express 5 REST API handling auth, career browsing, assessment submission, and AI-powered recommendation generation via JWT-protected routes.
3. **Data Layer** — MongoDB (Atlas) storing Users, StudentProfiles, Careers, AssessmentSubmissions, and SavedCareers, accessed through Mongoose schemas.

---

## Repository Structure

This is a **Bun monorepo** with two workspaces: `apps/client` and `apps/server`.

```
career-counselling/
├── apps/
│   ├── client/                        # React + Vite frontend
│   │   ├── src/
│   │   │   ├── pages/                 # Route-level page components
│   │   │   │   ├── LandingPage.tsx
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Assessment.tsx
│   │   │   │   ├── Recommendations.tsx
│   │   │   │   ├── CareerSearch.tsx
│   │   │   │   ├── CareerDetail.tsx
│   │   │   │   ├── SavedCareers.tsx
│   │   │   │   ├── Profile.tsx
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Register.tsx
│   │   │   ├── components/            # Reusable UI components
│   │   │   ├── hooks/                 # Custom React hooks
│   │   │   ├── data/                  # Static data / question bank
│   │   │   ├── styles/                # Global style utilities
│   │   │   ├── types/                 # Shared TypeScript types
│   │   │   ├── utils/                 # Helper functions
│   │   │   ├── api.ts                 # Axios instance & API helpers
│   │   │   ├── types.ts               # Core domain types
│   │   │   ├── App.tsx                # Root router
│   │   │   └── main.tsx               # Application entry point
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── package.json
│   │
│   └── server/                        # Express + Node.js backend
│       ├── src/
│       │   ├── controllers/           # Route handler logic
│       │   ├── middleware/            # JWT auth middleware
│       │   ├── models/                # Mongoose schemas
│       │   │   ├── user.model.ts
│       │   │   ├── student.model.ts
│       │   │   ├── career.model.ts
│       │   │   ├── AssessmentSubmission.ts
│       │   │   └── SavedCareer.ts
│       │   ├── routes/                # Express route definitions
│       │   │   ├── auth.route.ts
│       │   │   ├── career.route.ts
│       │   │   └── assessment.route.ts
│       │   ├── lib/
│       │   │   └── db.ts              # MongoDB connection
│       │   ├── utils/                 # Server-side helpers
│       │   ├── seed.ts                # Database seeding script
│       │   └── index.ts              # Server entry point (port 3001)
│       └── package.json
│
├── package.json                       # Monorepo root (Bun workspaces)
├── bun.lock
├── backend_design.md                  # Backend architecture reference
└── README.md
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

| Tool | Version |
|---|---|
| [Bun](https://bun.sh/) | `>= 1.x` |
| [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas) | or local MongoDB instance |
| [Google AI Studio API Key](https://aistudio.google.com/app/apikey) | For Gemini AI features |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Asaiy420/Career-Counselling-.git
cd career-counselling

# 2. Install all dependencies from the monorepo root
bun install
```

### Running Locally

```bash
# Start the backend API server (runs on http://localhost:3001)
bun run dev:server

# Start the frontend dev server (runs on http://localhost:5173)
bun run dev:client
```

> Run both commands in separate terminal windows.

| Service | URL |
|---|---|
| Frontend | `http://localhost:5173` |
| Backend API | `http://localhost:3001` |

### Seeding the Database

To populate the database with initial career data:

```bash
bun run --cwd apps/server tsx src/seed.ts
```

---

## Environment Variables

Create a `.env` file at the **project root** (it is loaded by the server via `dotenv`):

```env
# Server
PORT=3001

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/career-counselling-db

# Authentication
JWT_SECRET=your_super_secret_key_here

# Google Gemini AI
GEMINI_API_KEY=your_google_gemini_api_key_here

# CORS
CLIENT_URL=http://localhost:5173
```

> ⚠️ **Never commit `.env` files.** Add them to `.gitignore`. Only commit `.env.example` as a reference template.

---

## API Reference

All API routes are prefixed with `/api`. Protected routes require a `Bearer <token>` in the `Authorization` header.

### Authentication — `/api/auth`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Register a new user account | ❌ |
| `POST` | `/api/auth/login` | Authenticate and receive a JWT | ❌ |
| `POST` | `/api/auth/logout` | Invalidate the current session | ✅ |

### Careers — `/api/careers`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/careers/search` | Full-text search across careers | ❌ |
| `GET` | `/api/careers/categories` | List all available career categories | ❌ |
| `GET` | `/api/careers/suggestions` | Get career suggestions (typeahead) | ❌ |
| `GET` | `/api/careers/:id` | Get full details for a specific career | ❌ |
| `GET` | `/api/careers/saved` | Get the authenticated user's saved careers | ✅ |
| `POST` | `/api/careers/saved` | Save / bookmark a career | ✅ |
| `DELETE` | `/api/careers/saved/:careerId` | Remove a saved career | ✅ |

### Assessments — `/api/assessments`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/assessments/submit` | Submit assessment answers and receive Gemini AI career recommendations | ✅ |

**Assessment Submission Body:**
```json
{
  "answers": [
    { "questionId": "q1", "answer": "Technology" },
    { "questionId": "q2", "answer": "Remote" }
  ]
}
```

**Recommendation Response:**
```json
{
  "recommendations": [
    {
      "title": "Software Engineer",
      "matchScore": 92,
      "reason": "Strong alignment with your interest in technology and preference for remote work.",
      "requiredSkills": ["JavaScript", "System Design", "Data Structures"]
    }
  ]
}
```

---

## Database Schema

The application uses **MongoDB** with the following Mongoose collections:

### `users`
| Field | Type | Notes |
|---|---|---|
| `fullName` | `String` | Required |
| `email` | `String` | Required, unique, indexed |
| `password` | `String` | Hashed with bcrypt |
| `role` | `String` | `user` \| `admin` \| `student` (default: `user`) |
| `createdAt` | `Date` | Auto-generated |

### `careers`
| Field | Type | Notes |
|---|---|---|
| `title` | `String` | Full-text indexed |
| `description` | `String` | Full-text indexed |
| `category` | `String` | Enum: Technology, Healthcare, Engineering, Business, Arts & Design, Education, Science, Legal, Finance, Marketing |
| `requiredSkills` | `[String]` | Array of skill tags |
| `educationRequired` | `String` | Minimum qualification |
| `averageSalary` | `String` | Salary range display string |
| `growthOutlook` | `String` | `Declining` \| `Stable` \| `Growing` \| `Fast Growing` |
| `workEnvironment` | `String` | `Remote` \| `Office` \| `Hybrid` \| `Field` \| `Lab` \| `Variable` |
| `isActive` | `Boolean` | Soft-delete flag (default: `true`) |

### `studentprofiles`
| Field | Type | Notes |
|---|---|---|
| `userId` | `ObjectId` | Ref: `User` |
| `fullName` | `String` | Mirrored from user |
| `educationLevel` | `String` | Required at profile creation |
| `interests` | `[String]` | User-defined interest tags |
| `skills` | `[String]` | User-defined skill tags |

### `assessmentsubmissions`
| Field | Type | Notes |
|---|---|---|
| `studentId` | `ObjectId` | Ref: `User` |
| `answers` | `[{ questionId, answer }]` | Raw question-answer pairs |
| `recommendations` | `[String]` | AI-generated career recommendations |
| `submittedAt` | `Date` | Timestamp (default: `Date.now`) |

### `savedcareers`
| Field | Type | Notes |
|---|---|---|
| `userId` | `ObjectId` | Ref: `User` |
| `careerId` | `ObjectId` | Ref: `Career` |
| `savedAt` | `Date` | Timestamp (default: `Date.now`) |

> Compound unique index on `{ userId, careerId }` prevents duplicate saves.

---

## User Roles & Permissions

| Capability | User / Student | Admin |
|---|:---:|:---:|
| Register & login | ✅ | ✅ |
| Take career assessment | ✅ | ✅ |
| View AI recommendations | ✅ | ✅ |
| Browse & search careers | ✅ | ✅ |
| Save / unsave careers | ✅ | ✅ |
| View personalized dashboard | ✅ | ✅ |
| Edit own profile | ✅ | ✅ |
| Create / update / delete careers | ❌ | ✅ |
| View all registered users | ❌ | ✅ |

---

## Roadmap

- [x] JWT authentication (register, login, logout)
- [x] Student profile creation
- [x] Career library with search, filters, and categories
- [x] AI-powered career assessment (Google Gemini)
- [x] Save / bookmark careers
- [x] Personalized dashboard
- [x] Assessment submission history
- [ ] Career roadmap generation (step-by-step learning path via Gemini)
- [ ] Human counsellor booking & availability management
- [ ] In-app messaging between students and counsellors
- [ ] Email verification & password reset
- [ ] Career comparison tool (side-by-side view)
- [ ] Admin panel for career & question CRUD
- [ ] Analytics dashboard for admins
- [ ] Multi-language support

---

## Contributing

Contributions, issues, and feature requests are welcome.

<details>
<summary><strong>Contribution Workflow</strong></summary>

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit using [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: add career roadmap generation"
   ```
4. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request against `dev`

</details>

**Coding Standards:**
- **Formatting:** Prettier before every commit
- **Linting:** ESLint must pass with zero errors (`bun run --cwd apps/client lint`)
- **Naming:** `camelCase` for variables/functions · `PascalCase` for components/classes · `kebab-case` for file names
- **Commits:** Conventional Commits style (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`)
- **Branching:** `main` → production · `dev` → integration · `feature/*` → individual work
- **PRs:** At least one team member approval required before merge

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

**Built with 🧠 and ☕ — Skill Hive**

[⬆ Back to Top](#skill-hive)

</div>
