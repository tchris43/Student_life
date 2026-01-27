# Action Items & Next Steps

**Last Updated**: January 26, 2026

---

## Remaining Issues to Solve

### Priority 1: Completion Status
**Problem**: Extension doesn't know which assignments are already submitted.

**Why it matters**: Users see assignments they've already turned in, cluttering the view.

**Potential approaches**:
1. Scrape submission indicators from Canvas (look for `.submitted`, checkmarks)
2. Add manual "mark as done" button in popup
3. Use Canvas API (requires user to provide token)

**Recommended next step**: Inspect Canvas HTML for submitted assignments to find the selector.

---

### Priority 2: Learning Suite Support
**Problem**: Only Canvas is supported; BYU also uses Learning Suite.

**Why it matters**: Many BYU classes use Learning Suite, limiting the app's usefulness.

**Potential approaches**:
1. Add `learningsuite.byu.edu` to manifest.json host_permissions
2. Create separate parsing functions for Learning Suite HTML structure
3. Research Learning Suite page structure

**Recommended next step**: Navigate to Learning Suite, inspect the HTML, identify assignment selectors.

---

### Priority 3: Calendar Scraping (Lower Priority)
**Problem**: Extension doesn't find assignments on Canvas calendar page.

**Why it matters**: Some users prefer the calendar view.

**Why it's hard**: Calendar uses dynamic JavaScript (FullCalendar), events load async.

**Potential approaches**:
1. Use MutationObserver to wait for events to load
2. Intercept Canvas API calls for calendar data
3. Skip calendar entirely — course pages work fine

**Recommended next step**: Deprioritize; course module scraping is sufficient for MVP.

---

## Direction for Next Session

### Immediate Next Steps (Pick One)
1. **Add completion status** - Inspect Canvas HTML for submitted assignments, add filtering
2. **Add Learning Suite** - Research LS HTML structure, add to manifest, create parser
3. **Remove debug logging** - Clean up console.log statements before sharing with users

### Medium-term Goals
- Add priority scoring (due date + points + grade impact)
- Build web dashboard UI
- Add backend/database to sync across devices

### Long-term Vision
- AI task breakdown (break big assignments into chunks)
- Smart notifications
- Mobile app (PWA first, then native if needed)

---

## Quick Start for Tomorrow

1. **Read** `aiSummary.md` for full context
2. **Decide** which priority issue to tackle
3. **Test** the extension is still working:
   - Load extension at `chrome://extensions`
   - Visit Canvas → check console for scrape logs
   - Click extension → verify assignments display
4. **Code** the next feature
5. **Document** changes in `issues.md` and `README.md`

---

## Files to Reference

| File | Purpose |
|------|---------|
| `extension/content.js` | Scraping logic — add new selectors here |
| `extension/popup.js` | Display logic — filtering, rendering |
| `extension/manifest.json` | Permissions — add Learning Suite URL here |
| `extension/issues.md` | Bug log — document problems and solutions |
| `extension/README.md` | How it works — keep updated |
