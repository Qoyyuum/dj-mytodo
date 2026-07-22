function focusField(fieldName) {
    document.getElementById(fieldName).focus();
}

function saveTask() {
    document.querySelector('button[type="submit"]').click();
}

document.addEventListener('keydown', function (event) {
    // Save a task with :wq while we are at the task creation page
    if (window.location.pathname === '/tasks/task/create/') {
        if (event.key === 'Enter' && event.ctrlKey ) {
            event.preventDefault();
            saveTask();
        }
    } else {
        if (event.key === "i" || event.key === "I" || event.key === "a" || event.key === "A") {
            event.preventDefault();
            window.location.href = '/tasks/task/create/';
        }
    }
})