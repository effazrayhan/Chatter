import { io } from "socket.io-client";

// Connect to local network on port 5000
const socket = io(`http://${window.location.hostname}:5000`);

export default socket;
