# Browser Extension MVP - Implementation Guide

> **Note for Python developers**: Chrome extensions use JavaScript, HTML, and CSS. The syntax is similar enough that you'll pick it up quickly. I'll explain JS concepts as we go.

---

## Overview

We're building a Chrome extension that:
1. Detects when you're on Canvas
2. Scrapes your assignments
3. Shows them in a popup sorted by priority

---

## Phase 1: Extension Scaffold

### What we're building
A minimal Chrome extension that loads and shows a popup when clicked.

### Files to create
```
student_life/
└── extension/
    ├── manifest.json      ← Extension config (like requirements.txt)
    ├── popup.html         ← The UI when you click the extension icon
    ├── popup.js           ← Logic for the popup
    ├── popup.css          ← Styling
    └── content.js         ← Script that runs on Canvas pages
```

### How to use the AI
> "Create the extension folder with manifest.json, popup.html, popup.js, and popup.css for a basic Chrome extension"

### How to test
1. Open Chrome → `chrome://extensions`
2. Enable "Developer mode" (top right toggle)
3. Click "Load unpacked" → select the `extension` folder
4. You should see your extension icon in the toolbar

---

## Phase 2: Canvas Scraping

### What we're building
A content script that runs when you visit Canvas and extracts assignment data.

### Key concepts
- **Content scripts**: JS that runs on specific websites (Canvas)
- **chrome.storage**: Like a local database for the extension
- **Message passing**: How popup talks to content scripts

### How Canvas pages are structured
- Assignment list: `/courses/*/assignments`
- Each assignment is in a `<div>` or `<tr>` with the title, due date, and points

### How to use the AI
> "Look at the Canvas assignments page and write a content script that extracts assignment names, due dates, and points"

### Testing
1. Go to your Canvas assignments page
2. Right-click → Inspect → Console
3. Check for logged assignment data

---

## Phase 3: Display Data

### What we're building
A popup that shows your assignments sorted by priority.

### Priority formula
```javascript
priority = (daysUntilDue < 3 ? 100 : 50 / daysUntilDue) + (points / 10)
```
- Due soon = higher priority
- More points = higher priority

### How to use the AI
> "Update popup.js to read assignments from chrome.storage and display them sorted by priority"

---

## Quick JavaScript for Python Devs

| Python | JavaScript |
|--------|------------|
| `def func():` | `function func() {}` or `const func = () => {}` |
| `print(x)` | `console.log(x)` |
| `dict = {}` | `let obj = {}` |
| `list = []` | `let arr = []` |
| `for item in list:` | `for (let item of arr) {}` |
| `if x:` | `if (x) {}` |
| `None` | `null` or `undefined` |

---

## Next Step

Ready to start? Say: **"Let's build Phase 1"** and I'll create the extension scaffold for you.
