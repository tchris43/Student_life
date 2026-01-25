# Architecture Plan

## How can we get the UI of a web app, but the data access of a browser extension?

**Answer: Use both together in a hybrid architecture.**

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│ Browser         │      │ Backend/        │      │ Web App         │
│ Extension       │ ───► │ Database        │ ◄─── │ (full UI)       │
│ (data scraper)  │      │ (stores data)   │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

### How it works:

1. **Extension** runs silently in the background
   - Detects when user visits Canvas or Learning Suite
   - Automatically scrapes assignments, due dates, syllabus info
   - Sends data to backend database
   - Minimal UI—just a sync status icon

2. **Web App** is where students actually use the planner
   - Full dashboard with weekly view, priority lists, etc.
   - Pulls data that the extension collected
   - Handles all AI processing, priority calculation, task breakdown

3. **User experience**
   - Install extension → it starts learning their classes automatically
   - Open web app → everything is already synced
   - Zero manual data entry required

---

## Extension UI Options

| Option | Pros | Cons |
|--------|------|------|
| **Popup panel** | Quick "today's tasks" view | Small space |
| **Side Panel** | Persistent sidebar alongside Canvas/LS | Chrome only |
| **New tab override** | Full dashboard when opening new tab | Only see it on new tabs |
| **Injected widget** | Floating tasks on course pages | Could feel intrusive |

---

## Mobile Strategy

Since the extension scrapes data to a **central database**, mobile becomes much simpler.

### Option 1: Mobile Web App (PWA)
- Same web app, responsive design for mobile
- Add to home screen for app-like experience
- **Pros**: One codebase, instant updates, works on any device
- **Cons**: Slightly less native feel

### Option 2: Native App (React Native / Flutter)
- Dedicated iOS/Android apps
- **Pros**: Better performance, push notifications, native feel
- **Cons**: More dev work, app store approval, two codebases (unless cross-platform)

### Option 3: API-First Approach (Recommended)
- Build a REST API that serves the scraped data
- Web app, mobile web, and future native apps all consume the same API
- **Pros**: Maximum flexibility, add any client later
- **Cons**: Slightly more upfront work

### Key Insight: Data Already in the Cloud
Since the browser extension syncs to a central database:
- Mobile doesn't need to scrape anything
- Just reads from the same database the web app uses
- Students can check their plan on phone without needing a laptop

```
┌──────────────┐
│ Extension    │───┐
│ (scrapes)    │   │     ┌─────────────┐
└──────────────┘   ├───► │  Database   │
                   │     │  (central)  │
┌──────────────┐   │     └─────────────┘
│ Web App      │◄──┤            │
│ (laptop)     │   │            │
└──────────────┘   │            ▼
                   │     ┌─────────────┐
┌──────────────┐   │     │   API       │
│ Mobile App   │◄──┴─────│  (serves)   │
│ (phone)      │         └─────────────┘
└──────────────┘
```

---

## Recommended MVP Path

1. **Phase 1**: Chrome extension + Web app (desktop focus)
2. **Phase 2**: Make web app responsive / PWA for mobile
3. **Phase 3**: Native mobile apps if needed

This gets you to market fastest while keeping mobile as an easy add-on.