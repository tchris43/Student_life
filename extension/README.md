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
'.due_date_display'    // Due date (updated after debugging)
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
3. **Filters out past-due assignments** (only shows today and future)
4. Assignments sorted by due date (soonest first, no-date items at end)
5. Each assignment rendered as a card with:
   - Title
   - Course name
   - Due date (formatted: "Due in X days", "Due tomorrow", or "No due date")
   - Red styling if due within 2 days

### Popup Controls
- **🔄 Refresh** - Reload assignments from storage
- **🗑️ Clear** - Wipe all stored assignments and start fresh

### Priority Calculation (Current)
Currently just sorts by due date. Future: combine due date + points + grade impact.

---

## Current Limitations

See `issues.md` for detailed breakdown and decision history.

- Calendar scraping not working
- No completion status (doesn't know what's submitted)
- No Learning Suite support yet

## Resolved Issues

- ✅ **Selector fixed** - Canvas uses `.due_date_display` not `.due_date`
- ✅ **Date parsing fixed** - Canvas shows "Jan 27" without year; now adds current year automatically
- ✅ **Past-due filtering** - Only shows assignments due today or later
- ✅ **Clear button** - Wipe all data and re-scrape fresh
- ✅ **Chrome caching issue** - Must toggle extension off/on after code changes

---

## Testing

1. Go to `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked" → select `extension/` folder
4. Visit Canvas → check console (F12) for scraping logs
5. Click extension icon to see results

### After Making Code Changes
**Important:** Chrome caches extension scripts. After editing code:
1. Go to `chrome://extensions`
2. **Toggle extension OFF then ON** (or click the reload ↻ button)
3. **Hard refresh** the Canvas page (Ctrl+Shift+R)

### Debugging the Popup
1. Click extension icon to open popup
2. Right-click inside popup → **Inspect**
3. Check Console for `📚 POPUP DEBUG` messages
