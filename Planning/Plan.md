# Plan

High-level steps to achieve the Student Life vision.

---

## Step 1: Chrome Extension Setup ✅ COMPLETE
Use a Chrome extension to get in a position to access Canvas data.
- Extension scaffold built
- Runs on Canvas pages
- Can read page content and store data locally

---

## Step 2: Scrape Required Data (IN PROGRESS)
Capture the data needed to power the planner.

### Must Have:
- **Due dates** - When each assignment is due
- **Time estimate info** - Data that helps estimate how long tasks will take
  - Assignment type (quiz, paper, project, reading, etc.)
  - Point value (often correlates with effort)
  - Assignment description/instructions

### Nice to Have:
- **Points** - For grade impact calculation (capture now for later use)

---

## Step 3: Structured Data Storage
Store scraped data in a structured, parseable format.

### Data to Store per Assignment:
- **Name** - Assignment title
- **Due date** - When it's due
- **Source info** - Where the data came from:
  - Syllabus content
  - Assignment page content
  - Linked pages from the assignment

### Storage Architecture:
1. **Store raw scraped pages separately** - Keep syllabus, assignment pages, and linked pages in distinct locations
2. **Parse and combine per class** - Aggregate all data relating to one course into a unified structure
3. **Easy to query** - Format that allows quick lookup and filtering

---

## Step 4: Gather User Availability
Collect information about how many hours the user can work each day of the week.

---

## Step 5: Get Time Estimates
Estimate how long each assignment will take to complete.

---

## Step 6: Display Weekly Task Overview
Show upcoming tasks for the current week with due dates and estimated time required. Display upcoming big tasks from the following week with time estimates and due dates.

---

## Step 7: Prioritize and Schedule Tasks
For each day of the week, check available time. Prioritize tasks based on due date proximity and time required. Schedule top-priority tasks that fit into available time. If total task time exceeds available time, identify which assignments should receive reduced effort and display adjusted time allocations for each day.
