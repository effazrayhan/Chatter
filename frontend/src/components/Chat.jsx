import React, { useRef, useEffect } from 'react';
import Message from './Message';
import Notification from './Notification';

function Chat({ messages, message, setMessage, sendMessage, username, leaveChat }) {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="chat-header-content">
                    <div className="chat-title-section">
                        <h2>Chat Room</h2>
                        <span className="user-name-display">@{username}</span>
                    </div>
                    <button onClick={leaveChat} className="leave-btn">Leave</button>
                </div>
            </div>
            <div className="chat-messages">
                {messages.map((msg, index) => {
                     if (msg.type === 'notification') {
                         return <Notification key={index} msg={msg.text} />;
                     }
                     return (
                        <Message 
                            key={index} 
                            msg={msg} 
                            isMine={msg.username === username} 
                        />
                     );
                })}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage} className="send-btn">Send</button>
            </div>
        </div>
    );
}

export default Chat;
