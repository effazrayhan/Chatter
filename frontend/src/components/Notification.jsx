import React from 'react';

function Notification({ msg }) {
    return (
        <div className="notification">
            <p>{msg}</p>
        </div>
    );
}

export default Notification;
