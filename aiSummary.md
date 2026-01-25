# Project Summary: Student Life App

**Goal**: Build an app that helps BYU students manage their academic workload by breaking down big assignments, prioritizing tasks, and preventing last-minute cramming.

## Key Files in Repo
- `vision.md` - Core problem statement and product philosophy
- `student_survey_feedback.md` - User research insights from student interviews
- `Brainstorm.md` - Summarized ideas on data access, priority calculation, and UI
- `Plan.md` - Architecture decisions and mobile strategy
- `image.png` - Mockup of weekly planner dashboard

## Core Problem
Students focus on "small fires" (urgent tasks) and neglect big assignments until it's too late, leading to cramming and mediocre work.

## Solution
AI-powered weekly planner that:
- Shows all assignments with time estimates, organized by day
- Prioritizes based on: due date + time required + grade impact
- Breaks big tasks into smaller chunks scheduled across days
- Pulls data automatically from Canvas and Learning Suite

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
