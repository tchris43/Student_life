// content.js - Scrapes assignments from Canvas pages
// Runs automatically on any Canvas (instructure.com) page

(function () {
    'use strict';

    console.log('📚 Student Life: Scanning for assignments...');

    // Only run on assignment-related pages
    if (!isAssignmentPage()) {
        console.log('📚 Student Life: Not an assignments page, skipping.');
        return;
    }

    // Wait for page to fully load, then scrape
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scrapeAssignments);
    } else {
        // Small delay to ensure dynamic content has loaded
        setTimeout(scrapeAssignments, 1000);
    }

    /**
     * Check if we're on a page that has assignments
     */
    function isAssignmentPage() {
        const url = window.location.href;
        return url.includes('/assignments') ||
            url.includes('/courses') ||
            url.includes('/calendar');
    }

    /**
     * Main scraping function
     */
    function scrapeAssignments() {
        const assignments = [];

        // Try different selectors for different Canvas views

        // Method 1: Assignment list page (/courses/X/assignments)
        const assignmentRows = document.querySelectorAll('.assignment');
        assignmentRows.forEach(row => {
            const assignment = parseAssignmentRow(row);
            if (assignment) assignments.push(assignment);
        });

        // Method 2: Dashboard/Todo items
        const todoItems = document.querySelectorAll('.todo-list-item, .planner-item');
        todoItems.forEach(item => {
            const assignment = parseTodoItem(item);
            if (assignment) assignments.push(assignment);
        });

        // Method 3: Calendar events
        const calendarEvents = document.querySelectorAll('.fc-event, .calendar_event, .event-details-header');
        calendarEvents.forEach(event => {
            const assignment = parseCalendarEvent(event);
            if (assignment) assignments.push(assignment);
        });

        // Remove duplicates by title
        const uniqueAssignments = removeDuplicates(assignments);

        if (uniqueAssignments.length > 0) {
            saveAssignments(uniqueAssignments);
            console.log(`📚 Student Life: Found ${uniqueAssignments.length} assignments!`);
        } else {
            console.log('📚 Student Life: No assignments found on this page.');
        }
    }

    /**
     * Parse an assignment from the assignments list page
     */
    function parseAssignmentRow(row) {
        try {
            const titleEl = row.querySelector('.ig-title, .assignment-name, a.ig-title');
            const dueDateEl = row.querySelector('.due_date, .assignment-date, .date-due');
            const pointsEl = row.querySelector('.points_possible, .points');

            const title = titleEl?.textContent?.trim();
            if (!title) return null;

            // Extract course name from breadcrumb or page title
            const courseEl = document.querySelector('.mobile-header-title, #breadcrumbs li:nth-child(2) a, .course-title');
            const course = courseEl?.textContent?.trim() || 'Unknown Course';

            // Parse due date
            let dueDate = null;
            if (dueDateEl) {
                const dateText = dueDateEl.textContent?.trim();
                dueDate = parseDateString(dateText);
            }

            // Parse points
            let points = 0;
            if (pointsEl) {
                const pointsText = pointsEl.textContent?.trim();
                const match = pointsText?.match(/(\d+)/);
                if (match) points = parseInt(match[1]);
            }

            return { title, course, dueDate, points, source: 'canvas' };
        } catch (e) {
            console.error('Error parsing assignment row:', e);
            return null;
        }
    }

    /**
     * Parse a todo/planner item
     */
    function parseTodoItem(item) {
        try {
            const titleEl = item.querySelector('.todo-details .todo-details__title, .planner-item__title');
            const courseEl = item.querySelector('.todo-details .todo-details__context, .planner-item__course');
            const dueDateEl = item.querySelector('.todo-details .todo-details__due-date, time');

            const title = titleEl?.textContent?.trim();
            if (!title) return null;

            const course = courseEl?.textContent?.trim() || 'Unknown Course';

            let dueDate = null;
            if (dueDateEl) {
                // Try datetime attribute first
                dueDate = dueDateEl.getAttribute('datetime') || parseDateString(dueDateEl.textContent?.trim());
            }

            return { title, course, dueDate, points: 0, source: 'canvas-todo' };
        } catch (e) {
            console.error('Error parsing todo item:', e);
            return null;
        }
    }

    /**
     * Parse a calendar event
     */
    function parseCalendarEvent(event) {
        try {
            // Look for event details in popover or event card
            const titleEl = event.querySelector('.details_title, .fc-title, .event-title, .fc-event-title');
            const eventTypeEl = event.querySelector('.event-type');

            const title = titleEl?.textContent?.trim() || event.textContent?.trim();

            if (!title) return null;

            // Only scrape if it's an assignment (not just any calendar event)
            const eventType = eventTypeEl?.textContent?.trim();
            if (eventType && !eventType.toLowerCase().includes('assignment')) {
                return null; // Skip non-assignment events
            }

            // Try to get date from event data or parent element
            let dueDate = event.getAttribute('data-date') ||
                event.closest('[data-date]')?.getAttribute('data-date') ||
                event.getAttribute('data-event-date');

            return { title, course: 'Calendar', dueDate, points: 0, source: 'canvas-calendar' };
        } catch (e) {
            console.error('Error parsing calendar event:', e);
            return null;
        }
    }

    /**
     * Parse various date string formats
     */
    function parseDateString(dateStr) {
        if (!dateStr) return null;

        // Clean up the string
        dateStr = dateStr.replace(/^Due:?\s*/i, '').trim();

        // Try native Date parsing
        const parsed = new Date(dateStr);
        if (!isNaN(parsed.getTime())) {
            return parsed.toISOString();
        }

        // Handle relative dates like "Tomorrow", "Today"
        const today = new Date();
        const lower = dateStr.toLowerCase();

        if (lower.includes('today')) {
            return today.toISOString();
        }
        if (lower.includes('tomorrow')) {
            today.setDate(today.getDate() + 1);
            return today.toISOString();
        }

        return null;
    }

    /**
     * Remove duplicate assignments by title
     */
    function removeDuplicates(assignments) {
        const seen = new Set();
        return assignments.filter(a => {
            const key = a.title.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    /**
     * Save assignments to chrome.storage
     */
    function saveAssignments(newAssignments) {
        // Merge with existing assignments
        chrome.storage.local.get(['assignments'], function (result) {
            const existing = result.assignments || [];

            // Merge: keep existing, add new ones
            const merged = [...existing];

            newAssignments.forEach(newA => {
                const exists = merged.some(e =>
                    e.title.toLowerCase() === newA.title.toLowerCase()
                );
                if (!exists) {
                    merged.push(newA);
                }
            });

            // Save back to storage
            chrome.storage.local.set({ assignments: merged }, function () {
                console.log(`📚 Student Life: Saved ${merged.length} total assignments`);
            });
        });
    }

})();
