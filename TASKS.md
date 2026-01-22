# Backend Engineering Assessment

**Target Audience:** Senior Backend Engineers  
**Time Limit:** 2 hours  
**Deliverable:** Fully implemented and tested

---

## Overview

This assessment evaluates your ability to extend an existing Node.js/TypeScript backend with production-quality code. The codebase uses Express, PostgreSQL, Knex, and follows a layered architecture pattern.

---

## Task 1: JWT Authentication System

### Scope
Implement a stateless authentication system using JWT tokens.

### Technical Requirements

**Database**
- Migration already created: `20260120000001_create_users_table.ts`
- Table: `users` (id, email, password_hash, timestamps)

**API Endpoints**
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Authenticate and issue JWT
- `GET /api/auth/me` - Return authenticated user (protected route)

**Implementation Files**
- Controller: `src/controllers/authController.ts` (skeleton provided)
- Service: `src/services/authService.ts` (skeleton provided)
- Repository: `src/database/repositories/userRepository.ts` (skeleton provided)
- Middleware: `src/middleware/auth.ts` (skeleton provided)

**Security**
- bcrypt password hashing (salt rounds: 10)
- JWT signing with `JWT_SECRET` from env
- Token expiry: 24h
- Input validation (email format, password min 6 chars)

**Error Handling**
- 409 for duplicate email
- 401 for invalid credentials
- 400 for validation errors

### Acceptance Criteria
- [ ] Migration runs without errors
- [ ] User registration creates hashed password
- [ ] Login returns valid JWT
- [ ] Protected route validates JWT and returns user data
- [ ] Proper HTTP status codes and error messages

---

## Task 2: User Favorites API

### Scope
Allow authenticated users to bookmark games of interest.

### Technical Requirements

**Database**
- Migration already created: `20260120000002_create_user_favorites_table.ts`
- Table: `user_favorites` with FK to `users`
- Unique constraint on (user_id, game_id)

**API Endpoints**
- `GET /api/favorites` - List user's favorited games (with game details)
- `POST /api/favorites` - Add game to favorites (body: `{game_id}`)
- `DELETE /api/favorites/:gameId` - Remove from favorites

**Implementation Files**
- Controller: `src/controllers/favoritesController.ts` (skeleton provided)
- Service: `src/services/favoritesService.ts` (skeleton provided)
- Repository: `src/database/repositories/favoritesRepository.ts` (skeleton provided)

**Requirements**
- All routes require authentication (use `authenticate` middleware)
- GET returns list of favorited game IDs
- Idempotent POST (no error if already favorited)
- Store game_id as string reference

### Acceptance Criteria
- [ ] Migration runs and creates proper FK constraints
- [ ] GET returns user's favorited game IDs
- [ ] POST handles duplicates gracefully (idempotent)
- [ ] DELETE works even if favorite doesn't exist
- [ ] All routes require valid JWT

---

## Task 3: Odds Snapshot History

### Scope
Periodically save odds snapshots and provide historical query API.

### Technical Requirements

**Database**
- Migration already created: `20260120000003_create_odds_history_table.ts`
- Table: `odds_history` with indexes on game_id and snapshot_time

**Scheduled Job**
- Run every 10 minutes using `node-cron`
- Query current odds data from database or external API
- Save snapshot to `odds_history` table with timestamp

**API Endpoints**
- `GET /api/odds/history/:gameId` - Return last 50 snapshots for a game
  - Optional query param: `?bookmaker_key=draftkings`
  - Order by `snapshot_time DESC`
- `POST /api/jobs/ingest` - Manually trigger snapshot job

**Implementation Files**
- Controller: `src/controllers/oddsHistoryController.ts` (skeleton provided)
- Service: `src/services/oddsHistoryService.ts` (skeleton provided)
- Repository: `src/database/repositories/oddsHistoryRepository.ts` (skeleton provided)

**Requirements**
- Bulk insert for performance (use Knex batch insert)
- Cron job initialized on server start
- Proper error logging for failed jobs

### Acceptance Criteria
- [ ] Migration creates table with proper indexes
- [ ] Cron job runs every 10 minutes and saves snapshots
- [ ] GET /api/odds/history/:gameId returns ordered history
- [ ] Bookmaker filtering works
- [ ] Manual trigger endpoint executes job successfully

---

## Submission Guidelines

### What to Deliver
1. **Working Code** - Migrations run, APIs respond correctly
2. **Brief README Section** - Document your endpoints (request/response examples)
3. **Commit History** - Clean, logical commits (not required but nice to have)

### What's Not Required
- Unit tests (though you should manually test)
- Frontend or API client
- Extensive documentation
- Additional features beyond spec

---

## Evaluation Criteria

| Criterion | Weight |
|-----------|--------|
| **Functionality** | 40% |
| Code Quality & Organization | 25% |
| Error Handling | 20% |
| Database Design | 10% |
| Code Documentation | 5% |

### What We Look For
- **Clean, readable code** - Proper naming, structure, and TypeScript usage
- **Correct implementation** - Features work as specified
- **Proper error handling** - Graceful failures with appropriate status codes
- **Production mindset** - Security, validation, and edge cases considered

---

## Getting Started

1. Run migrations: `npm run migrate:latest`
2. Start server: `npm run dev`
3. Test with curl/Postman/Thunder Client

All skeleton files are already created. Focus on implementing the core logic.

**Good luck!**
