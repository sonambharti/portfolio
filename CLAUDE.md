# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A personal portfolio site: a Create React App frontend (`frontend/`) and a minimal Express backend (`backend/`) whose only job is to send contact-form emails via Nodemailer. The two are deployed separately (frontend on Vercel, backend on Render) and communicate over a hardcoded API URL, not a proxy.

## Commands

Frontend (`cd frontend`):
- `npm start` — run the dev server at http://localhost:3000 (react-scripts/CRA)
- `npm run build` — production build to `frontend/build`
- No test script is defined and no test files exist in the repo despite CRA's default Jest setup being available via `react-scripts test`.

Backend (`cd backend`):
- `npm start` — run the Express server with `node server.js` (listens on port 5000, hardcoded)
- No build step, no tests.

There is no root-level package.json or script that runs both together — start each separately in two terminals.

## Architecture

**Frontend is a single-page, single-route app**, not a router-based multi-page app. `src/Components/App.js` renders every section component stacked vertically in one page (`Home`, `About`, `Education`, `Experience`, `Skills`, `Project`, `Achievement`, `Contact`), each wrapped in a `<div id="...">` anchor. Navigation (`Navbar`, `SideLink`) works via in-page scrolling (`react-scroll`) to these anchor ids, not via `react-router-dom` — a commented-out `BrowserRouter`/`Routes` block in `App.js` shows a router-based layout was tried and abandoned in favor of the single-page anchor approach. Keep new sections consistent with this pattern (add a new component + a new `id` div + a matching nav anchor) rather than reintroducing routes.

**Content is data-driven via plain JS modules in `src/data/`** (`ProjectData.js`, `ExperienceData.js`, `EducationData.js`, `SkillData.js`), each exporting an array of plain objects consumed by the corresponding component. To add/edit a project, job, degree, or skill, edit the relevant data file rather than the component markup.

**Styling is split per-component**: each component in `src/Components/` has a matching hand-written CSS file in `src/Style/` (e.g. `Project.js` ↔ `Style/Project.css`), imported directly into the component. Tailwind is also configured (`tailwind.config.js`, scans `src/**/*.{html,js,jsx,ts,tsx}`) but is used sparingly alongside the per-component CSS — check both the component's CSS file and Tailwind classes when changing appearance.

**`src/Animation/StarryBackground.js`** renders a fixed full-page canvas background behind everything else in `App.js`; it's independent of the section components.

**Backend (`backend/server.js`)** is a single-file Express app exposing one route, `POST /send-email`, which validates `{ email, subject, message }` and relays it through Gmail via Nodemailer using `NODEMAILER_EMAIL`/`NODEMAILER_PASS`/`NODEMAILER_TOEMAIL` env vars. `Contact.js` in the frontend calls this endpoint directly by hardcoded URL (currently `https://portfolio-ehid.onrender.com/send-email` in the shipped code, with a commented-out `http://localhost:5000/send-email` for local dev) — when testing contact-form changes locally, swap which line is active rather than relying on `REACT_APP_API_URL` (that env var is defined in `frontend/.env` but not actually read anywhere in the code).

## Known issues to be aware of

- `frontend/.env` and `backend/.env` are both committed to git (tracked despite `backend/.gitignore` listing `.env`) and contain a real Gmail address and app password. Do not add further secrets to tracked `.env` files, and flag this to the user if asked to touch env/secrets handling — the existing credentials should be rotated and the files removed from tracking.
- Backend CORS is fully open (`app.use(cors())` plus a manual `Access-Control-Allow-Origin: *` header) — no origin restriction.
- Much of `App.js` and `Contact.js` contains large commented-out blocks (an old router setup, a preloader/loading-state flow, debug `console.log`s). These are leftover, not active feature flags — don't treat commented code as documentation of current behavior.
