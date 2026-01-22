# Backend Engineering Assessment

## Overview
This repository contains a backend engineering assessment designed to evaluate real-world Node.js and TypeScript backend development skills using Express, PostgreSQL, and Knex.

---

## Getting Started

```bash
npm install
npm run migrate:latest
npm run dev
```

---

## Available Tasks

### Task 1: JWT Authentication System
Implement stateless authentication with secure password hashing and JWT-based authorization.

**Endpoints**
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

---

### Task 2: User Favorites API
Allow authenticated users to favorite games.

**Endpoints**
- GET /api/favorites
- POST /api/favorites
- DELETE /api/favorites/:gameId

All endpoints require authentication.

---

### Task 3: Odds Snapshot History
Persist periodic odds snapshots and expose a historical query API.

**Endpoints**
- GET /api/odds/history/:gameId
- POST /api/jobs/ingest

Cron job runs every 10 minutes.

---

## Submission Guidelines
- Ensure migrations run successfully
- APIs respond correctly
- Include brief documentation and example requests
- Unit tests are optional

---

## Evaluation Criteria
| Area | Weight |
|----|----|
| Functionality | 40% |
| Code Quality | 25% |
| Error Handling | 20% |
| Database Design | 10% |
| Documentation | 5% |

Good luck, and thank you for your time.
# odds-history
