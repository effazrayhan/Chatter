import React, { useState, useEffect } from "react";
import socket from "./services/socket";
import UserLogin from "./components/UserLogin";
import Chat from "./components/Chat";
import "./styles/chat.css";

function App() {
    const [username, setUsername] = useState("");
    const [joined, setJoined] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Socket listeners
        socket.on("chatMessage", (data) => {
            setMessages((prev) => [...prev, { username: data.user, content: data.text }]);
        });

        socket.on("userJoined", (msg) => {
            setMessages((prev) => [...prev, { type: 'notification', text: msg }]);
        });

        socket.on("userLeft", (msg) => {
            setMessages((prev) => [...prev, { type: 'notification', text: msg }]);
        });

        return () => {
            socket.off();
        };
    }, []);

    const joinChat = () => {
        if (username.trim()) {
            if (!socket.connected) socket.connect();
            socket.emit("joinUser", username);
            setJoined(true);
        }
    };

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("chatMessage", message);
            setMessage("");
        }
    };

    const leaveChat = () => {
        setJoined(false);
        setMessages([]);
        setUsername("");
        socket.disconnect();
        socket.connect();
    };

    return (
        <div>
            {!joined ? (
                <UserLogin 
                    username={username} 
                    setUsername={setUsername} 
                    joinChat={joinChat} 
                />
            ) : (
                <Chat 
                    messages={messages} 
                    message={message} 
                    setMessage={setMessage} 
                    sendMessage={sendMessage} 
                    username={username}
                    leaveChat={leaveChat}
                />
            )}
        </div>
    );
}

export default App;
