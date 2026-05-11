<div align="center">

<img src="https://img.shields.io/badge/UpHire-ATS-4F46E5?style=for-the-badge" alt="UpHire ATS" />

# UpHire — Applicant Tracking System

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Zustand](https://img.shields.io/badge/Zustand-4.x-FF6B00?style=flat-square)](https://zustand-demo.pmnd.rs)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white)](https://docker.com)
[![Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://netlify.com)

A responsive, production-ready HR dashboard for managing internship applicants — built with React, Vite, and Tailwind CSS.

[🌐 Live Demo](https://uphire.netlify.app/login) &nbsp;·&nbsp; [🐳 Docker](#docker-deployment) &nbsp;·&nbsp; [📖 Docs](#project-structure)

</div>

---

## Overview

The Candidate Management Dashboard is a single-page application that allows HR teams to track, search, and manage internship applicants efficiently. It integrates with the [DummyJSON API](https://dummyjson.com/users) for initial data seeding, and supports full client-side CRUD with persistent state via Zustand.

### Demo Credentials

| Field    | Value               |
|----------|---------------------|
| Email    | `admin@upteky.com`  |
| Password | `upteky2025`        |

---

## Features

**Core**
- Applicant listing with Name, Email, College, Skills, and Status
- Real-time search by name or email (debounced 300ms)
- Filter by status and skills
- Detailed applicant view in a slide-in side panel
- Add applicant form with full validation and error handling
- API integration with DummyJSON — data transformed into candidate profiles

**Bonus**
- Dark mode with system preference detection and localStorage persistence
- Pagination — 8 records per page
- Mock authentication with protected routes
- State management via Zustand with localStorage persistence
- Smooth animations via Framer Motion (page transitions, staggered lists, modal spring)
- Mobile-first responsive design — table on desktop, cards on mobile
- Skeleton loading states and empty states

---

## Tech Stack

| Category          | Technology                          |
|-------------------|-------------------------------------|
| Framework         | React 18 + Vite                     |
| Language          | JavaScript (ES2023)                 |
| Styling           | Tailwind CSS v3                     |
| State Management  | Zustand (with persist middleware)   |
| Routing           | React Router v6                     |
| Form Validation   | React Hook Form + Zod               |
| Animations        | Framer Motion                       |
| HTTP Client       | Axios                               |
| Icons             | Lucide React                        |
| Font              | Inter (Google Fonts)                |
| Containerization  | Docker (multi-stage) + Nginx        |
| Deployment        | Netlify / Docker                    |

---

## Getting Started

### Prerequisites

- Node.js v18+ — [nodejs.org](https://nodejs.org)
- npm v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/AayushShah/candidate-management-dashboard.git
cd candidate-management-dashboard

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

App runs at **http://localhost:5173**

### Scripts

```bash
npm run dev       # Start dev server with hot module replacement
npm run build     # Production build
npm run preview   # Preview the production build locally
```

---

## Docker Deployment

```bash
# Build the image
docker build -t candidate-management-dashboard .

# Run the container
docker run -p 3000:80 candidate-management-dashboard
```

Open **http://localhost:3000**

The Dockerfile uses a **multi-stage build** — Node 20 Alpine compiles the Vite app, then Nginx Alpine serves the static output. Final image size is approximately 25MB.

---

## Netlify Deployment

### One-click

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/AayushShah/candidate-management-dashboard)

### Manual

1. Push your repository to GitHub
2. Go to [Netlify](https://app.netlify.com) → **Add new site** → **Import from Git**
3. Build settings are auto-detected from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **Deploy site**

---

## Environment Variables

```env
# .env (copy from .env.example)
VITE_API_BASE_URL=https://dummyjson.com
VITE_APP_TITLE=UpHire
```

All Vite environment variables must be prefixed with `VITE_`.

---

## Project Structure

```
src/
├── api/               # Axios instance and DummyJSON data fetcher + transformer
├── components/
│   ├── layout/        # Sidebar, Navbar, Layout wrapper
│   ├── candidates/    # CandidateTable, CandidateCard, DetailModal, StatusBadge
│   ├── forms/         # AddCandidateForm (React Hook Form + Zod)
│   ├── ui/            # StatCard, SearchBar, FilterDropdown, Pagination,
│   │                  # EmptyState, SkeletonRow, Toast, ThemeToggle
│   └── auth/          # LoginPage, ProtectedRoute
├── hooks/             # useCandidates, useAuth
├── pages/             # Dashboard, Candidates, AddCandidate, Login
├── store/             # Zustand stores — candidateStore, authStore
└── utils/             # Zod schemas, helper utilities
```

---

## API Integration

**Source:** [DummyJSON Users API](https://dummyjson.com/users)

```
GET https://dummyjson.com/users?limit=20
```

The raw API response is transformed into a `Candidate` shape — assigning real Indian college names, randomized tech skills, application statuses, experience levels, and applied dates. Data is fetched once and persisted in Zustand to avoid redundant requests.

Error handling covers network timeouts (10s), failed requests (retry banner), and empty states.

---

## Evaluation Criteria

| Criteria                      | Weight | Implementation |
|-------------------------------|--------|----------------|
| UI/UX & Responsiveness        | 20%    | Clean SaaS design, Inter font, indigo accent, mobile-first, dark mode |
| Code Structure                | 20%    | Feature-based folders, custom hooks, reusable components, Zustand |
| Functionality                 | 25%    | All 5 core features + auth, dark mode, pagination, animations |
| API Integration               | 15%    | DummyJSON + Axios, data transformation, loading skeletons, error states |
| Validation & Error Handling   | 10%    | Zod schemas, React Hook Form, inline errors, toast notifications |
| GitHub / Deployment Quality   | 10%    | Docker multi-stage build, Netlify, clean commits, this README |

---

## Author

**Aayush Shah**  
Developer Internship — Upteky Solution Pvt. Ltd.

- GitHub: [@AayushShah](https://github.com/AayushShah)

---

<div align="center">
Made for the Upteky Developer Internship — 2026
</div>
