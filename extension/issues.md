# Known Issues & Solutions

## Issue 1: Calendar Scraping Not Working

**Problem:** The extension doesn't find assignments on the Canvas calendar page.

**Why:** The calendar uses dynamic JavaScript (FullCalendar library). Events are:
- Loaded asynchronously after page load
- Only visible in DOM when the month is displayed
- Event details appear in a popover only when clicked

**Attempted Fixes:**
- Added `.event-details-header` selector
- Added `.details_title` for event title
- Added delay before scraping

**Potential Solutions:**
1. **Longer delay** - Wait 2-3 seconds for calendar to fully load
2. **MutationObserver** - Watch for new elements added to the page
3. **Intercept API calls** - Canvas makes API calls to get calendar data; we could intercept those
4. **Skip calendar entirely** - Focus on course assignment pages which work reliably

---

## Issue 2: All Assignments Show as "Overdue" ✅ RESOLVED

**Problem:** Every assignment displays "Overdue!" in the popup.

**Why:** The due date is either:
- Not being found on the page (selector mismatch)
- Not being parsed correctly (date format issues)
- Stored as `null`, which JavaScript treats as epoch (1970)

**Options Considered:**
1. Only show future assignments (filter out past-due)
2. Show "No due date" for unknown dates
3. Separate sections (Upcoming / No Date / Past Due)
4. Debug first to find root cause
5. Add "Clear Data" button to reset corrupted data

**Debugging Process:**
1. Added console logging to `parseAssignmentRow()` to see what was being found
2. Console showed: `Due date element found: NO`
3. Inspected Canvas HTML, found due dates use class `.due_date_display` not `.due_date`
4. Updated selector to include `.due_date_display`
5. Retested - dates now parsing correctly

**Solution Implemented:**
1. ✅ Fixed selector: Added `.due_date_display` to content.js
2. ✅ Filter past-due: popup.js now only shows assignments due today or later
3. ✅ Handle null dates: Shows "No due date" instead of "Overdue"
4. ✅ Clear button: Added 🗑️ Clear button to wipe data and re-scrape
5. ✅ Status indicator: Shows "X upcoming (Y past hidden)"

**Files Changed:**
- `content.js` - Updated selector, added debug logging
- `popup.js` - Added filtering, null handling, clear function
- `popup.html` - Added Clear button
- `popup.css` - Styled Clear button (red tint)

---

## Issue 3: No Completion Status

**Problem:** Extension doesn't know which assignments are already submitted.

**Why:** We're only scraping assignment names and dates, not submission status.

**Where to find status:**
- Assignment list pages have checkmarks or "Submitted" labels
- Canvas API has submission endpoints
- Student grades page has completion info

**Potential Solutions:**
1. **Scrape status indicators** - Look for `.submitted`, `.completed` classes
2. **Manual marking** - Let user click to mark as done in the popup
3. **Canvas API** - Query submission status via API (requires token)

---

## Issue 4: No Learning Suite Support

**Problem:** Only Canvas is supported; BYU also uses Learning Suite.

**Why:** Learning Suite has different URL and HTML structure.

**Learning Suite URLs:**
- `learningsuite.byu.edu`

**Potential Solutions:**
1. **Add to manifest.json** - Include `learningsuite.byu.edu` in host_permissions
2. **Create separate parser** - Learning Suite has different HTML structure
3. **Research structure** - Need to inspect Learning Suite pages to find selectors

---

## Issue 5: Duplicate Handling

**Problem:** Same assignment might be scraped multiple times from different pages.

**Current Solution:** We check by title (case-insensitive) and skip duplicates.

**Limitation:** If same title appears in different courses, only first is kept.

**Better Solution:** Use combination of title + course + due date as unique key.

---

## Priority for Fixes

1. **Fix "Overdue" display** - Quick win, improves usability
2. **Add completion status** - High value for users
3. **Add Learning Suite** - Expands coverage for BYU students
4. **Improve calendar** - Nice to have but course pages work
