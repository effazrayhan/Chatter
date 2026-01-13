import React from 'react';

function Message({ msg, isMine }) {
    return (
        <div className={`message-bubble ${isMine ? 'mine' : 'others'}`}>
            <div className="message-meta">{msg.username}</div>
            <div className="message-text">{msg.content}</div>
        </div>
    );
}

export default Message;
