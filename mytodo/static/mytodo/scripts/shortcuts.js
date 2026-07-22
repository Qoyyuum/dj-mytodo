function focusField(fieldName) {
    document.getElementById(fieldName).focus();
}

function saveTask() {
    document.querySelector('button[type="submit"]').click();
}

document.addEventListener('keydown', function (event) {
    if (window.location.pathname === '/tasks/task/create/') {
        if (event.key === 'Enter' && event.ctrlKey ) {
            event.preventDefault();
            saveTask();
        }
    } else {
        // Global shortcuts
        // TODO: These shortcuts are not working
        // pressing g for "go" as a means of navigating around the webapp
        if (event.key === 'g') {
            event.preventDefault();
            // pressing g + n for "go to new task"
            if (event.key === 'n') {
                window.location.href = '/tasks/task/create/';
            }
            // pressing g + t for "go to tasks"
            if (event.key === 't') {
                window.location.href = '/tasks/task/';
            }
            // pressing g + h for "go to home"
            if (event.key === 'h') {
                window.location.href = '/';
            }
        }
        // Pressing escape key to exit out of forms
        if (event.key === 'Escape') {
            event.preventDefault();
            document.activeElement.blur();
        }
    }
})