// Gmail-style keyboard shortcuts with 'g' as a leading modifier key
let gKeyPressed = false;
let gKeyTimeout = null;
const G_KEY_TIMEOUT_MS = 1000; // 1 second window to press the second key

function focusField(fieldName) {
    document.getElementById(fieldName).focus();
}

function saveTask() {
    document.querySelector('button[type="submit"]').click();
}

// Navigation shortcuts (g + key)
const gShortcuts = {
    'n': '/tasks/task/create/',  // g + n: go to new task
    't': '/tasks/',         // g + t: go to task list
    'h': '/',                    // g + h: go to home
};

// Task action shortcuts (when a task is selected)
function getSelectedTaskId() {
    const selectedCard = document.querySelector('.card.selected');
    return selectedCard ? selectedCard.dataset.taskId : null;
}

function navigateToUrl(url) {
    window.location.href = url;
}

function executeTaskAction(action) {
    const taskId = getSelectedTaskId();
    if (!taskId) {
        console.log('No task selected. Use arrow keys or 1-9 to select a task.');
        return;
    }

    switch (action) {
        case 'view':
            navigateToUrl(`/tasks/task/${taskId}/`);
            break;
        case 'edit':
            navigateToUrl(`/tasks/task/${taskId}/edit/`);
            break;
        case 'complete':
            navigateToUrl(`/tasks/task/${taskId}/complete/`);
            break;
        case 'delete':
            navigateToUrl(`/tasks/task/${taskId}/delete/`);
            break;
    }
}

document.addEventListener('keydown', function (event) {
    // Ignore shortcuts when typing in input fields
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
    }

    // Handle Ctrl+Enter for saving tasks on create page
    if (window.location.pathname === '/tasks/task/create/') {
        if (event.key === 'Enter' && event.ctrlKey) {
            event.preventDefault();
            saveTask();
            return;
        }
    }

    // Escape key: blur active element, deselect task, or close dialog
    if (event.key === 'Escape') {
        event.preventDefault();
        document.activeElement.blur();

        // Close help dialog if open
        const dialog = document.getElementById('shortcuts-dialog');
        if (dialog && dialog.open) {
            dialog.close();
            return;
        }

        // Clear g key state
        if (gKeyPressed) {
            gKeyPressed = false;
            if (gKeyTimeout) {
                clearTimeout(gKeyTimeout);
                gKeyTimeout = null;
            }
        }

        // Deselect task
        const selectedCard = document.querySelector('.card.selected');
        if (selectedCard) {
            selectedCard.classList.remove('selected');
        }
        return;
    }

    // Question mark (shift + /) to open help dialog
    if (event.key === '?' && event.shiftKey) {
        event.preventDefault();
        const dialog = document.getElementById('shortcuts-dialog');
        if (dialog) {
            dialog.showModal();
        }
        return;
    }

    // Handle 'g' modifier key
    if (event.key === 'g' && !gKeyPressed) {
        event.preventDefault();
        gKeyPressed = true;

        // Show visual indicator
        const indicator = document.getElementById('shortcuts-indicator');
        if (indicator) {
            indicator.style.display = 'block';
            indicator.innerHTML = '<kbd>g</kbd> is pressed. Press the next key...';
        }

        // Set timeout to clear g key state if no second key is pressed
        gKeyTimeout = setTimeout(() => {
            gKeyPressed = false;
            gKeyTimeout = null;
            if (indicator) {
                indicator.style.display = 'none';
            }
        }, G_KEY_TIMEOUT_MS);
        return;
    }

    // Handle second keypress after 'g'
    if (gKeyPressed) {
        event.preventDefault();
        clearTimeout(gKeyTimeout);
        gKeyTimeout = null;
        gKeyPressed = false;

        // Hide visual indicator
        const indicator = document.getElementById('shortcuts-indicator');
        if (indicator) {
            indicator.style.display = 'none';
        }

        if (gShortcuts[event.key]) {
            navigateToUrl(gShortcuts[event.key]);
        }
        return;
    }

    // Task selection with number keys (1-9)
    if (window.location.pathname === '/tasks/task/' || window.location.pathname === '/tasks/task') {
        const taskCards = document.querySelectorAll('.card');
        if (event.key >= '1' && event.key <= '9') {
            const index = parseInt(event.key) - 1;
            if (index < taskCards.length) {
                event.preventDefault();
                // Remove previous selection
                document.querySelectorAll('.card.selected').forEach(card => {
                    card.classList.remove('selected');
                });
                // Select new task
                taskCards[index].classList.add('selected');
            }
        }

        // Arrow key navigation for task selection
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'j' || event.key === 'k') {
            event.preventDefault();
            const taskCards = document.querySelectorAll('.card');
            const selectedCard = document.querySelector('.card.selected');
            let currentIndex = selectedCard ? Array.from(taskCards).indexOf(selectedCard) : -1;
            
            if (event.key === 'ArrowDown' || event.key === 'j') {
                currentIndex = (currentIndex + 1) % taskCards.length;
            } else if (event.key === 'ArrowUp' || event.key === 'k') {
                currentIndex = currentIndex <= 0 ? taskCards.length - 1 : currentIndex - 1;
            }

            // Remove previous selection
            document.querySelectorAll('.card.selected').forEach(card => {
                card.classList.remove('selected');
            });
            // Select new task
            taskCards[currentIndex].classList.add('selected');
        }

        // Task action shortcuts
        if (event.key === 'Enter') {
            event.preventDefault();
            executeTaskAction('view');
        } else if (event.key === 'e') {
            event.preventDefault();
            executeTaskAction('edit');
        } else if (event.key === 'c') {
            event.preventDefault();
            executeTaskAction('complete');
        } else if (event.key === 'd' || event.key === 'x') {
            event.preventDefault();
            executeTaskAction('delete');
        }
    }
});