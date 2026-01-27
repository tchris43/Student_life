# Student Life Planner - Chrome Extension

A Chrome extension that helps BYU students manage their academic workload by automatically scraping assignments from Canvas and displaying them with priority-based organization.

## How It Works

### Architecture Overview

```
┌─────────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Canvas Page        │     │ chrome.storage   │     │    Popup UI     │
│  (content.js runs)  │ ──► │ (local database) │ ◄── │  (popup.js)     │
└─────────────────────┘     └──────────────────┘     └─────────────────┘
```

1. **content.js** runs automatically on Canvas pages
2. It scrapes assignment data and saves to **chrome.storage**
3. When you click the extension, **popup.js** reads from storage and displays assignments

---

## File Structure

```
extension/
├── manifest.json    # Extension configuration
├── content.js       # Scrapes Canvas pages
├── popup.html       # Popup UI structure
├── popup.js         # Popup logic (display assignments)
├── popup.css        # Popup styling
└── icons/           # Extension icons
```

---

## How Scraping Works

### Pages We Scan
- `/courses/*` - Course pages and modules
- `/assignments` - Assignment lists
- `/calendar` - Calendar view (not yet working)

### What We Look For

**Assignment List Pages:**
```javascript
// Selectors used:
'.assignment'           // Assignment row container
'.ig-title'            // Assignment title
'.due_date'            // Due date
'.points_possible'     // Point value
```

**Module Items:**
- Currently picked up through `.assignment` class

**Calendar Events (not yet working):**
```javascript
'.fc-event'               // FullCalendar events
'.event-details-header'   // Event popover
'.details_title'          // Event title
```

### Data Stored Per Assignment
```javascript
{
  title: "Homework 3",
  course: "CS 142",
  dueDate: "2026-01-28T23:59:00.000Z",  // ISO format
  points: 100,
  source: "canvas"  // or "canvas-todo", "canvas-calendar"
}
```

---

## How Display Works

### Popup Flow
1. User clicks extension icon
2. `popup.js` loads assignments from `chrome.storage.local`
3. Assignments sorted by due date (soonest first)
4. Each assignment rendered as a card with:
   - Title
   - Course name
   - Due date (formatted: "Due in X days", "Due tomorrow", etc.)
   - Red styling if due within 2 days

### Priority Calculation (Current)
Currently just sorts by due date. Future: combine due date + points + grade impact.

---

## Current Limitations

See `issues.md` for detailed breakdown and solutions.

- Calendar scraping not working
- No completion status (doesn't know what's submitted)
- All assignments show as "Overdue" if no date parsed
- No Learning Suite support yet

---

## Testing

1. Go to `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked" → select `extension/` folder
4. Visit Canvas → check console (F12) for scraping logs
5. Click extension icon to see results
