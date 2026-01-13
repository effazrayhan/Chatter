const { userJoin, getCurrentUser, userLeave } = require("../utils/users");

module.exports = (io, socket) => {
  // Join Room
  socket.on("joinUser", (username) => {
    const user = userJoin(socket.id, username, "general");
    socket.join(user.room);

    // Broadcast when a user connects (to everyone in room)
    io.to(user.room).emit("userJoined", `${user.username} joined the chat`);
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    if (!user) return;

    // Broadcast to room
    io.to(user.room).emit("chatMessage", {
      user: user.username,
      text: msg,
    });
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit("userLeft", `${user.username} left the chat`);
    }
  });
};
