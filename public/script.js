const socket = io();

// UI Elements
const form = document.getElementById('form');
const input = document.getElementById('input');
const chatWindow = document.getElementById('chat-window');



// State
let username = '';

// Helper to update button visibility
function updateNotificationButton() {
    if (!("Notification" in window)) {
        notificationBtn.style.display = 'none';
        return;
    }

    if (Notification.permission === 'granted' || Notification.permission === 'denied') {
        notificationBtn.style.display = 'none';
    } else {
        notificationBtn.style.display = 'inline-block';
    }
}

// Initialize
function init() {
    while (!username) {
        username = prompt("Please enter your username:");
    }
    socket.emit('join', username);

    // Check notification permission
    updateNotificationButton();
}

// Event Listeners
const leaveBtn = document.getElementById('leave-btn');
const notificationBtn = document.getElementById('notification-btn');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

leaveBtn.addEventListener('click', () => {
    if (socket.connected) {
        socket.disconnect();
        addSystemMessage("You have left the chat.");

        // Disable inputs
        input.disabled = true;
        form.querySelector('button').disabled = true;

        // Change button to Rejoin
        leaveBtn.textContent = "Rejoin";
        leaveBtn.classList.add('rejoin');
    } else {
        window.location.reload();
    }
});



notificationBtn.addEventListener('click', () => {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notifications");
        return;
    }

    Notification.requestPermission().then((permission) => {
        updateNotificationButton();
        if (permission === "granted") {
            addSystemMessage("Notifications enabled!");
            new Notification("Notifications enabled", { body: "You will now be notified of new messages." });
        }
    });
});

const usersList = document.getElementById('users');

// Socket Events
socket.on('chat message', (data) => {
    addMessage(data);
    scrollToBottom();
});

socket.on('user list', (users) => {
    updateUserList(users);
});

socket.on('user joined', (user) => {
    addSystemMessage(`${user} joined the chat`);
    addUserToList(user);
    scrollToBottom();
});

socket.on('user left', (user) => {
    addSystemMessage(`${user} left the chat`);
    removeUserFromList(user);
    scrollToBottom();
});

// Helper Functions
function updateUserList(users) {
    usersList.innerHTML = '';
    users.forEach(user => addUserToList(user));
}

function addUserToList(user) {
    const li = document.createElement('li');
    li.textContent = user;
    li.dataset.user = user;
    usersList.appendChild(li);
}

function removeUserFromList(user) {
    const li = usersList.querySelector(`li[data-user="${user}"]`);
    if (li) {
        li.remove();
    }
}

function addMessage(data) {
    const isOwn = data.user === username;
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.classList.add(isOwn ? 'own' : 'other');

    // For other users, add the username
    if (!isOwn) {
        const userSpan = document.createElement('span');
        userSpan.classList.add('user');
        userSpan.textContent = data.user;
        msgDiv.appendChild(userSpan);

        // Send notification if window is hidden or not focused
        if ((document.hidden || !document.hasFocus()) && Notification.permission === "granted") {
            new Notification(`New message from ${data.user}`, {
                body: data.text,
                icon: '/favicon.ico'
            });
        }
    }

    const bubble = document.createElement('div');
    bubble.classList.add('message-bubble');
    
    const textSpan = document.createElement('span');
    textSpan.textContent = data.text;
    bubble.appendChild(textSpan);
    
    msgDiv.appendChild(bubble);

    chatWindow.appendChild(msgDiv);
}

function addSystemMessage(text) {
    const div = document.createElement('div');
    div.classList.add('system-message');
    div.textContent = text;
    chatWindow.appendChild(div);
}

function scrollToBottom() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Start
init();
