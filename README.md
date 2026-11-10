# TaskBoard – Playwright Demo (SWE 437)

A very small to-do list app we use to show Playwright.

- **frontend/** – React app (http://localhost:5173): add, check off and delete tasks
- **backend/** – Node.js + Express API (http://localhost:3001) that stores the tasks in memory
- **tests/** – our Playwright tests

## 1. Set up (once)

You need [Node.js](https://nodejs.org) 18 or newer and Git.

```bash
git clone https://github.com/kcsheraj/swe437-playwright-demo.git
```
```bash
cd swe437-playwright-demo
```
```bash
npm run setup
```

`npm run setup` installs the frontend, backend and Playwright, and downloads the test browsers (a few minutes the first time).

## 2. Try the app yourself (optional)

Open two terminals:

```bash
npm run backend
```
```bash
npm run frontend
```

Then go to http://localhost:5173

## 3. Run the tests

| Command | What it does |
|---|---|
| `npm test` | Runs all tests in Chrome, Firefox and Safari (WebKit). Starts the app for you. |
| `npm run test:headed` | Same, but you can watch the browser (Chrome only) |
| `npm run test:ui` | Opens Playwright's UI mode: pick a test, run it, see each step |
| `npm run codegen` | Opens a browser that writes test code while you click (start the app first) |
| `npm run report` | Opens the HTML report from the last run |

## Files to look at

| File | What's in it |
|---|---|
| `tests/tasks.spec.js` | Our 6 main tests (find → do → check) |
| `tests/recorded-with-codegen.spec.js` | An example of a test recorded with Codegen |
| `playwright.config.js` | Settings: which browsers, base URL, start the servers |
| `frontend/src/App.jsx` | The whole React app (one file) |
| `backend/server.js` | The whole API (one file) |

## Optional: AI Test Agents (Claude Code)

This project is already set up for Playwright's AI Test Agents (we ran
`npx playwright init-agents --loop=claude`, which added `.claude/agents/`,
`.mcp.json`, `specs/` and `tests/seed.spec.ts`).

1. Start the app: `npm run backend` and `npm run frontend`
2. Open Claude Code in this folder (`claude`) and approve the `playwright-test` MCP server
3. Try the three agents:

| Agent | Example prompt |
|---|---|
| Planner | Use the playwright-test-planner agent to create a test plan for deleting tasks in the TaskBoard app at http://localhost:5173 |
| Generator | Use the playwright-test-generator agent to generate tests from specs/&lt;plan file&gt;.md |
| Healer | Use the playwright-test-healer agent to fix the failing tests |

To see the Healer work, first break a test on purpose: in `frontend/src/App.jsx`
rename the button text `Add` to `Save`, run `npm test`, then ask the Healer.
Undo the rename afterwards. AI output changes every run, so always read and
check what it wrote.
