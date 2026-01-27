// popup.js - Handles the extension popup logic

document.addEventListener('DOMContentLoaded', function () {
    // Load assignments from storage when popup opens
    loadAssignments();

    // Refresh button handler
    document.getElementById('refresh-btn').addEventListener('click', loadAssignments);

    // Clear data button handler
    document.getElementById('clear-btn').addEventListener('click', clearAssignments);
});

/**
 * Load assignments from chrome.storage and display them
 */
function loadAssignments() {
    chrome.storage.local.get(['assignments'], function (result) {
        const assignments = result.assignments || [];

        // Filter: only show assignments due today or in the future
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of today

        const upcomingAssignments = assignments.filter(a => {
            // Keep if no due date (we'll show "No due date")
            if (!a.dueDate) return true;

            const dueDate = new Date(a.dueDate);
            // Keep if due date is today or later
            return dueDate >= today;
        });

        displayAssignments(upcomingAssignments);
        updateStatus(upcomingAssignments.length, assignments.length);
    });
}

/**
 * Clear all stored assignments
 */
function clearAssignments() {
    chrome.storage.local.set({ assignments: [] }, function () {
        loadAssignments();
        console.log('📚 Student Life: Cleared all assignments');
    });
}

/**
 * Display assignments in the popup
 * @param {Array} assignments - List of assignment objects
 */
function displayAssignments(assignments) {
    const container = document.getElementById('assignment-list');

    if (assignments.length === 0) {
        container.innerHTML = '<p class="placeholder">No upcoming assignments! Visit Canvas to sync.</p>';
        return;
    }

    // Sort: assignments with dates first (by date), then no-date ones at end
    assignments.sort((a, b) => {
        // If both have dates, sort by date
        if (a.dueDate && b.dueDate) {
            return new Date(a.dueDate) - new Date(b.dueDate);
        }
        // If only one has a date, put the one with date first
        if (a.dueDate && !b.dueDate) return -1;
        if (!a.dueDate && b.dueDate) return 1;
        // If neither has a date, keep original order
        return 0;
    });

    // Build HTML for each assignment
    container.innerHTML = assignments.map(assignment => {
        let dueDateDisplay = 'No due date';
        let isUrgent = false;

        if (assignment.dueDate) {
            const dueDate = new Date(assignment.dueDate);
            const daysUntil = Math.ceil((dueDate - new Date()) / (1000 * 60 * 60 * 24));
            isUrgent = daysUntil <= 2 && daysUntil >= 0;
            dueDateDisplay = formatDueDate(dueDate, daysUntil);
        }

        return `
      <div class="assignment-card ${isUrgent ? 'urgent' : ''}">
        <div class="title">${assignment.title}</div>
        <div class="details">
          <span>${assignment.course || 'Unknown Course'}</span>
          <span>${dueDateDisplay}</span>
        </div>
      </div>
    `;
    }).join('');
}

/**
 * Format due date for display
 */
function formatDueDate(date, daysUntil) {
    if (daysUntil < 0) return 'Overdue!';
    if (daysUntil === 0) return 'Due today';
    if (daysUntil === 1) return 'Due tomorrow';
    if (daysUntil <= 7) return `Due in ${daysUntil} days`;
    return date.toLocaleDateString();
}

/**
 * Update the sync status display
 */
function updateStatus(upcomingCount, totalCount) {
    const statusText = document.getElementById('status-text');
    if (totalCount > 0) {
        const hiddenCount = totalCount - upcomingCount;
        if (hiddenCount > 0) {
            statusText.textContent = `${upcomingCount} upcoming (${hiddenCount} past hidden)`;
        } else {
            statusText.textContent = `${upcomingCount} assignments synced`;
        }
    } else {
        statusText.textContent = 'Ready to sync';
    }
}
