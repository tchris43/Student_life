// popup.js - Handles the extension popup logic

document.addEventListener('DOMContentLoaded', function () {
    // Load assignments from storage when popup opens
    loadAssignments();

    // Refresh button handler
    document.getElementById('refresh-btn').addEventListener('click', loadAssignments);
});

/**
 * Load assignments from chrome.storage and display them
 */
function loadAssignments() {
    chrome.storage.local.get(['assignments'], function (result) {
        const assignments = result.assignments || [];
        displayAssignments(assignments);
        updateStatus(assignments.length);
    });
}

/**
 * Display assignments in the popup
 * @param {Array} assignments - List of assignment objects
 */
function displayAssignments(assignments) {
    const container = document.getElementById('assignment-list');

    if (assignments.length === 0) {
        container.innerHTML = '<p class="placeholder">Visit Canvas to sync your assignments</p>';
        return;
    }

    // Sort by due date (soonest first)
    assignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    // Build HTML for each assignment
    container.innerHTML = assignments.map(assignment => {
        const dueDate = new Date(assignment.dueDate);
        const daysUntil = Math.ceil((dueDate - new Date()) / (1000 * 60 * 60 * 24));
        const isUrgent = daysUntil <= 2;

        return `
      <div class="assignment-card ${isUrgent ? 'urgent' : ''}">
        <div class="title">${assignment.title}</div>
        <div class="details">
          <span>${assignment.course || 'Unknown Course'}</span>
          <span>${formatDueDate(dueDate, daysUntil)}</span>
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
function updateStatus(count) {
    const statusText = document.getElementById('status-text');
    if (count > 0) {
        statusText.textContent = `${count} assignments synced`;
    } else {
        statusText.textContent = 'Ready to sync';
    }
}
