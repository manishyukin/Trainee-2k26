# Trainee-2k26

This repo is a **training workspace** with multiple small projects. The main backend learning project is:

- `Express/express-typescript/`: **Express + TypeScript API** (routing, services, basic auth, file-based persistence)

## Express + TypeScript training (`Express/express-typescript`)

### What we are building
A small REST API that demonstrates:

- **Express app setup** in TypeScript
- **Route modules** (`/auth`, `/profile`)
- **Service layer** for business logic (auth, profile, file persistence)
- **Password hashing** with `bcrypt`
- **JWT token generation** with `jsonwebtoken`
- **Simple persistence** using JSON files in `data/`

### How trainees can access / run the code
Prerequisites:

- Node.js installed (recommended Node 18+; works with newer versions too)

Steps:

```bash
cd Express/express-typescript
npm install
npm run dev
```

The server runs on **port 8000**.

Build + run compiled output:

```bash
cd Express/express-typescript
npm run build
npm start
```

### API endpoints to try
Base URL: `http://localhost:8000`

- **POST** `/auth/signup`
  - Body: `{ "name": "A", "email": "a@b.com", "password": "pass" }`
- **POST** `/auth/signin`
  - Body: `{ "email": "a@b.com", "password": "pass" }`
- **GET** `/profile/get-profile`
  - Example: `/profile/get-profile?page=1`

### Folder structure (where to look)
- **`src/server.ts`**: Express app entrypoint (middleware + mounts route groups)
- **`src/routes/`**: Route modules (`auth.route.ts`, `profile.route.ts`)
- **`src/service/`**:
  - `auth.service.ts`: signup/signin logic (hash/compare passwords)
  - `file.service.ts`: read/write helpers for JSON persistence
  - `profile.service.ts`: profile handler example
- **`src/middleware/verification.logic.ts`**: JWT token helper (and a commented token verify idea)
- **`src/types/`**: shared types (`User`)
- **`data/users.json`**: file-backed “DB” for users (training-only)

### Learning steps (what we cover in order)
Use this as the suggested progression for trainees.

#### Step 1: Project setup + TypeScript runtime
- **Goal**: Run TypeScript directly in dev.
- **What to study**: `package.json` scripts:
  - `dev`: `nodemon --exec tsx src/server.ts`
  - `build`: `tsc` → outputs to `dist/`
  - `start`: `node dist/server.js`

#### Step 2: Express app basics
- **Goal**: Create an Express server and parse JSON bodies.
- **What to study**: `src/server.ts` (`express()`, `app.use(express.json())`, `app.listen`)

#### Step 3: Routing and route grouping
- **Goal**: Organize endpoints by feature.
- **What to study**:
  - `src/routes/auth.route.ts` mounted at `/auth`
  - `src/routes/profile.route.ts` mounted at `/profile`

#### Step 4: Service layer (separating concerns)
- **Goal**: Keep route files thin and move logic into services.
- **What to study**: `src/service/*.ts` and how routes call service functions.

#### Step 5: Persistence without a database (training approach)
- **Goal**: Understand CRUD concepts without setting up a DB.
- **What to study**:
  - `src/service/file.service.ts` reading/writing `data/users.json`
  - Trade-off: **not safe for production**, but great for learning flow quickly.

#### Step 6: Auth basics (signup + signin)
- **Goal**: Learn password hashing + validation.
- **What to study**: `src/service/auth.service.ts` using `bcrypt.hash` and `bcrypt.compare`.

#### Step 7: JWT (token generation, then verification)
- **Goal**: Understand tokens and protected routes.
- **What to study**: `src/middleware/verification.logic.ts`
  - Note: the JWT secret is currently hard-coded for training; in real projects move it to `.env`.

### Common trainee tasks / exercises
- Add validation (missing fields, email format, password rules).
- On `signin`, return a JWT token and then protect `/profile/get-profile`.
- Add a `GET /auth/users` endpoint (reads from `data/users.json`).
- Replace file persistence with a real DB later (Mongo/MySQL/Postgres).
