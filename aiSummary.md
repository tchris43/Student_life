# Project Summary: Student Life App

**Goal**: Build an app that helps BYU students manage their academic workload by breaking down big assignments, prioritizing tasks, and preventing last-minute cramming.

**Last Updated**: January 28, 2026

---

## Vision (from vision.md)
- Help students complete small tasks on time while looking ahead at big assignments
- AI-suggested daily task breakdown based on available hours
- Prioritize by: due date + time required + grade impact
- Enhance learning, not replace it — focus on mastery, not just grades

---

## Current Plan (3 Steps Defined)

### Step 1: Chrome Extension Setup ✅ COMPLETE
Extension runs on Canvas, can read pages and store data locally.

### Step 2: Scrape Required Data (NEXT)
Capture: due dates, assignment type, point value, descriptions — anything that helps estimate time.

### Step 3: Structured Data Storage
- Store raw scraped pages separately (syllabus, assignment pages, linked pages)
- Parse and combine all data per class into unified structure
- Format for easy querying

### Steps 4-5: To be defined
Likely: AI time estimation, dashboard UI

---

## Key Files

| File | Purpose |
|------|---------|
| `Planning/vision.md` | Pain points and product philosophy |
| `Planning/Plan.md` | High-level implementation steps |
| `Planning/Implementation.md` | Options for each step (to be filled) |
| `notes.md` | User's research notes |
| `extension/` | Chrome extension code |
| `extension/issues.md` | Bug log and debugging history |

---

## Extension Status
- ✅ Scaffolding complete
- ✅ Basic scraping works (assignment names, due dates)
- ✅ Date parsing fixed (adds current year)
- ✅ Popup displays upcoming assignments
- ❌ Need more systematic data capture (syllabus, linked pages, etc.)

---

## To Continue
1. Read `Planning/Plan.md` for the high-level steps
2. Fill in `Planning/Implementation.md` with options for each step
3. Define Steps 4-5 in Plan.md
