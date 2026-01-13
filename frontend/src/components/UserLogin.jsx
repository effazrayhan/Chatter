import React from 'react';

function UserLogin({ username, setUsername, joinChat }) {
    return (
        <div className="join-container">
            <div className="chat-header">
                <h2>Join Chat App</h2>
            </div>
            <input
                type="text"
                placeholder="Enter your username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && joinChat()}
            />
            <button onClick={joinChat}>Join Chat</button>
        </div>
    );
}

export default UserLogin;
