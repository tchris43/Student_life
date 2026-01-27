# Project Summary: Student Life App

**Goal**: Build an app that helps BYU students manage their academic workload by breaking down big assignments, prioritizing tasks, and preventing last-minute cramming.

**Last Updated**: January 26, 2026

---

## Key Files in Repo

### Planning & Vision
- `vision.md` - Core problem statement and product philosophy
- `Feedback/student_survey_feedback.md` - User research insights from student interviews
- `Planning/Brainstorm.md` - Summarized ideas on data access, priority calculation, and UI
- `Planning/Plan.md` - Architecture decisions and mobile strategy
- `image.png` - Mockup of weekly planner dashboard

### Extension (MVP)
- `extension/manifest.json` - Chrome extension configuration
- `extension/content.js` - Scrapes Canvas pages for assignments
- `extension/popup.html/js/css` - Extension popup UI
- `extension/README.md` - How the extension works
- `extension/issues.md` - Running log of bugs, debugging, and solutions

---

## Core Problem
Students focus on "small fires" (urgent tasks) and neglect big assignments until it's too late, leading to cramming and mediocre work.

## Solution
AI-powered weekly planner that:
- Shows all assignments with time estimates, organized by day
- Prioritizes based on: due date + time required + grade impact
- Breaks big tasks into smaller chunks scheduled across days
- Pulls data automatically from Canvas and Learning Suite

---

## Architecture Decision
- **Hybrid approach**: Browser extension (scrapes data silently) + Web app (full UI dashboard)
- Extension syncs to central database → Web app and mobile both read from it
- Minimal/zero manual setup for users

## Mobile Strategy
Start with responsive web/PWA, data already in cloud so mobile just reads from database.

## MVP Path
1. Chrome extension + Web app
2. PWA for mobile
3. Native apps if needed

---

## Current Implementation Status

### Chrome Extension (In Progress)
The extension scrapes Canvas assignment data and displays it in a popup.

**What's Working:**
- ✅ Extension loads and runs on Canvas pages
- ✅ Scrapes assignment titles from course/module pages
- ✅ Finds due dates using `.due_date_display` selector
- ✅ Parses dates correctly (adds current year to "Jan 27" format)
- ✅ Stores assignments in `chrome.storage.local`
- ✅ Displays upcoming assignments in popup (filters past-due)
- ✅ Clear button to wipe data and re-scrape
- ✅ Debug logging in both content.js and popup.js

**What's NOT Working Yet:**
- ❌ Calendar page scraping (dynamic content issues)
- ❌ Submission/completion status (doesn't know what's turned in)
- ❌ Learning Suite support (different URL/HTML structure)
- ❌ Backend/database (currently local storage only)

---

## Key Technical Lessons Learned

1. **Canvas HTML selectors vary** - Due dates use `.due_date_display`, not `.due_date`
2. **JavaScript date parsing quirk** - `new Date("Jan 27")` returns year 2001; must explicitly add current year
3. **Chrome caches extension scripts** - After code changes, must toggle extension off/on (or click reload), then hard refresh the page
4. **Debug logging is essential** - Added `📚 DEBUG` and `📚 POPUP DEBUG` console logs to trace data flow

---

## How to Continue Development

1. Read this file for context
2. Read `extension/issues.md` for detailed bug history
3. Read `extension/README.md` for how the extension works
4. Check `actionItems.md` for next steps
