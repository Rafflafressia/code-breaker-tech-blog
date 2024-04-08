// login form handler
document.querySelector('#login').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            console.log("You are logged in!")
            window.location.href = ('/');
        } else {
            alert('Failed to log in.');
        }
    }
});

// signup form handler
document.querySelector('#signup').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const email = document.querySelector('#email').value.trim();
    if (username && password && email) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password, email }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
});

// logout button handler
document.querySelector('.logout').addEventListener('click', async function() {
    console.log("You are logged out!")
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/');
    } else {    
        alert('Failed to log out.');
    }
});